export function Button({label, trynow, disabled}){
    return (
        <button
            className={`
                px-6 py-3 text-base font-semibold
                rounded-xl shadow-lg
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${disabled 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-customBlue hover:bg-customBlue/80 text-white hover:shadow-xl transform hover:scale-105 focus:ring-customBlue'
                }
            `}
            onClick={trynow}
            disabled={disabled}
        >
            {label}
        </button>
    );
}