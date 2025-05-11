import { cn } from "@reactive-resume/utils";

type Props = {
  size?: number;
  className?: string;
};

export const Logo = ({ size = 32, className }: Props) => {
  // Use the same EZResume logo for both light and dark modes
  const src = "/logo/ezresume.png";

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="EZResume"
      className={cn("rounded-sm", className)}
    />
  );
}; 