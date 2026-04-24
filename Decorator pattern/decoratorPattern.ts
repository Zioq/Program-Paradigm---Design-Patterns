/* 
    Build a TypeScript HTTP client using the Decorator Pattern with the following requirements:

    1. Implement a base HTTP client responsible for sending API requests.
    2. Introduce a logging decorator to capture request and response details.
    3. Implement an authentication decorator to inject authorization headers.
    4. Add a retry decorator to handle transient failures with a configurable retry strategy.
    5. Implement a timeout decorator to enforce request execution limits.
    6. Add a caching decorator for GET requests to reduce redundant network calls.
    7. Provide a factory function to compose and configure the client with all decorators.
*/

// 1) Set up common interface
// All actual client + decorator MUST FOLLOW HttpClient interface
type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestConfig = {
    url: string;
    method: HTTPMethod;
    headers?: Record<string, string>;
    body?:unknown, // `unknown` enforces type validation by requiring the caller to explicitly narrow or validate the data before using it.
    signal?: AbortSignal;
}

interface HttpClient {
    request<T>(config: RequestConfig): Promise<T>
}

/* 
    2) API call Client
    Responsibility: ONLY ONE! -> HTTP Request
*/

class FetchHttpClient implements HttpClient {
    async request<T>(config: RequestConfig): Promise<T> {
        const response = await fetch(config.url, {
            method: config.method,
            headers: {
                "Content-Type": "application/json",
                ... config.headers
            },
            body: config.body ? JSON.stringify(config.body) : undefined,
            signal: config.signal,
        })

        if (!response.ok) {
            throw new Error (`HTTP Error: ${response.status}`)
        }
        return response.json() as Promise<T>
    }
}

/* 
    3) Base Decorator
    - It implements the same interface
    - It holds a referecne to another object of the same interface 
    - It delegates the reqeust to the wrapped object by default

    WHY? 
    The base decorator is used to provide a shared structure and default behavior for all decorators.
    It stores the wrapped object and implements the delegation logic, so that individual decorators don’t need to repeat the same boilerplate code.
    This improves consistency, reduces duplication, and makes it easier to extend behavior by simply overriding specific methods.
    While it’s not strictly required for the pattern, it’s a common practice to simplify implementation and enforce a consistent structure.
*/
abstract class HttpClientDecorator implements HttpClient {
    protected client: HttpClient
    constructor(client: HttpClient) {
        this.client = client
    }
    request<T>(config: RequestConfig): Promise<T> {
        return this.client.request<T>(config)
    }

}

/* 
    4) Logging Decorator
*/

class LoggingHttpClient extends HttpClientDecorator {
    async request<T>(config: RequestConfig): Promise<T> {
        console.log(`[HTTP] ${config.method} ${config.url}`)

        const result = await this.client.request<T>(config)

        console.log(`[HTTP] Success: ${config.method} ${config.url}`)

        return result
    }
}

/* 
    5) Auth Decorator
*/
type TokenProvider = () => string; 

class AuthHttpClient extends HttpClientDecorator {
    constructor(
        client: HttpClient,
        private readonly tokenProvider: TokenProvider
    ) {
        super(client)
    }

    request<T>(config: RequestConfig) : Promise<T> {
        const token = this.tokenProvider()

        // Make a new object, instead of mutation
        return this.client.request<T>({
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            }
        })
    }
}

/* 
    6) Retry Decorator
*/
class RetryHttpClient extends HttpClientDecorator {
    constructor(
        client: HttpClient,
        private readonly maxRetries: number 
    ) {
        super(client)
    }

    async request<T>(config: RequestConfig): Promise<T> {
        let lastError: unknown

        for (let attempt = 1; attempt <=this.maxRetries; attempt++) {
            try {
                return await this.client.request<T>(config) // In real world, POST should not be retried. (Duplicated creation issue)
            } catch(e) {
                lastError = e
                console.log(`[Retry] attempt ${attempt} failed`)
            }
        }

        throw lastError

    }
}

/* 
    7) Timeout-Abort Decorator
*/
class TimeoutHttpClient extends HttpClientDecorator {
    constructor(client: HttpClient,
        private readonly timoutMs: number
    ) {
        super(client)
    }

    async request<T>(config: RequestConfig): Promise<T> {
        const controller = new AbortController();;

        const timeoutId = setTimeout(() => {
            controller.abort()
        }, this.timoutMs)

        try {
            return await this.client.request<T>({
                ...config,
                signal: controller.signal,
            })
        }
        finally {
            clearTimeout(timeoutId)
        }
    }
}

/* 
    8) Cache Decorator: 
    Ex) GET
*/

class CacheHttpClient extends HttpClientDecorator {
    private cache = new Map<string,unknown>()

    async request<T>(config: RequestConfig): Promise<T> {
        if (config.method !== "GET") {
            return this.client.request<T>(config)
        }

        const cacheKey = config.url

        if(this.cache.has(cacheKey)) {
            console.log(`[Cache] Hit: ${cacheKey}`)
            return this.cache.get(cacheKey) as T;
        }

        console.log(`[Cache Miss: ${cacheKey}]`)

        const result = await this.client.request<T>(config);

        this.cache.set(cacheKey, result);

        return result

    }
}

/* 
    9) Assemble Factoy

*/

function createHttpClient(): HttpClient {
    let client: HttpClient = new FetchHttpClient();

    client = new LoggingHttpClient(client)
    client = new TimeoutHttpClient(client, 5000)
    client = new RetryHttpClient(client, 3)
    client = new CacheHttpClient(client)
    client = new AuthHttpClient(client, () => "my-access-token")

    return client
}

/* 
    10) Useage
*/
type User = {
    id: number,
    name: string
}

async function main() {
    const client = createHttpClient();

    const user = await client.request<User>({
        url: "https://jsonplaceholder.typicode.com/users/1",
        method: "GET"
    })

    console.log(user.name)
}
main()
