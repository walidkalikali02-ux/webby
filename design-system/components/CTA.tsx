import { Button } from './Button';

interface CTAProps {
  title: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export function CTA({ 
  title, 
  description, 
  primaryCta, 
  secondaryCta 
}: CTAProps) {
  return (
    <section className="py-section-mobile lg:py-section">
      <div className="max-w-container mx-auto px-6">
        <div className="glass-dark rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-h2 font-bold text-primary">
            {title}
          </h2>
          
          {description && (
            <p className="mt-4 text-lg text-grey max-w-2xl mx-auto">
              {description}
            </p>
          )}
          
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCta && (
                <Button variant="primary" size="lg">
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="glass border-white/30 text-white hover:bg-white/20"
                >
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
