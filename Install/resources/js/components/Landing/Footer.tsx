import { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/components/ApplicationLogo';
import { useTranslation } from '@/contexts/LanguageContext';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { trackCtaClick } from '@/lib/analytics';

export function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const footerLinks = useMemo(() => [
        { label: t('Privacy Policy'), href: '/privacy' },
        { label: t('Terms of Service'), href: '/terms' },
        { label: t('Cookie Policy'), href: '/cookies' },
    ], [t]);

    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = encodeURIComponent(t('Discover how to launch high-converting landing pages faster.'));
    const shareLinks = useMemo(() => [
        {
            label: 'Facebook',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
            icon: Facebook,
        },
        {
            label: 'LinkedIn',
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
            icon: Linkedin,
        },
        {
            label: 'Twitter',
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${shareText}`,
            icon: Twitter,
        },
    ], [pageUrl, shareText]);

    return (
        <footer id="contact" className="relative">
            <div className="absolute inset-0 gradient-mesh opacity-30" />
            <div className="w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="space-y-4">
                        <Link href="/" className="flex-shrink-0 text-start">
                            <ApplicationLogo showText size="lg" />
                        </Link>
                        <p className="text-white/70 text-sm leading-relaxed">
                            {t('Build websites from your ideas in minutes. Professional website builder with no coding required.')}
                        </p>
                        <div className="flex items-center gap-3">
                            {shareLinks.map((share) => {
                                const Icon = share.icon;
                                return (
                                    <a
                                        key={share.label}
                                        href={share.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-9 w-9 rounded-full glass flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                                        data-cta={`share-${share.label.toLowerCase()}`}
                                        onClick={() => trackCtaClick(`share_${share.label.toLowerCase()}`, 'footer', share.href)}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wide">{t('Contact')}</h4>
                        <div className="text-sm text-muted-foreground space-y-2">
                            <p>{t('Email')}: hello@webby.io</p>
                            <p>{t('Phone')}: +1 (415) 555-0182</p>
                            <p>{t('Address')}: 548 Market St, San Francisco, CA</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wide">{t('Resources')}</h4>
                        <div className="flex flex-col gap-3">
                            {footerLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {t('FAQ')}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {currentYear}. {t('All Rights Reserved.')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
