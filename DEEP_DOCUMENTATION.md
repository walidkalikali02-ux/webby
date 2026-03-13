# Webby Deep Documentation (Codebase-Oriented)

This document is a code-driven architecture and file map for the Webby AI-powered no-code website builder. It is derived from the code in `Install/` and related runtime assets in the repo.

## 1. System Overview

Webby is a Laravel 12 + React 18 (Inertia) SaaS app that orchestrates a separate AI builder service. The Laravel app handles auth, billing, projects, templates, storage, and admin configuration. The external builder service generates code and streams realtime progress back to clients via Pusher or Reverb, and posts webhooks to Laravel for final state updates.

Core subsystems:
- Backend: Laravel 12 (PHP 8.2+), database-backed, queued jobs (database queue by default).
- Frontend: React 18 with Inertia + Vite + Tailwind v4.
- AI Builder: external Go service (prebuilt binaries in `Builder/prebuilt/`), reached via HTTP.
- Realtime: Pusher or Laravel Reverb.
- Storage: Local private + public disks (and optional S3).
- Payments: Stripe, Razorpay, plus plugin-based gateways.
- Optional Firebase integration for generated apps.

## 2. Repository Layout

Top-level layout:
- `Builder/prebuilt/` - prebuilt builder binaries (linux/arm64/macos). Not source.
- `Documentation/` - compiled docs SPA (no source).
- `Install/` - the actual Laravel application.
- `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `supervisord.conf` - deployment assets.

The application root is `Install/`.

## 3. Runtime Stack (Docker)

Dockerfile installs PHP 8.4 FPM + Nginx + Supervisor and PHP extensions. It copies `Install/` into `/var/www/html` and runs `php artisan key:generate` at build time.

Key files:
- Nginx: `nginx.conf` (serves `public/`, proxies PHP to FPM, serves `/storage` as public assets).
- Supervisor: `supervisord.conf` (runs `php-fpm` and `nginx`).
- Docker Compose: `docker-compose.yml` (maps host `Install/` to `/var/www/html`).

## 4. Laravel Application Structure

Main entrypoints:
- HTTP entry: `Install/public/index.php`
- CLI: `Install/artisan`
- Routes: `Install/routes/web.php`, `Install/routes/api.php`

Core directories:
- `Install/app/Http/Controllers/` - app controllers, including admin and builder proxy.
- `Install/app/Models/` - domain models.
- `Install/app/Services/` - domain service layer (builder, billing, storage, etc.).
- `Install/resources/js/` - frontend React app.
- `Install/database/migrations/` - schema changes.

## 5. Key Domain Models

### Users and Access
- `User`: authentication, plan, role, status, locale, credits.
- `UserAiSettings`: per-user AI provider + key configuration.
- `UserNotification`, `UserConsent`.

### Projects and Generation
- `Project`: core record for builds. Stores:
  - `builder_id`, `build_session_id`, `build_status`.
  - `conversation_history`, `compacted_history`, `estimated_tokens`.
  - `template_id`, publishing fields, custom domain fields.
  - `firebase_config`, `firebase_admin_service_account`.
  - `storage_used_bytes`, `api_token`.
- `ProjectFile`: uploaded files for AI context and generated apps.
- `Template`: builder templates (system or uploaded).
- `Builder`: external builder endpoints (URL, port, server key, status, max iterations).

### Plans, Billing, Credits
- `Plan`: feature flags and limits (credits, templates, AI providers, storage, domains).
- `Subscription`: plan subscription state.
- `Transaction`: billing records.
- `BuildCreditUsage`: per-build usage tracking.

### Admin/Settings
- `SystemSetting`: key-value config (cached).
- `Language`: i18n.
- `Plugin`: optional payment gateways or add-ons.

## 6. Core Request Flows

### 6.1 Installation and Upgrade
Routes:
- `/install/*` in `routes/web.php` guarded by `not-installed`.
- `/upgrade/*` guarded by `installed`.

Controllers:
- `InstallController`, `UpgradeController`.
- `InstallerService` provides install logic.

### 6.2 Authentication and Access
Controllers in `app/Http/Controllers/Auth` handle login, registration, password reset, and OAuth (Socialite). OAuth configs are loaded dynamically from SystemSetting (see `config/services.php`).

### 6.3 Project Creation and AI Build
Flow (simplified):
1. User creates project in UI (React/Inertia).
2. `BuilderProxyController::startBuild()` validates prompt, credits, and plan.
3. `BuilderService::getAiConfigForUser()` resolves provider and model.
4. Template is validated or auto-selected (via `TemplateClassifierService`).
5. Builder session started with payload:
   - `goal`, `history`, `config` (AI provider), `template`, `workspace_id`, `webhook_url`.
6. Project updated with `builder_id`, `build_session_id`, `build_status=building`.

Key files:
- `app/Http/Controllers/BuilderProxyController.php`
- `app/Services/BuilderService.php`
- `app/Services/TemplateClassifierService.php`

### 6.4 Builder Webhook and Realtime
Builder posts webhook events to `/api/builder/webhook`.
- `BuilderWebhookController` updates project state, history, credits, etc.
- Realtime events can be broadcast via Pusher or Reverb.

Key files:
- `routes/api.php`
- `app/Events/Builder/*`
- `config/broadcasting.php`, `config/reverb.php`

### 6.5 File Storage
- Default disk: `local` at `storage/app/private`.
- Public disk: `storage/app/public` served via `/storage`.
- Public file API: `/api/files/{projectId}/{filename}`.
- App file API with project token: `/api/app/{projectId}/files`.

Key files:
- `config/filesystems.php`
- `app/Http/Controllers/ProjectFileController.php`
- `app/Services/ProjectFileService.php`

### 6.6 Billing
- Plans, subscriptions, and transactions are persisted in DB.
- Payment gateways appear to be modular (plugins, plus Stripe/Razorpay core).

Key files:
- `app/Models/Plan.php`, `Subscription.php`, `Transaction.php`
- `app/Services/InvoiceService.php`
- `app/Plugins/PaymentGateways/*`

### 6.7 Landing Page Builder
Landing pages are backed by DB tables (`LandingContent`, `LandingSection`, `LandingItem`) and are editable via admin UI.

Key files:
- `app/Services/LandingPageService.php`
- `app/Http/Controllers/Admin/LandingBuilderController.php`
- `database/migrations/2026_02_02_051733_create_landing_builder_tables.php`

## 7. Frontend Architecture

Entry:
- `resources/js/app.tsx` bootstraps Inertia.

Structure:
- `resources/js/Pages/*`: page-level views, grouped by area (Admin, Auth, Billing, Chat, Create, Projects, etc.).
- `resources/js/components/*`: reusable UI components.
- `resources/js/Layouts/*`: Admin, Guest, Installer layouts.
- `resources/js/hooks/*`: UI and data hooks (chat, preview, notifications).

Rendering:
- Uses Inertia routes defined in `routes/web.php`.
- `resources/views/app.blade.php` provides the Inertia root container.

## 8. Database Schema (High-Level)

Major tables (from migrations):
- Users: `users`
- Projects: `projects`
- Builders: `builders`
- Templates: `templates`
- Plans: `plans`
- Subscriptions: `subscriptions`
- Transactions: `transactions`
- AI providers: `ai_providers`
- Build credits: `build_credit_usages`
- Project files: `project_files`
- Landing builder: `landing_contents`, `landing_sections`, `landing_items`
- System settings: `system_settings`
- Languages: `languages`
- Notifications: `user_notifications`
- Referrals: `referral_codes`, `referrals`, `referral_credit_transactions`
- Audit logs: `audit_logs`
- Data export requests: `data_export_requests`
- Account deletion requests: `account_deletion_requests`

Key relationships:
- `Project` belongs to `User`, `Template`, `Builder`.
- `Plan` has many `Users`, `Subscriptions`, `Transactions`.
- `Plan` belongs to `AiProvider` and `Builder` (fallbacks via `SystemSetting`).
- `Template` belongs to many `Plan` (pivot `plan_template`).

## 9. AI Providers and Model Selection

Providers supported:
- OpenAI, Anthropic, Grok, DeepSeek, Zhipu.

Model selection:
- Primary AI provider comes from plan (`Plan::getAiProviderWithFallbacks()`), or user key if allowed.
- Fallback providers: `fallback_ai_provider_ids` in `plans`.
- Defaults from `SystemSetting` (`default_ai_provider_id`).

Config is shaped for the external builder and includes:
- `agent` model config
- `summarizer` model config
- `suggestions` model config

Key files:
- `app/Models/AiProvider.php`
- `app/Services/BuilderService.php`
- `app/Services/InternalAiService.php`

## 10. Templates and Auto-Classification

Templates:
- System templates are always available.
- Uploaded templates can be assigned to plans.

Auto-classification:
- If user does not choose a template, `TemplateClassifierService` classifies intent and selects an appropriate template (falls back to default).

Key files:
- `app/Models/Template.php`
- `app/Services/TemplateClassifierService.php`

## 11. Realtime and WebSocket

Two options:
- Pusher (default)
- Laravel Reverb

The builder streams realtime updates via Pusher-compatible API. Laravel passes credentials to the builder via `BuilderService::getPusherConfigForBuilder()`.

Key files:
- `app/Services/BuilderService.php`
- `config/broadcasting.php`, `config/reverb.php`

## 12. Security and Permissions

- Installation is guarded by `not-installed` middleware.
- Operational routes require `installed` middleware.
- `ProjectPolicy` controls access to projects.
- `BuilderProxyController` blocks demo admin builds in demo mode.
- `ProjectFileController` uses project API tokens for generated app access.

Key files:
- `app/Policies/ProjectPolicy.php`
- `app/Http/Middleware/*`

## 13. Configuration and Environment

Relevant config files:
- `config/app.php` (demo mode, base domain)
- `config/services.php` (social login, Firebase, Sentry)
- `config/filesystems.php` (local/public/S3 disks)
- `config/broadcasting.php`, `config/reverb.php`
- `config/queue.php` (database queue by default)

System settings are stored in DB and cached:
- `SystemSetting::get()` caches per key.
- `SystemSetting::getGroup()` caches per group.

## 14. Observability and Maintenance

- Audit logs: `audit_logs` table + `AuditLogService`.
- Sentry reporting: `SentryReporterService`.
- Cron/maintenance commands in `app/Console/Commands/*` (e.g. cleanup, stale sessions, data exports).

## 15. Development and Testing

Frontend tests use Vitest (`resources/js/**/__tests__`).
Backend tests use PHPUnit (`phpunit.xml`).

Common scripts (`package.json` and `composer.json`):
- `npm run dev`, `npm run build`
- `composer run dev` (concurrently server, queue, logs, vite)

## 16. Where to Look for Specific Features

- AI build flow: `app/Http/Controllers/BuilderProxyController.php`, `app/Services/BuilderService.php`
- Template selection: `app/Services/TemplateClassifierService.php`, `app/Models/Template.php`
- Plan limits: `app/Models/Plan.php`, `app/Services/BuildCreditService.php`
- Storage & files: `app/Http/Controllers/ProjectFileController.php`, `app/Services/ProjectFileService.php`
- Billing: `app/Http/Controllers/BillingController.php`, `app/Services/InvoiceService.php`
- Admin settings: `app/Http/Controllers/Admin/SettingsController.php`, `app/Models/SystemSetting.php`
- Realtime: `app/Events/*`, `config/broadcasting.php`

## 17. Gaps / External Dependencies

- The Go builder source is not in this repo, only binaries.
- Documentation source is not in this repo, only compiled assets in `Documentation/`.

## 18. Notes (Recent Local Changes)

- Zhipu provider can now read credentials from `.env` via `config/services.php` (no DB-stored key required).
  - See: `Install/config/services.php` (`services.zhipu`) and `Install/app/Models/AiProvider.php` (`getApiKey()`, `getBaseUrl()`).
- If `ZHIPU_API_KEY` is set and no Zhipu provider exists, it auto-creates one at boot and sets it as default if no default exists.
  - See: `Install/app/Providers/AppServiceProvider.php` (`configureZhipuProvider()`).
- `.env.example` now includes Zhipu env keys for local setup.
  - See: `Install/.env.example`.

---

If you want this expanded into an even deeper, feature-by-feature spec (including a full table-by-table schema and per-controller flow diagrams), tell me which area to prioritize.
