'use client';

import { useState, useEffect } from 'react'
import { ShoppingBag } from "lucide-react";
import Button from "./ui/button";


// we gonna useing cart in here.
// and cat is going to use locastorage-> it could be cause hydration error. 
const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  if(!isMounted) return null;

  return (
    <div className="ml-auto flex items-center pap-x-4">
      <Button className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white"/>
        <span className="ml-2 text-sm font-medium text-white">
          0
        </span>
      </Button>
    </div>
  )
}

export default NavbarActions