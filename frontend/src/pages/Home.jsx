import React, { useState, useEffect } from 'react';
import Cards from "../components/Cards"

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError('Error connecting to server');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='w-full flex justify-center mt-5 mb-5'>
        <div className='text-center'>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full flex justify-center mt-5 mb-5'>
        <div className='text-center text-red-500'>{error}</div>
      </div>
    );
  }

  return (
    <div className='w-full flex justify-center mt-5 mb-5'>
      <div className='md:w-8/12 w-full flex flex-wrap gap-4 justify-around'>
        {products.map((product)=><Cards key={product.id} product={product} index={product.id}/>)}
      </div>
    </div>
  )
}

export default Home