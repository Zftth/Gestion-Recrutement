interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
}) => {
  const baseClasses = 'bg-white rounded-lg border border-secondary-200 shadow-sm';
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : '';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const classes = [
    baseClasses,
    hoverClasses,
    paddingClasses[padding],
    className,
  ].join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};