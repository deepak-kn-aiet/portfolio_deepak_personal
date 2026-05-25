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
        isNav ? "rounded-[10px] bg-[radial-gradient(circle_40px_at_80%_-10%,_#ffffff30,_#181b1b)]" : "p-[3px] rounded-[20px] bg-[radial-gradient(circle_120px_at_80%_-10%,_#ffffff,_#181b1b)]",
        className
      )}
      {...props}
    > 
      {/* Glow behind button */} 
      <div className={cn(
        "absolute top-0 right-0 rounded-[120px] transition-all duration-300 ease-out -z-10",
        isNav ? "w-[40%] h-[40%] shadow-[0_0_10px_#ffffff15] group-hover:shadow-[0_0_20px_#ffffff25]" : "w-[65%] h-[60%] shadow-[0_0_20px_#ffffff38] group-hover:shadow-[0_0_40px_#ffffff60]"
      )} /> 
 
      {/* Bottom-left green blob */} 
      <div className={cn(
        "absolute bottom-0 left-0 rounded-[17px] transition-all duration-300 ease-out bg-[radial-gradient(circle_60px_at_0%_100%,_#3fff75,_#00ff8050,_transparent)]",
        isNav ? "w-[20px] h-[30%] shadow-[-1px_4px_20px_#00ff2d20] group-hover:w-[35px]" : "w-[70px] h-[50%] shadow-[-2px_9px_40px_#00ff2d40] group-hover:w-[120px] group-hover:shadow-[-4px_1px_45px_#00ff2d60]"
      )} /> 
 
      {/* Inner content */} 
      <div className={cn(
        "relative group-hover:scale-105 text-white bg-[radial-gradient(circle_80px_at_80%_-50%,_#777777,_#0f1111)] z-10 transition-all duration-300 flex items-center gap-3",
        isNav ? "px-[12px] py-[6px] rounded-[9px]" : "px-[35px] py-[18px] rounded-[18px]"
      )}> 
        {text && <span className={cn("font-bold", isNav ? "text-[0.75rem]" : "text-[1.2rem]")}>{text}</span>}
        {children}
 
        {/* Inner glow layer */} 
        <div className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_60px_at_0%_100%,_#00e1ff1a,_#0000ff11,_transparent)] z-[-1]",
          isNav ? "rounded-[9px]" : "rounded-[14px]"
        )} /> 
      </div> 
    </button> 
  ); 
}; 
 
export default RealismButton; 
