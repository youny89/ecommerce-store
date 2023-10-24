import { Product } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from 'react-hot-toast'

interface CartStore {
    items:Product[]
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items:[],
        addItem:(data: Product) => {
            const currentItems = get().items;
            const existtingItem = currentItems.find(item=> item.id === data.id);
            if(existtingItem) {
                return toast('이미 카트에 담긴 상품입니다.')
            }

            set({ items:[...get().items, data]});
            toast.success('카트에 상품이 추가 되었습니다.')
        },
        removeItem: (id: string) => {
            set({items:[...get().items.filter(item=> item.id !== id)]})
            toast.success('카트에 상품이 제거 되었습니다.')
        },
        removeAll:()=> set({items:[]})
    }),{
        name:'cart-storage',
        storage: createJSONStorage(()=> localStorage)
    })
)

export default useCart;