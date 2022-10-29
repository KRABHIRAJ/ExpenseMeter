import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react';
import { useDispatch } from 'react-redux';
import { remove } from '../features/userSlice';

function Card({ id, description, category, amount, date ,setEdit, setEditId, payThisBill}) {

  const dispatch = useDispatch();
  const editBill = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEdit(true);
    setEditId(id);
  }

  const deleteBill = () => {
    dispatch(remove({
      id: { id },
    }));
  }
  return (
      <div style={{backgroundColor: payThisBill ? "#FFAEBC" : "rgb(196 181 253 / var(--tw-bg-opacity))" }} className='px-11 py-4 bg-violet-300 hover:bg-violet-400 transition-all ease-out hover:scale-105 w-[250px] h-fit sm:w-[200px] m-5 mx-auto rounded-xl cursor-pointer'>
          <p className='font-semibold text-green-800 capitalize '>{ category}</p>
          <p >{ description}</p>
          <p className='font-bold'>₹ { amount}</p>
          <p>{ date}</p>
          <div className='flex justify-between mt-3'>
            <PencilSquareIcon onClick={editBill} className='h-5 text-green-800' />
            <TrashIcon onClick={deleteBill} className='h-5 text-red-500'/>
          </div>
    </div>
  )
}

export default Card
