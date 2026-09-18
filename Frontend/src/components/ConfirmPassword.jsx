import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export function ConfirmPasswordInput({ password, confirmPassword, setConfirmPassword }) {
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isMatch = confirmPassword === password && password !== "";

  // label color
  let labelcolor = "text-gray-500";
  if (confirmTouched && isMatch) {
    labelcolor = "text-green-500";
  } else if (confirmTouched) {
    labelcolor = "text-red-500";
  }

  // input border color
  let inputBorder =
    "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500";
  if (confirmTouched) {
    if (isMatch) {
      inputBorder =
        "border-[#addfad] text-[#addfad] focus:ring-[#addfad] focus:border-[#addfad]";
    } else {
      inputBorder =
        "border-red-500 text-red-700 focus:ring-red-500 focus:border-red-500";
    }
  }

  // message
  let message = "";
  let messageColor = "";
  if (confirmTouched && confirmPassword !== "") {
    if (isMatch) {
      message = (
        <>
          <span className="font-medium">Success!</span> Password is valid!
        </>
      );
      messageColor = "text-[#addfad]";
    } else {
      message = (
        <>
          <span className="font-medium">Oops!</span>Password not matched!!!
        </>
      );
      messageColor = "text-red-600";
    }
  }

  return (
    <div className="flex flex-col pt-4 pl-6">
      <div className={`text-lg pb-2  ${labelcolor}`}>Re-enter Password</div>
      <div className="relative flex items-center gap-4 ">
        {/* Left Icon */}
        <span 
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
        </span>

        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={confirmPassword || ""}
          onBlur={() => setConfirmTouched(true)}
          onInput={(e) => setConfirmPassword(e.target.value)}
          className={`font-segoe pl-10 pr-10 p-2.5 w-full text-sm rounded-lg shadow-sm border ${inputBorder}`}
          required
        />

        
      </div>

      {confirmTouched && confirmPassword !== "" && (
        <p className={`mt-1 text-sm ${messageColor}`}>{message}</p>
      )}
    </div>
  );
}
