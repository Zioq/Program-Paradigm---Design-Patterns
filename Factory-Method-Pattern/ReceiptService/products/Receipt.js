export class Receipt {
	render(content) {
		throw new Error('Receipt subclasses must implement render()');
	}
}