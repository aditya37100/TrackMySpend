import { useState } from "react";
import { HiUser } from "react-icons/hi";

export function NameInput({ name, setName }){
   return <div className="flex flex-col pt-4 pb-4">
    <div className={`text-lg pb-2 ` }>Name</div>
    <div className=" relative flex justify-center items-center gap-4 ">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 ">
        <HiUser className="w-5 h-5" />

</span>

    <input 
    id="name"
    placeholder="Enter your Name"
    value={name || ""}
    onInput={(e)=> setName(e.target.value)}

    className={` font-segoe pl-10 p-2.5 w-full text-sm rounded-lg shadow-sm border`}
    required     
    
    />
   </div>
 
   </div>



}