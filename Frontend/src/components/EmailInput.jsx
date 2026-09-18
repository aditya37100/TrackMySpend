import { useState } from "react";
import { HiMail } from "react-icons/hi";

export default function EmailInput({ email, setEmail }) {
  const [touched, setTouched] = useState(false);

  const isValid = email && email.includes("@");

  // Label Color
  let labelColor = "text-gray-700";
  if (touched && isValid) {
    labelColor = "text-[#addfad]";
  } else if (touched) {
    labelColor = "text-red-700";
  }

  // Input Field Border Styles
  let inputBorder = "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500";
  if (touched) {
    if (isValid) {
      inputBorder = "border-[#addfad] text-[#addfad] focus:ring-[#addfad] focus:border-[#addfad]";
    } else {
      inputBorder = "border-red-500 text-red-700 focus:ring-red-500 focus:border-red-500";
    }
  }

  // Validation message content
  let message = "";
  let messageColor = "";
  if (touched) {
    if (isValid) {
      message = (
        <>
          <span className="font-medium">Success!</span> Email is valid!
        </>
      );
      messageColor = "text-[#addfad]";
    } else {
      message = (
        <>
          <span className="font-medium">Oops!</span> Please enter a valid email.
        </>
      );
      messageColor = "text-red-600";
    }
  }

  return (
    <div className="flex max-w-md flex-col gap-6">
      <div>
        <label htmlFor="email" className={`block mb-2 text-lg font-medium ${labelColor}`}>
           Email
        </label>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <HiMail className="w-5 h-5" />
          </span>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email || ""}
            
            onBlur={() => setTouched(true)}
            onInput={(e) => setEmail(e.target.value)}
            className={` font-segoe pl-10 p-2.5 w-full text-sm rounded-lg border shadow-sm
              ${inputBorder}
              bg-white dark:bg-customBlack dark:text-white dark:placeholder-gray-400 dark:border-gray-600
              dark:focus:ring-customLavender dark:focus:border-customLavender
            `}
            required
          />
        </div>

        {touched && <p className={`mt-1 text-sm ${messageColor}`}>{message}</p>}
      </div>
    </div>
  );
}
