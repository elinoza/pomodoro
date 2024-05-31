import React from "react";
import clsx from "clsx";

const Button = React.forwardRef(function Button(
  { className, children, ...props },
  ref
) {
  return (
    <button ref={ref} className={clsx("py-1 px-5 ", className)} {...props}>
      {children}
    </button>
  );
});

export default Button;
