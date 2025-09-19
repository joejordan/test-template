import { cn } from '@/lib/utils';

type CircularProgressProps = {
  size?: number;
  className?: string;
  'aria-label'?: string;
};

function CircularProgress({ 
  size = 24, 
  className, 
  'aria-label': ariaLabel = 'Loading' 
}: CircularProgressProps) {
  return (
    <div
      className={cn('inline-flex items-center justify-center', className)}
      role="status"
      aria-label={ariaLabel}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="animate-spin"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
          className="opacity-25"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="23.562"
          className="opacity-75"
        />
      </svg>
    </div>
  );
}

export { CircularProgress, type CircularProgressProps };
