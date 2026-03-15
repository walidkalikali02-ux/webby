import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
    Paintbrush,
    Search,
    FileText,
    Check,
    X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/contexts/LanguageContext';
import { PageProps, User } from '@/types';

interface NavItem {
    id: string;
    titleKey: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    keywords: string[];
    section: string;
    sectionOrder: number;
}

const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const shortcutKey = isMac ? '⌘' : 'Ctrl';

interface RouteComboboxProps {
    className?: string;
    placeholder?: string;
    onSelect?: (href: string) => void;
}

export function RouteCombobox({ className, placeholder, onSelect }: RouteComboboxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { url, props } = usePage<PageProps>();
    const { t } = useTranslation();
    const user = props.auth?.user as User | undefined;
    const recentProjects = props.recentProjects || [];

    const comboboxId = 'route-combobox';
    const listboxId = 'route-listbox';

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const mainItems: NavItem[] = useMemo(() => [
        { id: 'create', titleKey: 'Create', href: '/create', icon: Paintbrush, keywords: ['create', 'new', 'dashboard', 'home', 'start', 'begin'], section: 'Main', sectionOrder: 1 },
    ], []);

    const projectItems: NavItem[] = useMemo(() => [
        { id: 'projects', titleKey: 'All Projects', href: '/projects', icon: FolderOpen, keywords: ['projects', 'all', 'list', 'my projects', 'work'], section: 'Projects', sectionOrder: 2 },
        { id: 'files', titleKey: 'File Manager', href: '/file-manager', icon: Files, keywords: ['files', 'upload', 'storage', 'assets', 'manager', 'documents', 'media'], section: 'Projects', sectionOrder: 2 },
        { id: 'database', titleKey: 'Database', href: '/database', icon: Database, keywords: ['database', 'db', 'tables', 'data', 'sql', 'records'], section: 'Projects', sectionOrder: 2 },
        { id: 'billing', titleKey: 'Billing', href: '/billing', icon: CreditCard, keywords: ['billing', 'payment', 'subscription', 'invoice', 'plans', 'upgrade', 'pay'], section: 'Projects', sectionOrder: 2 },
        { id: 'profile', titleKey: 'Profile Settings', href: '/profile', icon: Settings, keywords: ['profile', 'settings', 'account', 'preferences', 'user', 'me'], section: 'Projects', sectionOrder: 2 },
    ], []);

    const adminItems: NavItem[] = useMemo(() => user?.role === 'admin' ? [
        { id: 'admin-overview', titleKey: 'Admin Overview', href: '/admin/overview', icon: LayoutDashboard, keywords: ['admin', 'overview', 'dashboard', 'stats', 'analytics'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-users', titleKey: 'Users', href: '/admin/users', icon: Users, keywords: ['admin', 'users', 'accounts', 'members', 'manage users'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-subscriptions', titleKey: 'Subscriptions', href: '/admin/subscriptions', icon: Crown, keywords: ['admin', 'subscriptions', 'members', 'premium', 'plans'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-transactions', titleKey: 'Transactions', href: '/admin/transactions', icon: Receipt, keywords: ['admin', 'transactions', 'payments', 'history', 'invoices'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-referrals', titleKey: 'Referrals', href: '/admin/referrals', icon: Gift, keywords: ['admin', 'referrals', 'invite', 'rewards', 'refer'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-plans', titleKey: 'Plans', href: '/admin/plans', icon: Package, keywords: ['admin', 'plans', 'pricing', 'tiers', 'subscription plans'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-ai-builders', titleKey: 'AI Builders', href: '/admin/ai-builders', icon: Bot, keywords: ['admin', 'ai', 'builders', 'agents', 'chatbot'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-ai-providers', titleKey: 'AI Providers', href: '/admin/ai-providers', icon: Cpu, keywords: ['admin', 'ai', 'providers', 'openai', 'anthropic', 'api', 'keys'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-ai-templates', titleKey: 'AI Templates', href: '/admin/ai-templates', icon: LayoutTemplate, keywords: ['admin', 'ai', 'templates', 'prompts', 'system'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-landing', titleKey: 'Landing Page', href: '/admin/landing-builder', icon: Layout, keywords: ['admin', 'landing', 'page', 'marketing', 'home', 'website'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-plugins', titleKey: 'Plugins', href: '/admin/plugins', icon: Puzzle, keywords: ['admin', 'plugins', 'extensions', 'addons', 'integrations'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-languages', titleKey: 'Languages', href: '/admin/languages', icon: Globe, keywords: ['admin', 'languages', 'translations', 'i18n', 'locale', 'localization'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-cronjobs', titleKey: 'Cronjobs', href: '/admin/cronjobs', icon: Clock, keywords: ['admin', 'cron', 'jobs', 'schedules', 'tasks', 'automation'], section: 'Administration', sectionOrder: 3 },
        { id: 'admin-settings', titleKey: 'Admin Settings', href: '/admin/settings', icon: Settings, keywords: ['admin', 'settings', 'configuration', 'config', 'system', 'options'], section: 'Administration', sectionOrder: 3 },
    ] : [], [user?.role]);

    const allItems: NavItem[] = useMemo(() => [...mainItems, ...projectItems, ...adminItems], [mainItems, projectItems, adminItems]);

    const recentItems: NavItem[] = useMemo(() => recentProjects.slice(0, 5).map((project) => ({
        id: `recent-${project.id}`,
        titleKey: project.name,
        href: `/project/${project.id}`,
        icon: FileText,
        keywords: [project.name.toLowerCase(), 'project', 'recent'],
        section: 'Recent Projects',
        sectionOrder: 0,
    })), [recentProjects]);

    const scoreRelevance = useCallback((item: NavItem, query: string): number => {
        const lowerQuery = query.toLowerCase();
        const title = t(item.titleKey).toLowerCase();
        
        if (title === lowerQuery) return 100;
        if (title.startsWith(lowerQuery)) return 90;
        if (title.includes(lowerQuery)) return 80;
        
        const keywordMatch = item.keywords.find(kw => kw === lowerQuery || kw.startsWith(lowerQuery));
        if (keywordMatch) return 70;
        
        const sectionMatch = item.section.toLowerCase().includes(lowerQuery);
        if (sectionMatch) return 60;
        
        const partialKeywordMatch = item.keywords.find(kw => kw.includes(lowerQuery));
        if (partialKeywordMatch) return 50;
        
        return 0;
    }, [t]);

    const filteredItems = useMemo(() => {
        if (searchQuery.trim() === '') {
            return [...recentItems, ...allItems];
        }
        
        const query = searchQuery.toLowerCase();
        const scored = [...recentItems, ...allItems]
            .map(item => ({ item, score: scoreRelevance(item, searchQuery) }))
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score)
            .map(({ item }) => item);
        
        return scored;
    }, [searchQuery, recentItems, allItems, scoreRelevance]);

    const groupedItems = useMemo(() => {
        return filteredItems.reduce<Record<string, NavItem[]>>((acc, item) => {
            const section = item.section;
            if (!acc[section]) acc[section] = [];
            acc[section].push(item);
            return acc;
        }, {});
    }, [filteredItems]);

    const sectionOrder = ['Recent Projects', 'Main', 'Projects', 'Administration'];

    const highlightMatch = useCallback((text: string, query: string) => {
        if (!query.trim()) return text;
        
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const index = lowerText.indexOf(lowerQuery);
        
        if (index === -1) return text;
        
        return (
            <>
                {text.slice(0, index)}
                <mark className="bg-yellow-200 dark:bg-yellow-800/50 text-inherit rounded px-0.5">
                    {text.slice(index, index + query.length)}
                </mark>
                {text.slice(index + query.length)}
            </>
        );
    }, []);

    const handleSelect = useCallback((href: string) => {
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
        if (onSelect) {
            onSelect(href);
        } else {
            router.visit(href, {
                preserveState: false,
                preserveScroll: true,
            });
        }
    }, [onSelect, router]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setIsOpen(true);
                setFocusedIndex((prev) => 
                    prev < filteredItems.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex((prev) => 
                    prev > 0 ? prev - 1 : filteredItems.length - 1
                );
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (focusedIndex >= 0 && filteredItems[focusedIndex]) {
                    handleSelect(filteredItems[focusedIndex].href);
                } else if (filteredItems.length > 0) {
                    handleSelect(filteredItems[0].href);
                }
                break;
            case 'Escape':
                e.preventDefault();
                handleClose();
                inputRef.current?.blur();
                break;
            case 'Tab':
                handleClose();
                break;
            case 'Home':
                e.preventDefault();
                setFocusedIndex(0);
                break;
            case 'End':
                e.preventDefault();
                setFocusedIndex(filteredItems.length - 1);
                break;
        }
    }, [focusedIndex, filteredItems, handleSelect, handleClose]);

    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
                setTimeout(() => inputRef.current?.focus(), 0);
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);
        return () => document.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current && !isTouchDevice) {
            inputRef.current.focus();
        }
    }, [isOpen, isTouchDevice]);

    useEffect(() => {
        if (focusedIndex >= 0 && listRef.current) {
            const focusedItem = listRef.current.querySelector(`[data-index="${focusedIndex}"]`);
            focusedItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [focusedIndex]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen, handleClose]);

    const isActiveRoute = useCallback((href: string) => {
        if (href === '/create' || href === '/projects') {
            return url === href;
        }
        if (href.startsWith('/project/')) {
            return url === href;
        }
        return url.startsWith(href) && href !== '/';
    }, [url]);

    const announcementText = focusedIndex >= 0 && filteredItems[focusedIndex]
        ? `${t(filteredItems[focusedIndex].titleKey)}, ${filteredItems[focusedIndex].section}`
        : '';

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <input
                    ref={inputRef}
                    id={comboboxId}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setFocusedIndex(0);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder || t('Search routes...')}
                    className={cn(
                        "w-full h-10 sm:h-9 pl-9 pr-10 sm:pr-16 text-base sm:text-sm",
                        "bg-muted/50 border border-border rounded-md",
                        "placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                        "focus:bg-background focus:border-primary/50",
                        "transition-all duration-200",
                        "touch-manipulation"
                    )}
                    aria-label={t('Search navigation routes')}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls={listboxId}
                    aria-activedescendant={focusedIndex >= 0 ? `route-item-${focusedIndex}` : undefined}
                    aria-describedby="route-combobox-help"
                    aria-autocomplete="list"
                    role="combobox"
                    autoComplete="off"
                    spellCheck={false}
                    inputMode="search"
                />
                {searchQuery && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSearchQuery('');
                            setFocusedIndex(-1);
                            inputRef.current?.focus();
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
                        aria-label={t('Clear search')}
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
                <kbd 
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
                    aria-hidden="true"
                >
                    <span>{shortcutKey}</span>K
                </kbd>
            </div>

            <span id="route-combobox-help" className="sr-only">
                {t('Use arrow keys to navigate, Enter to select, Escape to close')}
            </span>

            <div 
                aria-live="polite" 
                aria-atomic="true" 
                className="sr-only"
            >
                {isOpen && announcementText}
            </div>

{isOpen && (
                <div
                    data-route-combobox
                    ref={listRef}
                    id={listboxId}
                    className={cn(
                        "absolute z-[100] mt-1",
                        "bg-popover border border-border rounded-md shadow-lg",
                        "overflow-hidden",
                        "animate-in fade-in-0 zoom-in-95 duration-100",
                        "w-full",
                        "left-0",
                        "min-w-[280px]"
                    )}
                    role="listbox"
                    aria-label={t('Available routes')}
                    tabIndex={-1}
                >
                    {filteredItems.length === 0 ? (
                        <div className="px-3 py-8 text-center text-sm text-muted-foreground" role="status">
                            <Search className="h-10 w-10 mx-auto mb-3 opacity-30" aria-hidden="true" />
                            <p className="text-base">{t('No routes found')}</p>
                            <p className="text-sm mt-1">{t('Try a different search term')}</p>
                        </div>
                    ) : (
                        <>
                            <div className={cn(
                                "overflow-y-auto",
                                "max-h-[50vh] sm:max-h-[300px]",
                                "overscroll-contain",
                                "-webkit-overflow-scrolling-touch"
                            )}>
                                <div className="py-1">
                                    {sectionOrder.map((section) => {
                                        const items = groupedItems[section];
                                        if (!items || items.length === 0) return null;

                                        return (
                                            <div key={section} role="group" aria-label={t(section)}>
                                                <div 
                                                    className="px-3 py-2 sm:py-1.5 text-xs sm:text-[10px] font-semibold text-muted-foreground uppercase tracking-wider bg-muted/50 border-b border-border sticky top-0"
                                                    aria-hidden="true"
                                                >
                                                    {t(section)} <span className="font-normal opacity-60">({items.length})</span>
                                                </div>
                                                {items.map((item) => {
                                                    const globalIndex = filteredItems.indexOf(item);
                                                    const Icon = item.icon;
                                                    const isActive = isActiveRoute(item.href);
                                                    const isFocused = focusedIndex === globalIndex;

                                                    return (
                                                        <button
                                                            key={item.id}
                                                            id={`route-item-${globalIndex}`}
                                                            data-index={globalIndex}
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleSelect(item.href);
                                                            }}
                                                            onTouchStart={() => setFocusedIndex(globalIndex)}
                                                            onMouseEnter={() => !isTouchDevice && setFocusedIndex(globalIndex)}
                                                            className={cn(
                                                                "w-full flex items-center gap-3 px-3 py-3 sm:py-2.5 text-sm sm:text-sm",
                                                                "cursor-pointer transition-colors",
                                                                "hover:bg-accent active:bg-accent/80",
                                                                "focus:bg-accent focus:outline-none",
                                                                "touch-manipulation",
                                                                "min-h-[44px] sm:min-h-0",
                                                                isFocused && "bg-accent",
                                                                isActive && "bg-primary/5"
                                                            )}
                                                            role="option"
                                                            aria-selected={isFocused}
                                                            aria-current={isActive ? 'page' : undefined}
                                                        >
                                                            <Icon className="h-5 w-5 sm:h-4 sm:w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                                                            <span className="flex-1 text-left truncate">
                                                                {highlightMatch(t(item.titleKey), searchQuery)}
                                                            </span>
                                                            {isActive && (
                                                                <span className="flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium" aria-label={t('Current page')}>
                                                                    <Check className="h-3 w-3" aria-hidden="true" />
                                                                    <span className="sr-only">{t('Current page')}</span>
                                                                    <span className="hidden sm:inline">{t('Current')}</span>
                                                                </span>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                    <div className="border-t px-3 py-2.5 sm:py-2 text-xs sm:text-[10px] text-muted-foreground flex items-center justify-between bg-muted/30" aria-hidden="true">
                        <span className="flex flex-wrap items-center gap-1">
                            <span className="hidden sm:inline">
                                <kbd className="rounded border bg-background px-1 py-0.5 font-mono">↑↓</kbd>
                                <span className="mx-1">{t('navigate')}</span>
                            </span>
                            <kbd className="rounded border bg-background px-1 py-0.5 font-mono">↵</kbd>
                            <span>{t('select')}</span>
                            <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono ml-2">esc</kbd>
                            <span>{t('close')}</span>
                        </span>
                        <span className="hidden sm:flex items-center gap-1 text-muted-foreground/60">
                            <span className="font-medium text-foreground">{filteredItems.length}</span>
                            {filteredItems.length === 1 ? t('result') : t('results')}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}