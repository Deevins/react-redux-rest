const initialState = {
	menu: [],
	loading: true,
	error: false,
	items: [],
	totalPrice: 0,
	qtty: 0
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'MENU_LOADED':
			return {
				...state,
				menu: action.payload,
				loading: false
			}
		case 'MENU_REQUESTED':
			return {
				...state,
				menu: state.menu,
				loading: true
			}
		case 'MENU_ERROR':
			return {
				...state,
				error: true
			}
		case 'ITEM_ADD_TO_CART':
			const id = action.payload

			const itemInd = state.items.findIndex(el => el.id === id)
			if (itemInd >= 0) {
				const itemInState = state.items.find(el => el.id === id)
				const newItem = {
					...itemInState,
					qtty: ++itemInState.qtty
				}
				return {
					...state,
					items: [
						...state.items.slice(0, itemInd),
						newItem,
						...state.items.slice(itemInd + 1)
					],
					totalPrice: state.totalPrice + newItem.price
				}
			}
			const item = state.menu.find(item => item.id === id)
			const newItem = {
				title: item.title,
				price: item.price,
				url: item.url,
				id: item.id,
				qtty: 1
			}

			if (newItem.id === state.items.find(el => el.id === id)) {
			}
			return {
				...state,
				items: [
					...state.items,
					newItem
				],
				totalPrice: state.totalPrice + newItem.price
			}
		case 'ITEM_REMOVE_FROM_CART':
			const index = action.payload

			if (action.event === 'minus') {
				const itemInState = state.items.find(item => item.id === index);
				if (itemInState.qtty === 1) {
					return {
						...state,
						items: [
							...state.items.filter(item => item.id !== index)
						],
						totalPrice: state.totalPrice - itemInState.price
					}
				}
				const newItemQty = {
					...itemInState,
					qtty: --itemInState.qtty

				}
				return {
					...state,
					items: [
						...state.items.filter(item => item.id !== index),
						newItemQty
					],
					totalPrice: state.totalPrice - itemInState.price
				}
			}
			const itemIndex = state.items.findIndex(item => item.id === index)
			const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty'];

			return {
				...state,
				items: [
					...state.items.slice(0, itemIndex),
					...state.items.slice(itemIndex + 1)
				],
				totalPrice: state.totalPrice - price
			}
		default:
			return state
	}
}
export default reducer