import {
    Sparkles,
    Eye,
    Code,
    Download,
    LayoutTemplate,
    MessageSquare,
    Globe,
    Terminal,
    Rocket,
    Palette,
    Building,
    Layout,
    LayoutDashboard,
    ShoppingCart,
    Briefcase,
    Settings,
    Zap,
    Star,
    Users,
    HelpCircle,
    type LucideIcon,
} from 'lucide-react';

// Icon name to component mapping
const ICON_MAP: Record<string, LucideIcon> = {
    Sparkles,
    Eye,
    Code,
    Download,
    LayoutTemplate,
    MessageSquare,
    Globe,
    Terminal,
    Rocket,
    Palette,
    Building,
    Layout,
    LayoutDashboard,
    ShoppingCart,
    Briefcase,
    Settings,
    Zap,
    Star,
    Users,
    HelpCircle,
};

/**
 * Get a Lucide icon component by name.
 * Falls back to Sparkles if the icon is not found.
 */
export function getIconComponent(iconName: string): LucideIcon {
    return ICON_MAP[iconName] || Sparkles;
}

// Feature cards for bento grid
export interface Feature {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    size: 'large' | 'medium' | 'small';
    image_url?: string | null;
}

export const features: Feature[] = [
    {
        id: 'lead-capture',
        title: 'Lead Capture Forms',
        description: 'Collect name, email, and company with validation and CRM-ready fields.',
        icon: Users,
        size: 'large',
    },
    {
        id: 'cta-tracking',
        title: 'CTA Tracking',
        description: 'Track clicks and conversions with built-in event analytics.',
        icon: Zap,
        size: 'medium',
    },
    {
        id: 'seo-ready',
        title: 'SEO-Ready Structure',
        description: 'Clean H1–H3 hierarchy, meta tags, and fast-loading assets.',
        icon: LayoutTemplate,
        size: 'medium',
    },
    {
        id: 'responsive',
        title: 'Responsive by Default',
        description: 'Perfect rendering on mobile, tablet, and desktop.',
        icon: Layout,
        size: 'small',
    },
    {
        id: 'interactive',
        title: 'Interactive Demos',
        description: 'Inline video, calculators, and previews without page reloads.',
        icon: Eye,
        size: 'small',
    },
    {
        id: 'ab-testing',
        title: 'A/B Testing Ready',
        description: 'Integrate with experimentation tools and ship faster learnings.',
        icon: Star,
        size: 'small',
    },
    {
        id: 'performance',
        title: 'Optimized Performance',
        description: 'Lightweight components, lazy-loaded media, and caching support.',
        icon: Rocket,
        size: 'small',
    },
];

