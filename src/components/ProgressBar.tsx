
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
}

const ProgressBar = ({ value, className }: ProgressBarProps) => {
  return (
    <div className={cn("dpk-progress", className)}>
      <div
        className="dpk-progress-bar"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
};

export default ProgressBar;
