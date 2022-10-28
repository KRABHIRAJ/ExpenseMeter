import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { add, selectUserCategory,  selectUserExpenseData, totalExpense} from "../features/userSlice";

function Home() {
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");



  const dispatch = useDispatch();
  const expenseData = useSelector(selectUserExpenseData);
  const currCategory = useSelector(selectUserCategory);

  const totalExpenditure = totalExpense(expenseData);
  const budget = 40000;

  let overBudget = totalExpenditure - budget;
  const sortable = [];
  expenseData.map((data) => {
    return sortable.push([data.id, data.amount]);
  });
  sortable.sort(function (a, b) {
    return Number(b[1]) - Number(a[1]);
  })

  const billsToRemove = [];
  if (overBudget > 0) {
    let i = 0;
    while (overBudget > 0) {
      billsToRemove.push(sortable[i][0]);
      overBudget = overBudget-  sortable[i][1];
      i++;
    }
  }



  



  const addBill = (e) => {
    e.preventDefault()
    e.stopPropagation();
    dispatch(add({
      item: {
        id:String(Math.floor(Math.random()*1000)) + id+"69"+String(Math.floor(Math.random()*1000)),
        category,
        description,
        amount,
        date
      }
    }))

    setId("");
    setAmount("");
    setDate("");
    setDescription("");
    setEdit(false);

  
  }

  
  if (edit) {
    const editItem = expenseData.filter((data) => {
      return data.id === editId;
    })
    console.log(editItem);
  }

  return (

    <div className='max-w-[980px] mx-auto '>
      
      <form className='mx-7 mt-4 border-2 py-4 rounded-lg ' action='submit'>
          <h2 className='mx-3 text-xl font-semibold font-serif mb-2 border-b-2 border-purple-500 text-purple-500 w-fit '>Enter Bill Details </h2>
          <div >
            <input value={id} onChange={(e) => setId(e.target.value)} className='pl-2 m-2 border-2 rounded-lg' type="text"  placeholder='id' required/>
            <select  onChange={(e) => setCategory(e.target.value)} value={ category } className='w-44 cursor-pointer border-2 px-1 rounded-lg outline-none' name="category" id="category">
                        <option className='font-semibold text-violet-500' value="all">Bill Category</option>
                        <option value="Food&Dining">Food & Dining</option>
                        <option value="utility">Utility</option>
                        <option value="shopping">Shopping</option>
                        <option value="education">Education</option>
                        <option value="personalCare">Personal Care</option>
                        <option value="travel">Travel</option>
            </select>
            <input value={description} onChange={(e) => setDescription(e.target.value)} className='pl-2 m-2 border-2 rounded-lg' type="text"  placeholder='Details' required/>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} className='pl-2 m-2 border-2 rounded-lg' type="number"  placeholder='Amount' required/>
            <input value={date} onChange={(e) => setDate(e.target.value)} className='pl-2 m-2 border-2 rounded-lg' type="text"  placeholder='Date (26-10-2022)' required/>
          </div>
        <button onClick={addBill} className='m-2 px-3 py-1 bg-violet-400 rounded-full text-white hover:bg-violet-500 active:scale-95 transition-all' type='submit'>{edit ? "Update Bill" : "Add Bill" }</button>
      </form>

        
          <div className='flex flex-col sm:flex-row sm:justify-between'>
                <h2 className='mx-auto sm:mx-7 mt-8 text-2xl font-semibold font-serif mb-2 border-b-2 h-fit  border-purple-500 text-purple-500 w-fit '>Your Bills📝</h2>
                <div className='flex flex-col mt-7 py-1 h-fit border-2 mr-7 border-purple-500 rounded-xl mb-4'>
                  <h2 className=' mx-auto sm:mx-7 text-lg font-semibold    text-purple-500 w-fit '>Your Budget:  <span className='font-bold text-green-500 cursor-pointer'>₹  {  budget }</span></h2>  
                  <h2 className=' mx-auto sm:mx-7 text-lg font-semibold    text-purple-500 w-fit '>Your total Expense:  <span className='font-bold text-red-500 cursor-pointer'>₹  {  totalExpenditure }</span></h2>  
                </div>
          </div>
          <div className='flex items-center ml-7 space-x-2 border-[1.5px] w-fit px-4 rounded-lg border-[#FFAEBC]'>
              <div className='h-4 w-4 bg-[#FFAEBC]'></div>
              <h4 className='font-serif '>Bills to be Paid</h4>
          </div>
          <div className='grid sm:grid-cols-3 lg:grid-cols-4 '>
        {currCategory === "all" ? expenseData.map(({ id, description, category, amount, date }) => {
                const payThisBill = billsToRemove.includes(id);
            return <Card key={id} id={id} description={description} category={category} amount={amount} date={date} setEdit={setEdit} setEditId={setEditId} payThisBill={payThisBill} />
              }) :
          expenseData.filter((data) => {
                 return data.category === currCategory;
          }).map(({ id, description, category, amount, date }) => {
                const payThisBill = billsToRemove.includes(id);
                
                return <Card key={id} id={id} description={description} category={category} amount={amount} date={date} setEdit={setEdit} setEditId={setEditId} payThisBill={payThisBill} />
                })
            
            }
         </div>
    </div>

  )
}

export default Home
