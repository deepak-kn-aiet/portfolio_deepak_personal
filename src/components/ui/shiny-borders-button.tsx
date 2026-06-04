import React from 'react'; 
import { cn } from '../../lib/utils';

interface RealismButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'nav';
}

const RealismButton = ({ text, className, children, variant = 'default', ...props }: RealismButtonProps) => { 
  const isNav = variant === 'nav';

  return ( 
    <button 
      className={cn(
        "group relative p-[1px] border-none cursor-pointer transition-all inline-flex items-center justify-center",
        isNav ? "rounded-[10px]" : "p-[2px] rounded-[14px]",
        className
      )}
      {...props}
    > 
      {/* Inner content */} 
      <div className={cn(
        "relative group-hover:scale-105 text-white bg-black/80 backdrop-blur-md border border-white/10 z-10 transition-all duration-300 flex items-center gap-2",
        isNav ? "px-[12px] py-[6px] rounded-[9px]" : "px-[24px] py-[12px] rounded-[12px]"
      )}> 
        {text && <span className={cn("font-bold", isNav ? "text-[0.75rem]" : "text-[1rem]")}>{text}</span>}
        {children}
      </div> 
    </button> 
  ); 
}; 
 
export default RealismButton; 
