import React from 'react'

const Button = ({buttonVariant, buttonText, onClick}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`mt-5  w-full min-w-8 h-8 px-4 rounded-md font-medium transition text-sm ${
          buttonVariant === "primary"
            ? "bg-[#2372EC] text-white   hover:bg-blue-700"
            : " text-[#424242] border-[0.5px] border-[#8E8E8E]"
        }`}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default Button
