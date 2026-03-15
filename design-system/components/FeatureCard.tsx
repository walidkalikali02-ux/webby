import { ReactNode } from 'react';

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  bullets?: string[];
  children?: ReactNode;
}

export function FeatureCard({
  icon,
  title,
  description,
  bullets,
  children,
}: FeatureCardProps) {
  return (
    <div className="glass rounded-xl p-6 glass-hover">
      {icon && (
        <div className="w-12 h-12 flex items-center justify-center glass bg-accent/20 rounded-lg text-accent mb-4">
          {icon}
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-primary">
        {title}
      </h3>
      
      {description && (
        <p className="mt-2 text-grey">
          {description}
        </p>
      )}
      
      {bullets && bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2 text-grey-dark">
              <span className="text-accent mt-1">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}
