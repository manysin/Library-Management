'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react'
import { increment, decrement, incrementByAmount } from '@/redux/features/counter/counterSlice';

export default function Counter() {

    const counter = useAppSelector((state) => state.counter.value)
    const [amount, setAmount] = useState(10);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetch('/api/users')
            .then((res) => res.json())
            .then((data) => console.log(data));
    })

    return (
        <div className='h-screen grid place-content-center'>
            <h1 className='font-semibold text-center pb-10'>{counter}</h1>
            <div className='flex gap-4'>
                <button onClick={() => dispatch(increment())} className='bg-blue-800 text-white py-1.5 px-3 rounded-md'>Increase by 1</button>
                <button onClick={() => dispatch(decrement())} className='bg-blue-800 text-white py-1.5 px-3 rounded-md'>Decrease by 1</button>

            </div>
            <div>
                <button onClick={() => dispatch(incrementByAmount(amount))} className='bg-blue-800 text-white py-1.5 px-3 rounded-md'>Decrease by {amount}</button>
            </div>
        </div>
    )
}
