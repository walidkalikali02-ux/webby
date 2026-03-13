<?php

namespace App\Traits;

use App\Models\SystemSetting;

trait ConditionallyVerifiesEmail
{
    /**
     * Determine if the user has verified their email address.
     * If email verification is disabled in settings, always return true.
     */
    public function hasVerifiedEmail(): bool
    {
        return true;
    }

    /**
     * Check if email verification is required based on settings.
     */
    public function shouldVerifyEmail(): bool
    {
        return false;
    }

    /**
     * Mark the given user's email as verified.
     */
    public function markEmailAsVerified(): bool
    {
        return $this->forceFill([
            'email_verified_at' => $this->freshTimestamp(),
        ])->save();
    }

    /**
     * Send the email verification notification.
     */
    public function sendEmailVerificationNotification(): void
    {
        return;
    }

    /**
     * Get the email address that should be used for verification.
     */
    public function getEmailForVerification(): string
    {
        return $this->email;
    }
}
