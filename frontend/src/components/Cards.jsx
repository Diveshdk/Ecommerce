import React, { useState } from 'react'
import toast from 'react-hot-toast';

function Cards({product, index}) {
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          qty: 1
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setIsInCart(true);
        toast.success("Added to Cart");
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Error adding to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='md:w-[30%] w-11/12 min-w-56 h-96 shadow-lg hover:border border-gray-400 rounded-lg 
    hover:shadow-xl px-4 py-4 flex flex-col gap-3 justify-between items-center text-center bg-white'>
      <h3 className='font-semibold text-center'>{product.name}</h3>
      <p className='text-gray-500 text-xs text-center'>{product.description}</p>
      <div className='w-full h-48 rounded-lg overflow-hidden bg-gray-200 relative'>
        {!imageLoaded && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='animate-pulse text-gray-400'>Loading...</div>
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover hover:scale-105 transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
            setImageLoaded(true);
          }}
        />
      </div>
      <div className='w-full flex justify-between items-center mt-1'>
        <p className='text-blue-500'>{`$${product.price}`}</p>
        <button 
          className={`px-5 py-1 border text-white rounded-md ${
            isInCart ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={addToCart}
          disabled={loading || isInCart}
        >
          {loading ? 'Adding...' : isInCart ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default Cards;