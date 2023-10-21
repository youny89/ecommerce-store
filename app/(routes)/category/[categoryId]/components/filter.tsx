'use client';

import qs from 'query-string'
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterProps {
    valueKey:string;
    name:string;
    data:Size[] | Color[]
}

const Filter:React.FC<FilterProps> = ({
    valueKey,
    name,
    data
}) => {

    const searchParams = useSearchParams()
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString()) 
        const query = {
            ...current,
            [valueKey]: id
        }

        // if click again, removing filter by setting null.
        if(current[valueKey] === id) {
            query[valueKey] = null
        }

        const url = qs.stringifyUrl({
            url:window.location.href,
            query
        },{ skipNull: true})

        router.push(url);
    }


    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-400">{name}</h3>
            <hr />
            <div className="flex flex-wrap gap-2">
                {data.map(filter=>(
                    <div key={filter.id} className="flex flex-items">
                        <Button
                            className={cn(
                                "rounded-md text-sm text-gray-800 p-2 bg-white border brder-gray-300",
                                selectedValue === filter.id && 'bg-black text-white'
                            )}
                            onClick={()=>onClick(filter.id)}
                        >
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter