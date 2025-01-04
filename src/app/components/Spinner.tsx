"use client";
import theme from "theme";

interface SpinnerProps {
  height?: number;
  width?: number;
}

const Spinner = ({ height = 48, width = 48 }: SpinnerProps) => {
  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
        borderColor: theme.palette.primary.light,
        borderTopColor: theme.palette.primary.main,
      }}
      className="animate-spin rounded-full border-8 border-solid"
    />
  );
};

export default Spinner;