// User personas
export interface Persona {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

export const personas: Persona[] = [
    {
        id: 'developers',
        title: 'Developers',
        description: 'Accelerate your workflow with AI-assisted development. Focus on logic while AI handles boilerplate.',
        icon: Terminal,
    },
    {
        id: 'entrepreneurs',
        title: 'Entrepreneurs',
        description: 'Launch your MVP faster. Go from idea to working prototype in minutes, not weeks.',
        icon: Rocket,
    },
    {
        id: 'designers',
        title: 'Designers',
        description: 'Bring your designs to life without writing code. Describe your vision and see it built.',
        icon: Palette,
    },
    {
        id: 'agencies',
        title: 'Agencies',
        description: 'Deliver more projects in less time. Scale your output without scaling your team.',
        icon: Building,
    },
];

// Project categories
export interface Category {
    name: string;
    icon: LucideIcon;
}

export const categories: Category[] = [
    { name: 'Landing Pages', icon: Layout },
    { name: 'Dashboards', icon: LayoutDashboard },
    { name: 'E-commerce', icon: ShoppingCart },
    { name: 'Portfolios', icon: Briefcase },
    { name: 'Web Apps', icon: Globe },
    { name: 'Admin Panels', icon: Settings },
];

// Translation function type
type TranslationFn = (key: string, replacements?: Record<string, string | number>) => string;

/**
 * Get translated features array.
 * Falls back to English if translation key returns the key itself.
 */
export function getTranslatedFeatures(t: TranslationFn): Feature[] {
    return [
        {
            id: 'lead-capture',
            title: t('Lead Capture Forms'),
            description: t('Collect name, email, and company with validation and CRM-ready fields.'),
            icon: Users,
            size: 'large',
        },
        {
            id: 'cta-tracking',
            title: t('CTA Tracking'),
            description: t('Track clicks and conversions with built-in event analytics.'),
            icon: Zap,
            size: 'medium',
        },
        {
            id: 'seo-ready',
            title: t('SEO-Ready Structure'),
            description: t('Clean H1–H3 hierarchy, meta tags, and fast-loading assets.'),
            icon: LayoutTemplate,
            size: 'medium',
        },
        {
            id: 'responsive',
            title: t('Responsive by Default'),
            description: t('Perfect rendering on mobile, tablet, and desktop.'),
            icon: Layout,
            size: 'small',
        },
        {
            id: 'interactive',
            title: t('Interactive Demos'),
            description: t('Inline video, calculators, and previews without page reloads.'),
            icon: Eye,
            size: 'small',
        },
        {
            id: 'ab-testing',
            title: t('A/B Testing Ready'),
            description: t('Integrate with experimentation tools and ship faster learnings.'),
            icon: Star,
            size: 'small',
        },
        {
            id: 'performance',
            title: t('Optimized Performance'),
            description: t('Lightweight components, lazy-loaded media, and caching support.'),
            icon: Rocket,
            size: 'small',
        },
    ];
}

/**
 * Get translated personas array.
 */
export function getTranslatedPersonas(t: TranslationFn): Persona[] {
    return [
        {
            id: 'conversion',
            title: t('Higher conversions'),
            description: t('Ship polished landing pages that increase sign-ups and trial requests.'),
            icon: Sparkles,
        },
        {
            id: 'speed',
            title: t('Launch faster'),
            description: t('Go from brief to live page in hours, not weeks.'),
            icon: Rocket,
        },
        {
            id: 'collaboration',
            title: t('Aligned teams'),
            description: t('Keep marketing, product, and sales on the same page with shared data.'),
            icon: Users,
        },
        {
            id: 'insights',
            title: t('Data-driven decisions'),
            description: t('Track CTA performance and iterate with confidence.'),
            icon: Eye,
        },
    ];
}

/**
 * Get translated categories array.
 */
export function getTranslatedCategories(t: TranslationFn): Category[] {
    return [
        { name: t('Landing Pages'), icon: Layout },
        { name: t('Dashboards'), icon: LayoutDashboard },
        { name: t('E-commerce'), icon: ShoppingCart },
        { name: t('Portfolios'), icon: Briefcase },
        { name: t('Web Apps'), icon: Globe },
        { name: t('Admin Panels'), icon: Settings },
    ];
}

// FAQ item interface
export interface FAQItem {
    question: string;
    answer: string;
}

/**
 * Get translated FAQs array.
 */
export function getTranslatedFAQs(t: TranslationFn): FAQItem[] {
    return [
        {
            question: t('Can I connect the form to my CRM?'),
            answer: t('Yes. The lead form can post to your internal CRM or forward data to tools like HubSpot or Mailchimp.'),
        },
        {
            question: t('How do you track CTA clicks and conversions?'),
            answer: t('We emit analytics events on every CTA and form submission so you can connect Google Analytics or any tracker.'),
        },
        {
            question: t('Is the landing page SEO-ready?'),
            answer: t('Yes. We include structured H1–H3 headings, meta tags, and optimized assets by default.'),
        },
        {
            question: t('Can I run A/B tests?'),
            answer: t('Absolutely. You can integrate with any A/B testing platform and track variants with our event hooks.'),
        },
        {
            question: t('Do videos play inside the page?'),
            answer: t('Yes. You can embed videos or animated demos without forcing a full page reload.'),
        },
    ];
}

// Testimonial item interface
export interface TestimonialItem {
    quote: string;
    author: string;
    role: string;
    rating: number;
    avatar?: string | null;
    company_url?: string | null;
}

/**
 * Get translated testimonials array.
 */
export function getTranslatedTestimonials(t: TranslationFn): TestimonialItem[] {
    return [
        {
            quote: t('We doubled trial conversions within three weeks by optimizing CTAs and forms.'),
            author: t('Noura Al-Shamsi'),
            role: t('Growth Lead at Orbitly'),
            rating: 5,
        },
        {
            quote: t('The ROI calculator helped us build a clear business case for every campaign.'),
            author: t('Aiden Cole'),
            role: t('Head of Marketing at CedarHQ'),
            rating: 5,
        },
        {
            quote: t('Our team ships new landing pages in hours, not weeks. The analytics are a game changer.'),
            author: t('Maya Rahman'),
            role: t('Product Manager at Vetra'),
            rating: 5,
        },
    ];
}
