'use client'

import { cn } from "@/lib/utils"
import { MouseEventHandler } from "react"

interface IconButtonProps {
    onClick?:MouseEventHandler<HTMLButtonElement> | undefined
    icon:React.ReactNode
    className?:string
}

const IconButton:React.FC<IconButtonProps> = ({className,icon,onClick}) => {
  return (
    <button
        onClick={onClick}
        className={cn(
            "rounded-full flex items-center bg-white border shadow-md p-2 hover:scale-110 transtion",
            className
        )}
    >
        {icon}
    </button>
  )
}

export default IconButton