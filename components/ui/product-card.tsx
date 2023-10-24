'use client'

import { MouseEventHandler } from 'react'

import { useRouter } from 'next/navigation'
import { Product } from "@/types"
import Image from "next/image"
import IconButton from "./icon-button"
import { Expand, ShoppingCart } from "lucide-react"
import Currency from "./currency"
import usePreviewModal from '@/hooks/use-preview-modal'
import useCart from '@/hooks/use-cart'

interface ProductCardProps {
    data: Product
}

const ProductCard:React.FC<ProductCardProps> = ({data}) => {
    const router = useRouter();
    const previewModal = usePreviewModal();
    const cart = useCart();

    const handleClick = () => router.push(`/product/${data.id}`);
    
    const onPreview:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();

        previewModal.onOpen(data);
    }

    const onAddToCart:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        cart.addItem(data);
    }

    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            {/* Image and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image className="aspect-square object-cover rounded-md" alt="Image" src={data?.images[0].url} fill/>

                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex justify-center gap-x-6">
                        <IconButton onClick={onPreview} icon={<Expand size={20} className="text-gray-600"/>} />
                        <IconButton onClick={onAddToCart} icon={<ShoppingCart size={20} className="text-gray-600"/>} />
                    </div>
                </div>
            </div>
            {/* Desc */}
            <div>
                <p className="font-semibold text-lg">{data.name}</p>
                <p className="text-sm text-gray-500">{data.category?.name}</p>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between">
                <Currency value={data.price}/>
            </div>
        </div>
    )
}

export default ProductCard