export default class RestoService {
	_urlBase = 'http://localhost:3000'

	async getResource(url) {
		const res = await fetch(`${this._urlBase}${url}`)
		if (!res.ok) {
			throw new Error(`Couldn't fetch ${url}, received ${res.status}`)
		}
		return await res.json();
	}

	async getMenuItems() {
		return await this.getResource('/menu/')
	}

	//
	// async getItem(id) {
	// 	const res = await this.getResource('/menu/');
	// 	return res.find((el) => {
	// 		console.log(`el.id: ${el.id}, id: ${id}`);
	// 		return el.id === +id;
	// 	})
	// }

	async setOrder(order) {
		const num = await this.getOrderNumber()
		const newOrder = {
			id: num,
			order: order
		}
		const response = await fetch(`${this._urlBase}/orders`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(newOrder)
		})
		if (!response.ok) {
			throw new Error('json parsing error')
		} else {
			alert(`Your order has been placed`);
		}
	}

	async getOrderNumber() {
		const res = await this.getResource('/orders/');
		return (res.length + 1)
	}
}