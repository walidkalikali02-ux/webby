import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { toast } from 'sonner';
import { getUtmParams, trackCtaClick, trackFormSubmit, withUtm } from '@/lib/analytics';

interface FinalCTAProps {
    auth: {
        user: { id: number; name: string; email: string } | null;
    };
    isPusherConfigured?: boolean;
    canCreateProject?: boolean;
    cannotCreateReason?: string | null;
    content?: Record<string, unknown>;
}

export function FinalCTA({
    auth,
    isPusherConfigured = true,
    canCreateProject = true,
    cannotCreateReason = null,
    content,
}: FinalCTAProps) {
    const { t } = useTranslation();

    // Extract content with defaults - DB content takes priority
    const title = (content?.title as string) || t('Ready to launch a high-converting landing page?');
    const subtitle = (content?.subtitle as string) || t('Join now and get a personalized setup in minutes.');
    const [formData, setFormData] = useState({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        company: '',
    });
    const [errors, setErrors] = useState<{ name?: string; email?: string; company?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Compute disabled state for logged-in users (used for warnings only)
    const isDisabled = !!(auth.user && (!isPusherConfigured || !canCreateProject));

    const validate = () => {
        const nextErrors: typeof errors = {};
        if (!formData.name.trim()) {
            nextErrors.name = t('Name is required');
        }
        if (!formData.email.trim()) {
            nextErrors.email = t('Email is required');
        } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
            nextErrors.email = t('Please enter a valid email');
        }
        if (!formData.company.trim()) {
            nextErrors.company = t('Company is required');
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        const utm = getUtmParams();
        try {
            await axios.post('/landing/lead', {
                ...formData,
                source: 'final_cta',
                cta_location: 'final_cta',
                ...utm,
            });
            trackFormSubmit('final_cta', 'success', { ...utm });
            toast.success(t('Thanks! We will contact you shortly.'));
            setFormData((prev) => ({ ...prev, company: '' }));
        } catch (error) {
            trackFormSubmit('final_cta', 'error', { ...utm });
            toast.error(t('Something went wrong. Please try again.'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const primaryCtaUrl = withUtm('/register', {
        utm_source: 'landing',
        utm_medium: 'cta',
        utm_campaign: 'final_primary',
    });

    const handleStartNow = () => {
        trackCtaClick('final_primary', 'final_cta', primaryCtaUrl);
        router.visit(primaryCtaUrl);
    };

    return (
        <section className="py-16 lg:py-24 relative">
            <div className="absolute inset-0 gradient-mesh opacity-50" />
            <div className="absolute inset-0 frosted" />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                {/* Headline */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 text-white">
                    {title}
                </h2>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-muted-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>

                {/* Cannot create project warning (for logged-in users) */}
                {auth.user && !isPusherConfigured && (
                    <Alert variant="destructive" className="max-w-2xl mx-auto mb-4 text-left">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {t('Real-time features are not configured. Please contact support.')}
                        </AlertDescription>
                    </Alert>
                )}

                {auth.user && !canCreateProject && isPusherConfigured && (
                    <Alert variant="destructive" className="max-w-2xl mx-auto mb-4 text-left">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {cannotCreateReason}{' '}
                            <Link href="/billing/plans" className="underline font-semibold">
                                {t('View Plans')}
                            </Link>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Lead Capture Form */}
                <div className="max-w-3xl mx-auto text-start">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="lead-name">{t('Full name')}</Label>
                            <Input
                                id="lead-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={isSubmitting}
                                aria-invalid={!!errors.name}
                                className="mt-2"
                                placeholder={t('Your name')}
                                required
                            />
                            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="lead-email">{t('Work email')}</Label>
                            <Input
                                id="lead-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={isSubmitting}
                                aria-invalid={!!errors.email}
                                className="mt-2"
                                placeholder={t('you@company.com')}
                                required
                            />
                            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor="lead-company">{t('Company')}</Label>
                            <Input
                                id="lead-company"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                disabled={isSubmitting}
                                aria-invalid={!!errors.company}
                                className="mt-2"
                                placeholder={t('Company name')}
                                required
                            />
                            {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
                        </div>
                        <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-3 pt-2">
                            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto" data-cta="lead-submit">
                                {isSubmitting ? t('Submitting...') : t('Request a demo')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto"
                                data-cta="final-primary"
                                onClick={handleStartNow}
                            >
                                {t('Start free')}
                            </Button>
                            <span className="text-xs text-muted-foreground">
                                {t('We respect your privacy. No spam.')}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
