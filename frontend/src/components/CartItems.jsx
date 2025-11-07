import React from 'react';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../app/Slices/CartSlice';
import toast from 'react-hot-toast';

function CartItems({items}) {

    const dispatch =useDispatch()

    function removeitem(){
        dispatch(removeFromCart(items.id));
        toast.error("Item Removed");
    }

  return (
    <div className='w-full h-fit flex py-5 gap-3 border-b border-black mt-5'>
        <img src={items.image} className='w-32 h-32'/>
        <div className='flex flex-col gap-y-10'>
            <div>
                <h3 className='font-semibold'>{`${items.title.substring(0,11)}`}</h3>
                <p className='text-gray-500 text-xs'>{`${items.description.substring(0,70)}..`}</p>
            </div>
            
            <div className='flex justify-between items-center'>
                <p className='text-blue-500'>{`₹${items.price}`}</p>
                <button className='p-2 rounded-full bg-red-300'
                onClick={removeitem}
                >
                    <MdDelete className='text-red-500'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default CartItems