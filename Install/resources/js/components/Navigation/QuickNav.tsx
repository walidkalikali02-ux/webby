import { useState, useEffect, useCallback } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    FolderOpen,
    Files,
    Database,
    CreditCard,
    Settings,
    LayoutDashboard,
    Users,
    Crown,
    Receipt,
    Gift,
    Package,
    Puzzle,
    Globe,
    Clock,
    Bot,
    Cpu,
    LayoutTemplate,
    Layout,
    Sparkles,
    Paintbrush,
    Search,
    FileText,
    ArrowRight,
    Check,
} from 'lucide-react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { useTranslation } from '@/contexts/LanguageContext';
import { PageProps, User } from '@/types';
import { cn } from '@/lib/utils';

interface NavItem {
    titleKey: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    keywords: string[];
    section: 'main' | 'projects' | 'admin' | 'quick-actions';
}

const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

interface QuickNavProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
}

export function QuickNav({ open: controlledOpen, onOpenChange, trigger }: QuickNavProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = controlledOpen ?? internalOpen;
    const setOpen = onOpenChange ?? setInternalOpen;
    const { url, props } = usePage<PageProps>();
    const { t } = useTranslation();
    const user = props.auth?.user as User | undefined;
    const recentProjects = props.recentProjects || [];

    const navigateTo = useCallback((href: string) => {
        setOpen(false);
        router.visit(href, {
            preserveState: false,
            preserveScroll: true,
        });
    }, [router, setOpen]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [open, setOpen]);

    const mainItems: NavItem[] = [
        {
            titleKey: 'Create',
            href: '/create',
            icon: Paintbrush,
            section: 'main',
            keywords: ['dashboard', 'home', 'new', 'project'],
        },
    ];

    const projectItems: NavItem[] = [
        {
            titleKey: 'All Projects',
            href: '/projects',
            icon: FolderOpen,
            section: 'projects',
            keywords: ['projects', 'all', 'list', 'my projects'],
        },
        {
            titleKey: 'File Manager',
            href: '/file-manager',
            icon: Files,
            section: 'projects',
            keywords: ['files', 'manager', 'upload', 'storage', 'assets'],
        },
        {
            titleKey: 'Database',
            href: '/database',
            icon: Database,
            section: 'projects',
            keywords: ['database', 'db', 'data', 'tables', 'sql'],
        },
        {
            titleKey: 'Billing',
            href: '/billing',
            icon: CreditCard,
            section: 'projects',
            keywords: ['billing', 'payment', 'subscription', 'plans', 'invoice'],
        },
        {
            titleKey: 'Profile Settings',
            href: '/profile',
            icon: Settings,
            section: 'projects',
            keywords: ['settings', 'profile', 'account', 'preferences', 'user'],
        },
    ];

    const quickActionItems: NavItem[] = [
        {
            titleKey: 'Create New Project',
            href: '/create',
            icon: Paintbrush,
            section: 'quick-actions',
            keywords: ['new', 'project', 'create', 'add', 'start'],
        },
        {
            titleKey: 'Upgrade Plan',
            href: '/billing/plans',
            icon: Sparkles,
            section: 'quick-actions',
            keywords: ['plans', 'upgrade', 'pricing', 'subscription', 'premium'],
        },
    ];

    const adminItems: NavItem[] = user?.role === 'admin' ? [
        {
            titleKey: 'Admin Overview',
            href: '/admin/overview',
            icon: LayoutDashboard,
            section: 'admin',
            keywords: ['admin', 'dashboard', 'overview', 'stats', 'analytics'],
        },
        {
            titleKey: 'Users',
            href: '/admin/users',
            icon: Users,
            section: 'admin',
            keywords: ['admin', 'users', 'manage', 'accounts', 'members'],
        },
        {
            titleKey: 'Subscriptions',
            href: '/admin/subscriptions',
            icon: Crown,
            section: 'admin',
            keywords: ['admin', 'subscriptions', 'members', 'premium'],
        },
        {
            titleKey: 'Transactions',
            href: '/admin/transactions',
            icon: Receipt,
            section: 'admin',
            keywords: ['admin', 'transactions', 'payments', 'history', 'invoices'],
        },
        {
            titleKey: 'Referrals',
            href: '/admin/referrals',
            icon: Gift,
            section: 'admin',
            keywords: ['admin', 'referrals', 'invite', 'rewards'],
        },
        {
            titleKey: 'Plans',
            href: '/admin/plans',
            icon: Package,
            section: 'admin',
            keywords: ['admin', 'plans', 'pricing', 'features', 'tiers'],
        },
        {
            titleKey: 'AI Builders',
            href: '/admin/ai-builders',
            icon: Bot,
            section: 'admin',
            keywords: ['admin', 'ai', 'builders', 'agents', 'templates'],
        },
        {
            titleKey: 'AI Providers',
            href: '/admin/ai-providers',
            icon: Cpu,
            section: 'admin',
            keywords: ['admin', 'ai', 'providers', 'openai', 'anthropic', 'keys', 'api'],
        },
        {
            titleKey: 'AI Templates',
            href: '/admin/ai-templates',
            icon: LayoutTemplate,
            section: 'admin',
            keywords: ['admin', 'ai', 'templates', 'prompts'],
        },
        {
            titleKey: 'Landing Page',
            href: '/admin/landing-builder',
            icon: Layout,
            section: 'admin',
            keywords: ['admin', 'landing', 'page', 'builder', 'marketing', 'home'],
        },
        {
            titleKey: 'Plugins',
            href: '/admin/plugins',
            icon: Puzzle,
            section: 'admin',
            keywords: ['admin', 'plugins', 'extensions', 'addons', 'integrations'],
        },
        {
            titleKey: 'Languages',
            href: '/admin/languages',
            icon: Globe,
            section: 'admin',
            keywords: ['admin', 'languages', 'translations', 'i18n', 'locale'],
        },
        {
            titleKey: 'Cronjobs',
            href: '/admin/cronjobs',
            icon: Clock,
            section: 'admin',
            keywords: ['admin', 'cron', 'jobs', 'schedules', 'tasks'],
        },
        {
            titleKey: 'Admin Settings',
            href: '/admin/settings',
            icon: Settings,
            section: 'admin',
            keywords: ['admin', 'settings', 'configuration', 'config', 'system'],
        },
    ] : [];

    const isActiveRoute = (href: string) => {
        if (href === '/create' || href === '/projects') {
            return url === href;
        }
        return url.startsWith(href);
    };

    const CurrentBadge = () => (
        <span className="ms-auto flex items-center gap-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
            <Check className="h-3 w-3" />
            {t('Current')}
        </span>
    );

    return (
        <>
            {trigger ?? (
                <button
                    onClick={() => setOpen(true)}
                    className={cn(
                        "inline-flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground",
                        "bg-muted/50 hover:bg-muted border border-border rounded-md",
                        "transition-colors cursor-pointer group"
                    )}
                    aria-label={t('Quick navigation')}
                >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('Search...')}</span>
                    <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
                        <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
                    </kbd>
                </button>
            )}

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder={t('Type to search pages, commands, or actions...')} />
                <CommandList>
                    <CommandEmpty>{t('No results found. Try a different search term.')}</CommandEmpty>

                    {recentProjects.length > 0 && (
                        <CommandGroup heading={t('Recent Projects')}>
                            {recentProjects.slice(0, 5).map((project) => (
                                <CommandItem
                                    key={project.id}
                                    value={`recent-${project.name}-${project.id}`}
                                    onSelect={() => navigateTo(`/project/${project.id}`)}
                                    className={cn(
                                        "cursor-pointer",
                                        url.startsWith(`/project/${project.id}`) && "bg-accent"
                                    )}
                                >
                                    <FileText className="h-4 w-4 me-2 opacity-60" />
                                    <span className="truncate">{project.name}</span>
                                    {url.startsWith(`/project/${project.id}`) && <CurrentBadge />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    <CommandSeparator />

                    <CommandGroup heading={t('Quick Actions')}>
                        {quickActionItems.map((item) => (
                            <CommandItem
                                key={item.href}
                                value={`action-${item.titleKey}-${item.keywords.join('-')}`}
                                onSelect={() => navigateTo(item.href)}
                                className="cursor-pointer"
                            >
                                <item.icon className="h-4 w-4 me-2" />
                                <span>{t(item.titleKey)}</span>
                                <ArrowRight className="h-4 w-4 ms-auto opacity-50" />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />

                    <CommandGroup heading={t('Main')}>
                        {mainItems.map((item) => (
                            <CommandItem
                                key={item.href}
                                value={`page-${item.titleKey}-${item.keywords.join('-')}`}
                                onSelect={() => navigateTo(item.href)}
                                className={cn(
                                    "cursor-pointer",
                                    isActiveRoute(item.href) && "bg-accent"
                                )}
                            >
                                <item.icon className="h-4 w-4 me-2" />
                                <span>{t(item.titleKey)}</span>
                                {isActiveRoute(item.href) && <CurrentBadge />}
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading={t('Projects')}>
                        {projectItems.map((item) => (
                            <CommandItem
                                key={item.href}
                                value={`page-${item.titleKey}-${item.keywords.join('-')}`}
                                onSelect={() => navigateTo(item.href)}
                                className={cn(
                                    "cursor-pointer",
                                    isActiveRoute(item.href) && "bg-accent"
                                )}
                            >
                                <item.icon className="h-4 w-4 me-2" />
                                <span>{t(item.titleKey)}</span>
                                {isActiveRoute(item.href) && <CurrentBadge />}
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    {adminItems.length > 0 && (
                        <CommandGroup heading={t('Administration')}>
                            {adminItems.map((item) => (
                                <CommandItem
                                    key={item.href}
                                    value={`admin-${item.titleKey}-${item.keywords.join('-')}`}
                                    onSelect={() => navigateTo(item.href)}
                                    className={cn(
                                        "cursor-pointer",
                                        isActiveRoute(item.href) && "bg-accent"
                                    )}
                                >
                                    <item.icon className="h-4 w-4 me-2" />
                                    <span>{t(item.titleKey)}</span>
                                    {isActiveRoute(item.href) && <CurrentBadge />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>

                <div className="border-t px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
                    <span className="flex items-center gap-1">
                        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">↑↓</kbd>
                        <span>{t('navigate')}</span>
                        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">↵</kbd>
                        <span>{t('select')}</span>
                        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">esc</kbd>
                        <span>{t('close')}</span>
                    </span>
                    <span className="hidden sm:inline text-muted-foreground/60">{t('Quick navigation')}</span>
                </div>
            </CommandDialog>
        </>
    );
}