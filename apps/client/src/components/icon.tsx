import { cn } from "@reactive-resume/utils";

type Props = {
  size?: number;
  className?: string;
};

export const Icon = ({ size = 32, className }: Props) => {
  // Always use the ezresume.png logo instead of SVG icons
  const src = "/logo/ezresume.png";

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="EZ Resume"
      className={cn("rounded-sm", className)}
    />
  );
};
