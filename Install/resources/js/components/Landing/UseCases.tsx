import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { getTranslatedPersonas, getIconComponent } from './data';
import { useTranslation } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';

interface PersonaItem {
    title: string;
    description: string;
    icon: string;
}

interface UseCasesProps {
    content?: Record<string, unknown>;
    items?: PersonaItem[];
    settings?: Record<string, unknown>;
}

export function UseCases({ content, items, settings: _settings }: UseCasesProps = {}) {
    const { t } = useTranslation();
    const [visitors, setVisitors] = useState(10000);
    const [conversionRate, setConversionRate] = useState(2);
    const [conversionLift, setConversionLift] = useState(0.5);
    const [avgOrderValue, setAvgOrderValue] = useState(120);
    const [hoursSaved, setHoursSaved] = useState(40);
    const [hourlyRate, setHourlyRate] = useState(50);

    // Use database items if provided, otherwise fall back to translated defaults
    const personas = items?.length
        ? items.map((item, index) => ({
              id: `persona-${index}`,
              title: item.title,
              description: item.description,
              icon: getIconComponent(item.icon),
          }))
        : getTranslatedPersonas(t);

    // Get content with defaults - DB content takes priority
    const title = (content?.title as string) || t('Why teams choose us');
    const subtitle = (content?.subtitle as string) || t('Practical benefits you can measure from day one.');

    const roi = useMemo(() => {
        const incrementalRevenue =
            visitors * (conversionRate / 100) * (conversionLift / 100) * avgOrderValue;
        const timeSavings = hoursSaved * hourlyRate;
        return {
            incrementalRevenue,
            timeSavings,
            total: incrementalRevenue + timeSavings,
        };
    }, [visitors, conversionLift, avgOrderValue, hoursSaved, hourlyRate]);

    return (
        <section id="benefits" className="py-16 lg:py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* Persona Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {personas.map((persona) => {
                        const Icon = persona.icon;
                        return (
                            <Card
                                key={persona.id}
                                className="group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
                            >
                                <CardHeader className="pb-2">
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                        <Icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">
                                        {persona.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm">
                                        {persona.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="mb-6">
                                <h3 className="text-2xl font-semibold mb-2">{t('ROI calculator')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('Estimate the monthly impact of better conversion and faster delivery.')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">{t('Monthly visitors')}</label>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={visitors}
                                        onChange={(e) => setVisitors(Number(e.target.value))}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">{t('Average order value')}</label>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={avgOrderValue}
                                        onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">{t('Current conversion rate (%)')}</label>
                                    <Input
                                        type="number"
                                        min={0}
                                        step={0.1}
                                        value={conversionRate}
                                        onChange={(e) => setConversionRate(Number(e.target.value))}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">{t('Expected conversion lift (%)')}</label>
                                    <Input
                                        type="number"
                                        min={0}
                                        step={0.1}
                                        value={conversionLift}
                                        onChange={(e) => setConversionLift(Number(e.target.value))}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">{t('Hours saved per month')}</label>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={hoursSaved}
                                        onChange={(e) => setHoursSaved(Number(e.target.value))}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">{t('Hourly rate')}</label>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={hourlyRate}
                                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="text-sm font-medium">{t('Conversion lift sensitivity')}</label>
                                <div className="mt-3">
                                    <Slider
                                        value={[conversionLift]}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        onValueChange={(value) => setConversionLift(value[0] ?? 0)}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <Button
                                    onClick={() => trackEvent('roi_calculate', {
                                        visitors,
                                        conversion_rate: conversionRate,
                                        conversion_lift: conversionLift,
                                        avg_order_value: avgOrderValue,
                                        hours_saved: hoursSaved,
                                        hourly_rate: hourlyRate,
                                    })}
                                >
                                    {t('Calculate ROI')}
                                </Button>
                                <span className="text-xs text-muted-foreground">
                                    {t('Figures are estimates and can be adjusted at any time.')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-transparent to-transparent p-6">
                            <h4 className="text-sm font-semibold uppercase tracking-wide text-primary/80">
                                {t('Estimated monthly impact')}
                            </h4>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <div className="text-xs text-muted-foreground">{t('Incremental revenue')}</div>
                                    <div className="text-2xl font-semibold">
                                        {roi.incrementalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">{t('Time savings')}</div>
                                    <div className="text-2xl font-semibold">
                                        {roi.timeSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-border">
                                    <div className="text-xs text-muted-foreground">{t('Total ROI')}</div>
                                    <div className="text-3xl font-bold text-primary">
                                        {roi.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-muted-foreground">
                                {t('Use this estimate to build your business case or share with stakeholders.')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
