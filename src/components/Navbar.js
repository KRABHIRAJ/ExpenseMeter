import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  setCategory } from '../features/userSlice';


function Navbar() {
  const [selectValue, setSelectValue] = useState("all");
  const dispatch = useDispatch();

    const handleChange = (e) => {
      setSelectValue(e.target.value);
      const currCategory = e.target.value;
      dispatch(setCategory({
        category:currCategory,
      }))
      
  }
  
 


  return (
    
    <div className='sticky top-0 z-50'>
      <div className='bg-white shadow-md flex justify-between items-center p-3 '>
      <div className='px-4'>  
        <p className='hidden sm:inline text-violet-600 text-5xl cursor-pointer hover:text-violet-800 transition-all' style={{"fontFamily": 'Lovers Quarrel'}}>ExpenseMeter</p>
      </div>
      
      
              <div className='flex items-center pr-11'>
                    <label className='px-4 font-semibold' htmlFor="category">Choose Category:</label>          
                    <select onChange={handleChange} value={ selectValue } className='w-24 cursor-pointer outline-none' name="category" id="category">
                        <option value="all">All</option>
                        <option value="Food&Dining">Food & Dining</option>
                        <option value="utility">Utility</option>
                        <option value="shopping">Shopping</option>
                        <option value="education">Education</option>
                        <option value="personalCare">Personal Care</option>
                        <option value="travel">Travel</option>
                    </select>
                </div>
          </div>
    </div>
  )
}

export default Navbar
