export function Buttonfornav({label,onClick}){
   
  return  <button onClick={onClick} class="px-6 py-2 rounded-full bg-[#8e8e8e] text-[#fffdfc] font-medium shadow-inner ">
  {label}
</button>



}