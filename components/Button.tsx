import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
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
