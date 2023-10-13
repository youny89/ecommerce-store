'use client'

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('kr');

interface CurrencyProps {
    value?: string|number
}

const Currency = ({value}:CurrencyProps) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(()=> setIsMounted(true),[])
    if(!isMounted) return null;
  return (
    <div className="font-semibold">
        {formatter.format(Number(value))}원
    </div>
  )
}

export default Currency