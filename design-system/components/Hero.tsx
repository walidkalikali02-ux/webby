import { ReactNode } from 'react';
import { Button } from './Button';

interface HeroProps {
  headline: string;
  subtitle?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  children?: ReactNode;
  align?: 'center' | 'left';
}

export function Hero({
  headline,
  subtitle,
  primaryCta,
  secondaryCta,
  children,
  align = 'center',
}: HeroProps) {
  const alignmentStyles = {
    center: 'text-center',
    left: 'text-left',
  };

  return (
    <section className="py-section-mobile lg:py-section">
      <div className="max-w-container mx-auto px-6">
        <div className={`max-w-4xl ${alignmentStyles[align]} mx-auto`}>
          <div className="glass rounded-2xl p-8 md:p-12">
            <h1 className="text-h1 font-bold text-primary leading-tight">
              {headline}
            </h1>
            
            {subtitle && (
              <p className="mt-6 text-lg text-grey max-w-2xl mx-auto" style={{ 
                marginLeft: align === 'left' ? 0 : 'auto', 
                marginRight: align === 'left' ? 0 : 'auto' 
              }}>
                {subtitle}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className={`mt-8 flex gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
                {primaryCta && (
                  <Button variant="primary" size="lg">
                    {primaryCta.text}
                  </Button>
                )}
                {secondaryCta && (
                  <Button variant="secondary" size="lg">
                    {secondaryCta.text}
                  </Button>
                )}
              </div>
            )}

            {children && (
              <div className="mt-12">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
