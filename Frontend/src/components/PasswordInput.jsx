import { useState } from "react";
import { HiEyeOff,HiEye } from "react-icons/hi";

export function PasswordInput({password,setPassword}){
         const [touched,setTouched]= useState(false);
         const [showPassword, setShowPassword] = useState(false);

         // Password validation: 5-10 characters with at least one special character
         const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
         const isValid = password.length >= 5 && password.length <= 10 && specialChars.test(password);

         //labelcolor
         let labelcolor= "text-gray-500";
         if(touched && isValid){
            labelcolor= "text-green-500";
         }
         else if(touched){
            labelcolor= "text-red-500";
         }
         //bordercolor
         let inputBorder = "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500";
         if (touched) {
         if (isValid) {
         inputBorder = "border-[#addfad] text-[#addfad] focus:ring-[#addfad] focus:border-[#addfad]";
        } else {
         inputBorder = "border-red-500 text-red-700 focus:ring-red-500 focus:border-red-500";
        }
        }

         //messagecolor
        let message = "";
  let messageColor = "";
  if (touched) {
    if (isValid) {
      message = (
        <>
          <span className="font-medium">Success!</span> Password is valid!
        </>
      );
      messageColor = "text-[#addfad]";
    } else {
      message = (
        <>
          <span className="font-medium">Oops!</span> Password must be 5-10 characters with at least one special character (!@#$%^&*(),.?":{}|&lt;&gt;).
        </>
      );
      messageColor = "text-red-600";
    }
  }


   return (
     <div className="flex flex-col pt-4">
       <div className={`text-lg pb-2 ${labelcolor}`}>Password</div>
       <div className="relative flex justify-center items-center gap-4">
         <span 
           className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 cursor-pointer"
           onClick={() => setShowPassword(!showPassword)}
         >
           {showPassword ? (
             <HiEye className="w-5 h-5" />
           ) : (
             <HiEyeOff className="w-5 h-5" />
           )}
         </span>

         <input 
           id="password"
           type={showPassword ? "text" : "password"}
           placeholder="Enter your Password"
           value={password}
           onBlur={()=> setTouched(true)}
           onInput={(e)=> setPassword(e.target.value)}
           className={`font-segoe pl-10 p-2.5 w-full text-sm rounded-lg shadow-sm border ${inputBorder}`}
           required     
         />
       </div>
       {touched ? <p className={`mt-1 text-sm ${messageColor}`}>{message}</p> : null}
     </div>
   );
}