import { MouseEventHandler} from 'react'
import { Product } from "@/types"
import Currency from "./ui/currency"
import Button from "./ui/button"
import { ShoppingCart } from "lucide-react"
import useCart from '@/hooks/use-cart'

interface InfoProps {
    data: Product
}

const Info:React.FC<InfoProps> = ({data}) => {
    const cart = useCart();

    const onAddToCart:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        cart.addItem(data);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-700">{data.name}</h1>            
            <div className="mt-3 flex items-center justify-between">
                <p className="text-2xl text-gray-700">
                    <Currency value={data?.price}/>
                </p>
            </div>
            <hr className="my-4"/>
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-gray-600">사이즈:</h3>
                    <div>
                        {data?.size?.name}
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-gray-600">색상:</h3>
                    <div className="h-6 w-6 rounded-full border border-gray-600" style={{backgroundColor:data?.color?.value}}/>
                    <span>{data?.color.name}</span>
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button onClick={onAddToCart} className="flex items-center gap-x-2">
                    카트에 담기
                    <ShoppingCart />
                </Button>
            </div>
        </div>
    )
}

export default Info