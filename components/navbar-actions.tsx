'use client';

import { useState, useEffect } from 'react'
import { ShoppingBag } from "lucide-react";
import Button from "./ui/button";
import useCart from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';


// we gonna useing cart in here.
// and cat is going to use locastorage-> it could be cause hydration error. 
const NavbarActions = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false)
  const cart = useCart();

  useEffect(() => setIsMounted(true), [])

  if(!isMounted) return null;

  return (
    <div className="ml-auto flex items-center pap-x-4">
      <Button onClick={()=>router.push('/cart')} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white"/>
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  )
}

export default NavbarActions