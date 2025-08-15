interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const classes = [
    'animate-spin rounded-full border-2 border-secondary-200 border-t-primary-600',
    sizeClasses[size],
    className,
  ].join(' ');

  return <div className={classes} />;
};