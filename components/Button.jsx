import React from "react";

const Button = React.forwardRef(function Button({ children, ...props }, ref) {
  return (
    <button ref={ref} className="border py-1  px-5 " {...props}>
      {children}
    </button>
  );
});

export default Button;
