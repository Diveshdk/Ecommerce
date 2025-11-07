import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [receipt, setReceipt] = useState(null);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/cart');
            const data = await response.json();
            
            if (data.success) {
                setCart(data.cart);
                setTotal(data.total);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/cart/${itemId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            
            if (data.success) {
                toast.success("Item removed from cart");
                fetchCart(); // Refresh cart
            } else {
                toast.error("Failed to remove item");
            }
        } catch (error) {
            console.error('Error removing item:', error);
            toast.error("Error removing item");
        }
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        
        if (!customerInfo.name || !customerInfo.email) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems: cart,
                    customerInfo
                })
            });

            const data = await response.json();
            
            if (data.success) {
                setReceipt(data.receipt);
                setShowCheckout(false);
                setShowReceipt(true);
                setCart([]);
                setTotal(0);
                toast.success("Checkout completed!");
            } else {
                toast.error("Checkout failed");
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            toast.error("Checkout error");
        }
    };

    if (loading) {
        return (
            <div className='w-full min-h-screen flex justify-center items-center'>
                <div className='text-center'>Loading cart...</div>
            </div>
        );
    }

    // Receipt Modal
    if (showReceipt && receipt) {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                <div className='bg-white p-8 rounded-lg max-w-md w-11/12'>
                    <h2 className='text-2xl font-bold text-green-500 mb-4'>Order Receipt</h2>
                    <div className='mb-4'>
                        <p><strong>Order ID:</strong> {receipt.id}</p>
                        <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> ${receipt.total}</p>
                        <p><strong>Status:</strong> {receipt.status}</p>
                    </div>
                    <button 
                        onClick={() => setShowReceipt(false)}
                        className='w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    // Checkout Form Modal
    if (showCheckout) {
        return (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                <div className='bg-white p-8 rounded-lg max-w-md w-11/12'>
                    <h2 className='text-2xl font-bold mb-4'>Checkout</h2>
                    <form onSubmit={handleCheckout}>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>
                                Name
                            </label>
                            <input
                                type='text'
                                value={customerInfo.name}
                                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                                className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>
                                Email
                            </label>
                            <input
                                type='email'
                                value={customerInfo.email}
                                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                                className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <p className='text-lg font-semibold'>Total: ${total}</p>
                        </div>
                        <div className='flex gap-2'>
                            <button
                                type='button'
                                onClick={() => setShowCheckout(false)}
                                className='flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
                            >
                                Complete Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full min-h-screen h-auto flex flex-wrap justify-center mt-10 mb-5'>
            {cart.length > 0 ? (
                <div className='w-9/12 flex flex-wrap justify-between gap-5'>
                    <div className='w-[100%] md:w-[50%]'>
                        {cart.map((item) => (             
                            <div key={item.id} className='flex items-center gap-4 border-b py-4 bg-gray-50 px-4 rounded-lg mb-2'>
                                <div className='w-16 h-16 rounded-lg overflow-hidden flex-shrink-0'>
                                    <img 
                                        src={item.image || 'https://via.placeholder.com/64x64?text=Product'} 
                                        alt={item.name}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='flex-1'>
                                    <h3 className='font-semibold text-lg'>{item.name}</h3>
                                    <div className='flex items-center gap-4 mt-2'>
                                        <span className='text-gray-600'>Qty: <span className='font-medium'>{item.qty}</span></span>
                                        <span className='text-blue-500'>${item.price} each</span>
                                    </div>
                                    <p className='font-semibold text-green-600 mt-1'>Subtotal: ${item.subtotal}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200'
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='min-w-[40%]'>
                        <h3 className='text-green-500 text-2xl font-semibold'>Your Cart</h3>
                        <h1 className='text-green-500 text-5xl font-semibold'>Summary</h1>
                        <p className='text-gray-600 font-medium mt-5'>
                            Total items: <span className='text-blue-500'>{cart.length}</span>
                        </p>
                        <p className='text-gray-600 font-medium'>
                            Total amount: <span className='text-blue-500'>${total}</span>
                        </p>
                        <button 
                            onClick={() => setShowCheckout(true)}
                            className='w-11/12 py-2 text-xl rounded-lg bg-green-500 hover:bg-green-600 mt-10 px-2 text-white'
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <div className='w-full flex flex-col items-center justify-center gap-5'>
                    <h1 className='text-3xl font-semibold text-green-500'>No items in Cart</h1>
                    <NavLink to="/">
                        <button className='px-10 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600'>
                            Start Shopping
                        </button>
                    </NavLink>
                </div>
            )}
        </div>
    )
}

export default Cart