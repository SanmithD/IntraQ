"use client";

import { UseControllerStore } from "@/app/store/UseControllerStore";
import { ArrowBigDown, ArrowBigUp, Bookmark } from "lucide-react";

type ControllersProp = {
    id: string
};

function Controllers({ id } : ControllersProp) {

    const giveVote = UseControllerStore((state) => state.giveVote);
    const isControllerLoading = UseControllerStore((state) => state.isControllerLoading);
    const handleVote = async(value: string) =>{
        await giveVote(value, id)
    }
  return (
    <div className="flex justify-between items-center text-black gap-4 " >
        <button className="flex items-center gap-1 text-gray-500 font-medium" >
            <ArrowBigUp onClick={()=> handleVote("up") } className="size-6 cursor-pointer hover:text-black " /> length
        </button>
        <button className="flex items-center gap-1 text-gray-500 font-medium" >
            <ArrowBigDown onClick={()=> handleVote("down") } className="size-6 cursor-pointer hover:text-black " />
        </button>
        <div>
            <Bookmark/>
        </div>
    </div>
  )
}

export default Controllers