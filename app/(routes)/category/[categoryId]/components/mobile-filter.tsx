'use client';

import { useState } from 'react';
import Button from "@/components/ui/button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import IconButton from '@/components/ui/icon-button';
import Filter from './filter';

interface MobileFiltersProps {
    sizes: Size[],
    colors: Color[]
}

const MobileFilter:React.FC<MobileFiltersProps> = ({ sizes, colors}) => {
    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(true);

    return (
        <>
            <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
                필터
                <Plus size={20}/>
            </Button>

            <Dialog open={open}  onClose={()=> setOpen(false)} as='div' className='relative z-40 lg:hidden'>
                {/* Background color and opacity */}
                <div className='fixed inset-0 bg-black bg-opacity-25'/>

                {/* Dialog Position */}
                <div className='fixed inset-0 z-40 flex'>
                    <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'>
                        {/* close Button */}
                        <div className='flex items-center justify-end px-4'>
                            <IconButton icon={<X size={15} onClick={()=> setOpen(false)}/>}/>
                        </div>

                        <div className='p-4'>
                            <Filter valueKey='sizeId' name='사이즈' data={sizes}/>
                            <Filter valueKey='colorId' name='색상' data={colors}/>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    )
}

export default MobileFilter