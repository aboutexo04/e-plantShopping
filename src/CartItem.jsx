import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);

    // Calculate subtotal for each item
    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1)); // Remove '$' and convert to number
        return (price * item.quantity).toFixed(2);
    };

    // Handle increment quantity
    const handleIncrement = (item) => {
        // Create updated item with increased quantity
        const updatedItem = {
            ...item,
            quantity: item.quantity + 1
        };
        // Dispatch updateQuantity action
        dispatch(updateQuantity({ 
            name: item.name, 
            quantity: item.quantity + 1 
        }));
    };

    // Handle decrement quantity
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            // If quantity is greater than 1, decrease it
            dispatch(updateQuantity({ 
                name: item.name, 
                quantity: item.quantity - 1 
            }));
        } else {
            // If quantity would drop to 0, remove the item
            dispatch(removeItem(item.name));
        }
    };

    // Handle remove item
    const handleRemove = (itemName) => {
        dispatch(removeItem(itemName));
    };

    // Handle checkout
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    // Calculate total items in cart
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Shopping Cart ({totalItems} items)</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button onClick={onContinueShopping}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p className="cart-item-cost">Price: {item.cost}</p>
                                    <div className="cart-item-quantity">
                                        <button 
                                            className="cart-item-button"
                                            onClick={() => handleDecrement(item)}
                                        >
                                            -
                                        </button>
                                        <span className="cart-item-quantity-value">
                                            {item.quantity}
                                        </span>
                                        <button 
                                            className="cart-item-button"
                                            onClick={() => handleIncrement(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cart-item-total">
                                        Subtotal: ${calculateTotalCost(item)}
                                    </p>
                                    <button 
                                        className="cart-item-delete"
                                        onClick={() => handleRemove(item.name)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3 className="total_cart_amount">
                            Total Cart Amount: ${total.toFixed(2)}
                        </h3>
                        <div className="continue_shopping_btn">
                            <button 
                                className="get-started-button"
                                onClick={onContinueShopping}
                            >
                                Continue Shopping
                            </button>
                            <button 
                                className="get-started-button1"
                                onClick={handleCheckoutShopping}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartItem;


