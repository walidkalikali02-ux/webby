interface LogoStripProps {
  logos: Array<{
    name: string;
    src?: string;
    alt: string;
  }>;
  title?: string;
}

export function LogoStrip({ logos, title = 'Trusted by' }: LogoStripProps) {
  return (
    <section className="py-section-mobile lg:py-section bg-surface">
      <div className="max-w-container mx-auto px-6">
        {title && (
          <p className="text-center text-grey text-sm uppercase tracking-wider mb-8">
            {title}
          </p>
        )}
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-150"
            >
              {logo.src ? (
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-8 md:h-10 object-contain"
                />
              ) : (
                <span className="text-xl font-semibold text-grey-dark">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
