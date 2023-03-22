const CartReducer = (state, data) => {
    switch (data.type) {
        case "Add": {
            if (!Object.prototype.hasOwnProperty.call(state.cart, data.body.id)) state.cart[data.body.id] = data.body;
            else state.cart[data.body.id].quantity++;
            return { ...state };
        }
        case 'Remove': {
            if (state.cart[data.body.id].quantity > 0) state.cart[data.body.id].quantity--;
            else delete state.cart[data.body.id];

            return { ...state }
        }
        case 'Clear': {
            return { cart: {} }
        }
        default: {
            return state;
        }
    }
}

export default CartReducer;