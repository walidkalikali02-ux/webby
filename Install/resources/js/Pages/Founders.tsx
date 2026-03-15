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

interface FoundersProps extends PageProps {
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

export default function Founders({
    auth,
    canLogin,
    canRegister,
    isPusherConfigured,
    canCreateProject = true,
    cannotCreateReason = null,
    plans = [],
}: FoundersProps) {
    const { t } = useTranslation();

    const metaTitle = t('Founders — Build your product without a technical co-founder');
    const metaDescription = t('AI-powered platform that acts as your technical co-founder. Turn ideas into products faster with built-in infrastructure.');

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
            <main>
                <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
                    {/* Animated background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(120,119,198,0.3),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
                    </div>
                    
                    <div className="container relative z-10 px-4 py-24 mx-auto">
                        <div className="max-w-5xl mx-auto text-center">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium rounded-full bg-white/5 border border-white/10 text-white/80 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
                                    <span className="relative inline-flex w-2 h-2 bg-green-400 rounded-full" />
                                </span>
                                {t('No coding required')}
                            </div>
                            
                            {/* Main Headline */}
                            <h1 className="max-w-4xl mx-auto mb-8 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                                    {t('Build your product')}
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                                    {t('without writing code')}
                                </span>
                            </h1>
                            
                            {/* Subheadline */}
                            <p className="max-w-2xl mx-auto mb-10 text-lg text-zinc-400 md:text-xl leading-relaxed">
                                {t("You don't need a technical co-founder. Describe your idea in plain English and watch your product come to life with production-ready infrastructure.")}
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-16">
                                <a
                                    href={canRegister ? '/register' : '#pricing'}
                                    className="inline-flex items-center justify-center h-14 px-10 text-base font-semibold text-black transition-all bg-white rounded-lg hover:bg-zinc-200 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                                >
                                    {t('Start Building Free')}
                                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                <a
                                    href="#demo"
                                    className="inline-flex items-center justify-center h-14 px-10 text-base font-semibold text-white transition-all border border-white/20 rounded-lg hover:bg-white/5"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {t('See it in action')}
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 max-w-3xl mx-auto p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">10x</div>
                                    <div className="text-sm text-zinc-500">{t('Faster')}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">0%</div>
                                    <div className="text-sm text-zinc-500">{t('Coding')}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">24h</div>
                                    <div className="text-sm text-zinc-500">{t('to MVP')}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
                                    <div className="text-sm text-zinc-500">{t('Yours')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Code Preview Mockup */}
                        <div className="mt-16 max-w-4xl mx-auto">
                            <div className="relative rounded-xl bg-[#1e1e1e] border border-white/10 shadow-2xl overflow-hidden">
                                {/* Window Controls */}
                                <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <div className="ml-4 text-xs text-zinc-500">app.tsx</div>
                                </div>
                                {/* Code */}
                                <div className="p-6 text-left font-mono text-sm overflow-x-auto">
                                    <div className="text-zinc-500">// Describe your idea...</div>
                                    <div className="text-purple-400">const <span className="text-yellow-300">app</span> = await build(</div>
                                    <div className="pl-4 text-zinc-300">name: <span className="text-green-400">"SaaS Dashboard"</span>,</div>
                                    <div className="pl-4 text-zinc-300">features: [</div>
                                    <div className="pl-8 text-zinc-300"><span className="text-green-400">"user auth"</span>,</div>
                                    <div className="pl-8 text-zinc-300"><span className="text-green-400">"analytics"</span>,</div>
                                    <div className="pl-8 text-zinc-300"><span className="text-green-400">"payments"</span></div>
                                    <div className="pl-4 text-zinc-300">]</div>
                                    <div className="pl-4 text-zinc-300">)</div>
                                    <div className="mt-2 text-zinc-500">// AI builds your full product →</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
                            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
                        </div>
                    </div>
                </section>

                <AnimatedSection delay={50}>
                    <section className="py-20 bg-muted/30">
                        <div className="container px-4 mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                    {t('Your AI Co-Founder does the work of')}
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    {t('A full development team, available 24/7')}
                                </p>
                            </div>
                            
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div className="p-6 bg-background rounded-xl border shadow-sm">
                                    <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-primary/10">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{t('Full-Stack Developer')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('Frontend, backend, databases - all handled automatically')}
                                    </p>
                                </div>
                                
                                <div className="p-6 bg-background rounded-xl border shadow-sm">
                                    <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-primary/10">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{t('DevOps Engineer')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('Database, auth, storage, and CDN - all pre-configured')}
                                    </p>
                                </div>
                                
                                <div className="p-6 bg-background rounded-xl border shadow-sm">
                                    <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-primary/10">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{t('UI/UX Designer')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('Beautiful, responsive designs that look professional')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                    <section className="py-20">
                        <div className="container px-4 mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                    {t('How it works')}
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    {t('From idea to product in 3 simple steps')}
                                </p>
                            </div>
                            
                            <div className="grid gap-8 md:grid-cols-3">
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                                        1
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{t('Describe Your Idea')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('Tell us what you want to build in plain English. No technical jargon needed.')}
                                    </p>
                                </div>
                                
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                                        2
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{t('AI Builds It')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('Our AI generates the full application code with database, auth, and all features.')}
                                    </p>
                                </div>
                                
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                                        3
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{t('Launch & Scale')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('Deploy to production with custom domain, SEO, and scaling built-in.')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection delay={150}>
                    <section className="py-20 bg-muted/30">
                        <div className="container px-4 mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                    {t('Production infrastructure included')}
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    {t('Everything you need to launch to real users')}
                                </p>
                            </div>
                            
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {[
                                    { icon: 'Database', title: t('PostgreSQL Database'), desc: t('Full database with migrations') },
                                    { icon: 'Shield', title: t('Authentication'), desc: t('User login & management') },
                                    { icon: 'HardDrive', title: t('File Storage'), desc: t('Image & file uploads') },
                                    { icon: 'Zap', title: t('Edge CDN'), desc: t('Fast global delivery') },
                                    { icon: 'Search', title: t('SEO Ready'), desc: t('Meta tags & sitemaps') },
                                    { icon: 'Lock', title: t('SSL Certificates'), desc: t('Automatic HTTPS') },
                                    { icon: 'GitBranch', title: t('GitHub Sync'), desc: t('Full code ownership') },
                                    { icon: 'Rocket', title: t('Custom Domain'), desc: t('Your own URL') },
                                    { icon: 'BarChart', title: t('Analytics'), desc: t('Track usage & metrics') },
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-lg border">
                                        <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-primary/10">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{feature.title}</h4>
                                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                    <section className="py-20">
                        <div className="container px-4 mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                    {t('Tech stack you own')}
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    {t('Industry-standard technologies with full code ownership')}
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap justify-center gap-4">
                                {['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vercel', 'GitHub'].map((tech) => (
                                    <span key={tech} className="px-4 py-2 text-sm font-medium bg-muted rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="mt-12 p-6 bg-muted/30 rounded-xl max-w-2xl mx-auto">
                                <p className="text-center text-lg">
                                    <span className="font-semibold text-primary">{t('Developer Mode')} </span>
                                    {t('- Want to customize code? Open in your IDE and modify directly. Full GitHub sync included.')}
                                </p>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection delay={250}>
                    <section className="py-20 bg-muted/30">
                        <div className="container px-4 mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                    {t('Who is this for?')}
                                </h2>
                            </div>
                            
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {[
                                    { title: t('SaaS Founders'), desc: t('Launch your SaaS idea without hiring developers') },
                                    { title: t('Solo Entrepreneurs'), desc: t('Build products while saving on costs') },
                                    { title: t('Non-Tech Founders'), desc: t('Transform your idea into reality') },
                                    { title: t('Intrapreneurs'), desc: t('Ship internal tools quickly') },
                                    { title: t('Agencies'), desc: t('Deliver client projects faster') },
                                    { title: t('Startups'), desc: t('Validate ideas with MVPs fast') },
                                ].map((useCase, i) => (
                                    <div key={i} className="p-6 bg-background rounded-xl border hover:border-primary/50 transition-colors">
                                        <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                                        <p className="text-muted-foreground">{useCase.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                    <PricingSection
                        plans={plans}
                        content={{
                            title: t('Simple, transparent pricing'),
                            subtitle: t('Start free, scale as you grow'),
                        }}
                    />
                </AnimatedSection>

                <AnimatedSection delay={350}>
                    <TestimonialsSection
                        content={{
                            title: t('Success stories'),
                            subtitle: t('Founders who built without code'),
                        }}
                    />
                </AnimatedSection>

                <AnimatedSection delay={400}>
                    <FAQSection
                        content={{
                            title: t('Frequently asked questions'),
                            subtitle: t('Everything you need to know'),
                        }}
                        faqs={[
                            { question: t('Do I need coding skills?'), answer: t('No! Describe what you want in plain English and AI builds it.') },
                            { question: t('Can I scale my project?'), answer: t('Yes! Projects start ready for production with auto-scaling.') },
                            { question: t('Who owns the code?'), answer: t('You do! Full GitHub sync and code export available.') },
                            { question: t('Can I use it for client projects?'), answer: t('Absolutely! Many agencies use it for client work.') },
                        ]}
                    />
                </AnimatedSection>

                <AnimatedSection delay={450}>
                    <FinalCTA
                        auth={auth}
                        isPusherConfigured={isPusherConfigured}
                        canCreateProject={canCreateProject}
                        cannotCreateReason={cannotCreateReason}
                        content={{
                            title: t('Ready to build without a technical co-founder?'),
                            subtitle: t('Start now and launch your MVP in hours, not months'),
                        }}
                    />
                </AnimatedSection>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}
