import { useState, useEffect, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import ApplicationLogo from '@/components/ApplicationLogo';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/contexts/LanguageContext';
import { trackCtaClick, withUtm } from '@/lib/analytics';

interface NavbarProps {
    auth: {
        user: { id: number; name: string; email: string } | null;
    };
    canLogin: boolean;
    canRegister: boolean;
    enabledSectionTypes?: string[];
}

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

export function Navbar({ auth, canLogin, canRegister, enabledSectionTypes = [] }: NavbarProps) {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Map section types to their nav links
    const allNavLinks = useMemo(() => [
        { label: t('Home'), href: '#top', isAnchor: true, sectionType: 'hero' },
        { label: t('Features'), href: '#features', isAnchor: true, sectionType: 'features' },
        { label: t('Solutions'), href: '/marketer', isAnchor: false, sectionType: 'product_showcase' },
        { label: t('Benefits'), href: '#benefits', isAnchor: true, sectionType: 'use_cases' },
        { label: t('Pricing'), href: '#pricing', isAnchor: true, sectionType: 'pricing' },
        { label: t('FAQ'), href: '#faq', isAnchor: true, sectionType: 'faq' },
        { label: t('Contact'), href: '#contact', isAnchor: true, sectionType: 'footer' },
        { label: t('Marketer'), href: '/marketer', isAnchor: false, sectionType: 'marketer' },
        { label: t('Founders'), href: '/founders', isAnchor: false, sectionType: 'founders' },
    ], [t]);

    // Filter nav links based on enabled sections
    const navLinks = useMemo(() => {
        // If no sections provided (backwards compatibility), show all links
        if (enabledSectionTypes.length === 0) {
            return allNavLinks;
        }
        return allNavLinks.filter(link => enabledSectionTypes.includes(link.sectionType) || link.sectionType === 'footer');
    }, [allNavLinks, enabledSectionTypes]);

    const primaryCtaUrl = withUtm('/register', {
        utm_source: 'landing',
        utm_medium: 'cta',
        utm_campaign: 'nav_primary',
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled
                    ? 'glass-dark shadow-lg'
                    : 'bg-transparent'
            )}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <ApplicationLogo showText size="lg" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) =>
                            link.isAnchor ? (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => handleSmoothScroll(e, link.href)}
                                    className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <LanguageSelector />
                        <ThemeToggle />
                        {auth.user ? (
                            <Button asChild className="glass-btn text-white">
                                <Link href="/create">{t('Dashboard')}</Link>
                            </Button>
                        ) : (
                            <>
                                {canLogin && (
                                    <Button variant="ghost" asChild className="text-white/80 hover:text-white">
                                        <Link href="/login">{t('Sign in')}</Link>
                                    </Button>
                                )}
                                {canRegister && (
                                    <Button
                                        asChild
                                        data-cta="nav-primary"
                                        onClick={() => trackCtaClick('nav_primary', 'navbar', primaryCtaUrl)}
                                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
                                    >
                                        <Link href={primaryCtaUrl}>{t('Start free')}</Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="flex md:hidden items-center gap-2">
                        <LanguageSelector />
                        <ThemeToggle />
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    {mobileMenuOpen ? (
                                        <X className="h-5 w-5" />
                                    ) : (
                                        <Menu className="h-5 w-5" />
                                    )}
                                    <span className="sr-only">{t('Toggle menu')}</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[min(85vw,280px)] sm:w-[350px] p-6">
                                <div className="flex flex-col gap-6 mt-6">
                                    {/* Mobile Nav Links */}
                                    <div className="flex flex-col gap-4">
                                        {navLinks.map((link) =>
                                            link.isAnchor ? (
                                                <a
                                                    key={link.label}
                                                    href={link.href}
                                                    onClick={(e) => {
                                                        handleSmoothScroll(e, link.href);
                                                        setMobileMenuOpen(false);
                                                    }}
                                                    className="text-lg font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                                                >
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={link.label}
                                                    href={link.href}
                                                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {link.label}
                                                </Link>
                                            )
                                        )}
                                    </div>

                                    {/* Mobile Actions */}
                                    <div className="flex flex-col gap-3 pt-4 border-t">
                                        {auth.user ? (
                                            <Button asChild className="w-full">
                                                <Link href="/create">{t('Dashboard')}</Link>
                                            </Button>
                                        ) : (
                                            <>
                                                {canLogin && (
                                                    <Button variant="outline" asChild className="w-full">
                                                        <Link href="/login">{t('Sign in')}</Link>
                                                    </Button>
                                                )}
                                        {canRegister && (
                                            <Button
                                                asChild
                                                className="w-full"
                                                data-cta="nav-primary-mobile"
                                                onClick={() => trackCtaClick('nav_primary_mobile', 'navbar', primaryCtaUrl)}
                                            >
                                                <Link href={primaryCtaUrl}>{t('Start free')}</Link>
                                            </Button>
                                        )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    );
}
