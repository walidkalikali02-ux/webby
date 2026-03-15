import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { Linkedin } from 'lucide-react';
import { trackCtaClick, withUtm } from '@/lib/analytics';

export function MarketerHero() {
    const { t } = useTranslation();
    const { resolvedTheme } = useTheme();

    const primaryCtaUrl = withUtm('/register', {
        utm_source: 'marketer',
        utm_medium: 'cta',
        utm_campaign: 'hero_primary',
    });

    const showcaseImage =
        resolvedTheme === 'dark'
            ? '/screenshots/preview-dark.png'
            : '/screenshots/preview-light.png';

    return (
        <section id="top" className="relative min-h-dvh flex items-center px-4 pt-24 pb-20 sm:pb-24 bg-background">
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="text-center lg:text-start">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
                            {t('Marketer helps you launch landing pages that convert')}
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {t('Design fast, capture leads, and optimize performance with analytics, CRM-ready forms, and built-in experiments.')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8">
                            <Button
                                asChild
                                size="lg"
                                data-cta="marketer-hero-primary"
                                onClick={() => trackCtaClick('marketer_hero_primary', 'hero', primaryCtaUrl)}
                                className="w-full sm:w-auto"
                            >
                                <a href={primaryCtaUrl}>{t('Start free')}</a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                data-cta="marketer-hero-demo"
                                onClick={() => trackCtaClick('marketer_hero_demo', 'hero', '#solutions')}
                                className="w-full sm:w-auto"
                            >
                                <a href="#solutions">{t('Watch the demo')}</a>
                            </Button>
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-muted-foreground">
                            <span>{t('No credit card required')}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{t('Setup in under 10 minutes')}</span>
                        </div>
                        <a
                            href="https://www.linkedin.com/company/marketer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                        >
                            <Linkedin className="h-4 w-4" />
                            {t('Follow us on LinkedIn')}
                        </a>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-3xl border border-border/60 bg-card/70 shadow-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <span className="text-xs text-muted-foreground ms-2">
                                    {t('Live preview')}
                                </span>
                            </div>
                            <div className="relative aspect-[4/3] bg-background">
                                <img
                                    src={showcaseImage}
                                    alt={t('Landing page preview')}
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -end-6 hidden md:block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-medium border border-primary/20">
                            {t('Built for marketing teams')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
