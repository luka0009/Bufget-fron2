import React from 'react'
import { useForm } from 'react-hook-form';
import List from './List';
import { useAddTransactionMutation } from '../redux/apiSlice';

export default function Form() {

    const {register, handleSubmit, resetField} = useForm();
    const [addTransaction, results] = useAddTransactionMutation();
    console.log('jlkasjdlkasjdaskldjlaskjaklsjads', results);

    const onSubmit = async (data) => {
        if(!data) return {};
        await addTransaction(data).unwrap();
        console.log(data);
        resetField('name');
        resetField('amount');
    }

  return (
    <div className="form max-w-sm mx-auto w-96">
        
        <h1 className='font-bold pb-4 text-2xl text-white'>Transaction</h1>

        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="input-group">
                    <input type="text" {...register('name')} placeholder='Name (e.g: sallary, rent...)' className='form-input' />
                </div>
                <select className='form-input' {...register('type')}>
                    <option value="Investment/Saving" defaultValue>Investment/Saving</option>
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                </select>
                <div className="input-group">
                    <input type="text" {...register('amount')} placeholder='Amount' className='form-input' />
                </div>
                <div className="submit-btn">
                    <button className='border py-2 text-white bg-indigo-500 w-full'>Add Transaction</button>
                </div>
            </div>    
        </form>

        <List></List>
    </div>
  )
}