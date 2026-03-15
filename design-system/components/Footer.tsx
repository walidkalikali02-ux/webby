interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  sections?: FooterSection[];
  copyright?: string;
  socialLinks?: Array<{
    name: string;
    href: string;
    icon?: string;
  }>;
}

export function Footer({
  sections = [],
  copyright,
  socialLinks = [],
}: FooterProps) {
  const defaultSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Docs', href: '/docs' },
        { label: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
      ],
    },
  ];

  const displaySections = sections.length > 0 ? sections : defaultSections;

  return (
    <footer className="py-section-mobile lg:py-section">
      <div className="max-w-container mx-auto px-6">
        <div className="glass rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <h3 className="text-xl font-bold text-primary">Webby</h3>
              <p className="mt-2 text-grey text-sm">
                Build websites with AI power
              </p>
              
              {socialLinks.length > 0 && (
                <div className="flex gap-4 mt-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-grey hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Link sections */}
            {displaySections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-primary">{section.title}</h4>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-grey text-sm hover:text-accent transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {copyright && (
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-center text-grey text-sm">
                {copyright}
              </p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
