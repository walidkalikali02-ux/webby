import { Link, usePage } from '@inertiajs/react';
import { Fragment } from 'react';
import {
    Breadcrumb as BreadcrumbRoot,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';
import { useTranslation } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';

interface BreadcrumbItemData {
    label: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbNavProps {
    items?: BreadcrumbItemData[];
    showHome?: boolean;
    className?: string;
    maxItems?: number;
}

const routeLabels: Record<string, string> = {
    '/projects': 'Projects',
    '/create': 'Create',
    '/file-manager': 'File Manager',
    '/database': 'Database',
    '/billing': 'Billing',
    '/billing/plans': 'Plans',
    '/billing/usage': 'Usage',
    '/billing/referral': 'Referral',
    '/profile': 'Profile',
    '/profile/edit': 'Edit Profile',
    '/admin': 'Admin',
    '/admin/overview': 'Overview',
    '/admin/users': 'Users',
    '/admin/subscriptions': 'Subscriptions',
    '/admin/transactions': 'Transactions',
    '/admin/referrals': 'Referrals',
    '/admin/plans': 'Plans',
    '/admin/ai-builders': 'AI Builders',
    '/admin/ai-providers': 'AI Providers',
    '/admin/ai-templates': 'AI Templates',
    '/admin/landing-builder': 'Landing Page',
    '/admin/plugins': 'Plugins',
    '/admin/languages': 'Languages',
    '/admin/cronjobs': 'Cronjobs',
    '/admin/settings': 'Settings',
};

function getBreadcrumbsFromPath(pathname: string): BreadcrumbItemData[] {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItemData[] = [];
    let currentPath = '';

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;
        
        const label = routeLabels[currentPath] || routeLabels[`/${segment}`] || segment.charAt(0).toUpperCase() + segment.slice(1);
        
        if (segment.match(/^\d+$/) || segment.match(/^[a-f0-9-]{36}$/)) {
            continue;
        }
        
        breadcrumbs.push({
            label,
            href: i === segments.length - 1 ? undefined : currentPath,
        });
    }

    return breadcrumbs;
}

export function BreadcrumbNav({
    items: propItems,
    showHome = true,
    className,
    maxItems = 4,
}: BreadcrumbNavProps) {
    const { url } = usePage();
    const { t } = useTranslation();
    
    const items = propItems || getBreadcrumbsFromPath(url);
    
    if (items.length === 0) {
        return null;
    }

    const shouldCollapse = items.length > maxItems;

    const renderCollapsedItems = () => {
        const lastItems = items.slice(-maxItems + 2);
        return (
            <Fragment>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={items[0].href || '#'}>
                            {t(items[0].label)}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {lastItems.map((item, index) => (
                    <Fragment key={item.label + index}>
                        <BreadcrumbItem>
                            {item.href ? (
                                <BreadcrumbLink asChild>
                                    <Link href={item.href}>
                                        {t(item.label)}
                                    </Link>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>
                                    {t(item.label)}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < lastItems.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                ))}
            </Fragment>
        );
    };

    const renderItems = () => {
        return items.map((item, index) => (
            <Fragment key={item.label + index}>
                <BreadcrumbItem>
                    {item.href ? (
                        <BreadcrumbLink asChild>
                            <Link href={item.href}>
                                {item.icon && <item.icon className="h-4 w-4 me-1" />}
                                {t(item.label)}
                            </Link>
                        </BreadcrumbLink>
                    ) : (
                        <BreadcrumbPage>
                            {item.icon && <item.icon className="h-4 w-4 me-1" />}
                            {t(item.label)}
                        </BreadcrumbPage>
                    )}
                </BreadcrumbItem>
                {index < items.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
        ));
    };

    return (
        <BreadcrumbRoot className={cn("hidden sm:flex", className)}>
            <BreadcrumbList>
                {showHome && (
                    <Fragment>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/create">
                                    <Home className="h-4 w-4" />
                                    <span className="sr-only">{t('Home')}</span>
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {items.length > 0 && <BreadcrumbSeparator />}
                    </Fragment>
                )}

                {shouldCollapse ? renderCollapsedItems() : renderItems()}
            </BreadcrumbList>
        </BreadcrumbRoot>
    );
}