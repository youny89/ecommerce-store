'use client'

import { useEffect } from 'react'
import Button from "@/components/ui/button"
import Currency from "@/components/ui/currency"
import useCart from "@/hooks/use-cart"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import  { toast } from 'react-hot-toast'

const Summary = () => {
    const searchParams = useSearchParams();
    const items = useCart(state=>state.items);
    const removeAll = useCart(state=>state.removeAll);

    const totalPrice = items.reduce((total, item)=> total + Number(item.price), 0);

    // after checkout, redirecte to this page again with search params.
    useEffect(()=>{
        if(searchParams.get("success")) {
            toast.success('결제 완료')
            removeAll();
        }
        if(searchParams.get('canceled')) {
            toast.error('결제 실패')
        }
    },[searchParams, removeAll])

    const onCheckout = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`,{
                productIds: items.map(item => item.id)
            })
            window.location = response.data.url;
            
        } catch (error) {
            toast.error('결제 실패')
        }
    }

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-8 lg:p-8 shadow-lg">
            <h2 className="text-lg font-medium text-gray-900">주문 내역</h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-800">
                        총 금액
                    </div>
                    <Currency value={totalPrice}/>
                </div>
            </div>
            <Button onClick={onCheckout} className="w-full mt-6">결제</Button>
        </div>
    )
}

export default Summary