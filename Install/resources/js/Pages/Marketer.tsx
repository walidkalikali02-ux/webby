import { Head } from '@inertiajs/react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/sonner';
import { PageProps } from '@/types';
import {
    FeaturesBento,
    ProductShowcase,
    PricingSection,
    UseCases,
    TestimonialsSection,
    FAQSection,
    FinalCTA,
    Footer,
    AnimatedSection,
    ScrollToTop,
} from '@/components/Landing';
import { MarketerNavbar } from '@/components/Marketer/MarketerNavbar';
import { MarketerHero } from '@/components/Marketer/MarketerHero';

interface MarketerProps extends PageProps {
    canLogin: boolean;
    canRegister: boolean;
    isPusherConfigured: boolean;
    canCreateProject?: boolean;
    cannotCreateReason?: string | null;
    plans?: Array<{
        id: number;
        name: string;
        slug: string;
        description: string | null;
        price: string;
        billing_period: 'monthly' | 'yearly' | 'lifetime';
        features: Array<{ name: string; included: boolean }>;
        is_popular: boolean;
        max_projects: number | null;
        monthly_build_credits: number;
        allow_user_ai_api_key: boolean;
        enable_subdomains?: boolean;
        max_subdomains_per_user?: number | null;
        allow_private_visibility?: boolean;
    }>;
}

export default function Marketer({
    auth,
    canLogin,
    canRegister,
    isPusherConfigured,
    canCreateProject = true,
    cannotCreateReason = null,
    plans = [],
}: MarketerProps) {
    const { t } = useTranslation();

    const metaTitle = t('Marketer — high-converting landing pages');
    const metaDescription = t('Launch landing pages with analytics, CRM-ready lead capture, and conversion-focused design.');

    return (
        <>
            <Head title={metaTitle}>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Toaster />
            <MarketerNavbar auth={auth} canLogin={canLogin} canRegister={canRegister} />
            <main>
                <MarketerHero />
                <AnimatedSection delay={50}>
                    <FeaturesBento
                        content={{
                            title: t('Launch-ready features'),
                            subtitle: t('Everything you need to design, track, and optimize your landing pages.'),
                        }}
                        items={[
                            {
                                title: t('Lead Capture Forms'),
                                description: t('Collect name, email, and company with validation and CRM-ready fields.'),
                                icon: 'Users',
                                size: 'large',
                            },
                            {
                                title: t('CTA Tracking'),
                                description: t('Track clicks and conversions with built-in event analytics.'),
                                icon: 'Zap',
                                size: 'medium',
                            },
                            {
                                title: t('SEO-Ready Structure'),
                                description: t('Clean H1–H3 hierarchy, meta tags, and fast-loading assets.'),
                                icon: 'LayoutTemplate',
                                size: 'medium',
                            },
                            {
                                title: t('Responsive by Default'),
                                description: t('Perfect rendering on mobile, tablet, and desktop.'),
                                icon: 'Layout',
                                size: 'small',
                            },
                            {
                                title: t('Interactive Demos'),
                                description: t('Inline video, calculators, and previews without page reloads.'),
                                icon: 'Eye',
                                size: 'small',
                            },
                            {
                                title: t('A/B Testing Ready'),
                                description: t('Integrate with experimentation tools and ship faster learnings.'),
                                icon: 'Star',
                                size: 'small',
                            },
                            {
                                title: t('Optimized Performance'),
                                description: t('Lightweight components, lazy-loaded media, and caching support.'),
                                icon: 'Rocket',
                                size: 'small',
                            },
                        ]}
                    />
                </AnimatedSection>

                <AnimatedSection delay={100}>
                    <ProductShowcase
                        content={{
                            title: t('See the experience in action'),
                            subtitle: t('Preview pages, play demo videos, and explore interactive tools without leaving the page.'),
                            video_url: 'https://vimeo.com/1138996911',
                        }}
                        settings={{
                            showcase_type: 'video',
                        }}
                    />
                </AnimatedSection>

                <AnimatedSection delay={150}>
                    <UseCases
                        content={{
                            title: t('Why teams choose us'),
                            subtitle: t('Practical benefits you can measure from day one.'),
                        }}
                    />
                </AnimatedSection>

                <AnimatedSection delay={200}>
                    <PricingSection
                        plans={plans}
                        content={{
                            title: t('Simple, transparent pricing'),
                            subtitle: t('Choose the plan that fits your needs. All plans include access to our AI-powered website builder.'),
                        }}
                    />
                </AnimatedSection>

                <AnimatedSection delay={250}>
                    <TestimonialsSection
                        content={{
                            title: t('What our users say'),
                            subtitle: t('Join thousands of satisfied developers and teams who have transformed their workflow.'),
                        }}
                    />
                </AnimatedSection>

                <AnimatedSection delay={300}>
                    <FAQSection
                        content={{
                            title: t('Frequently asked questions'),
                            subtitle: t('Have a different question? Reach out to our support team.'),
                        }}
                    />
                </AnimatedSection>

                <AnimatedSection delay={350}>
                    <FinalCTA
                        auth={auth}
                        isPusherConfigured={isPusherConfigured}
                        canCreateProject={canCreateProject}
                        cannotCreateReason={cannotCreateReason}
                        content={{
                            title: t('Ready to launch a high-converting landing page?'),
                            subtitle: t('Join now and get a personalized setup in minutes.'),
                        }}
                    />
                </AnimatedSection>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}
