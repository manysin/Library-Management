"use client"
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

export default function Navbar() {

    const counter = useAppSelector((state) => state.counter.value)

    return (
        <p className='pt-24 text-center'></p>
    )
}
