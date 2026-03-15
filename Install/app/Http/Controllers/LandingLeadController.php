<?php

namespace App\Http\Controllers;

use App\Models\LandingLead;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class LandingLeadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'source' => ['nullable', 'string', 'max:100'],
            'cta_location' => ['nullable', 'string', 'max:100'],
            'utm_source' => ['nullable', 'string', 'max:255'],
            'utm_medium' => ['nullable', 'string', 'max:255'],
            'utm_campaign' => ['nullable', 'string', 'max:255'],
            'utm_term' => ['nullable', 'string', 'max:255'],
            'utm_content' => ['nullable', 'string', 'max:255'],
            'metadata' => ['nullable', 'array'],
        ]);

        $lead = LandingLead::create(array_merge($validated, [
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]));

        $webhookUrl = config('services.lead_webhook_url');
        if (! empty($webhookUrl)) {
            try {
                Http::timeout(3)->post($webhookUrl, [
                    'id' => $lead->id,
                    'name' => $lead->name,
                    'email' => $lead->email,
                    'company' => $lead->company,
                    'source' => $lead->source,
                    'cta_location' => $lead->cta_location,
                    'utm_source' => $lead->utm_source,
                    'utm_medium' => $lead->utm_medium,
                    'utm_campaign' => $lead->utm_campaign,
                    'utm_term' => $lead->utm_term,
                    'utm_content' => $lead->utm_content,
                ]);
            } catch (\Throwable $e) {
                // Swallow webhook failures to keep lead capture resilient.
            }
        }

        return response()->json([
            'success' => true,
            'lead_id' => $lead->id,
        ]);
    }
}
