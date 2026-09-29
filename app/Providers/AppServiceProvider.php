<?php

namespace App\Providers;

use App\Models\LoginLog;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Min 8 chars, upper + lower case, number, special character.
        Password::defaults(fn () => Password::min(8)->mixedCase()->numbers()->symbols());

        Event::listen(Login::class, fn (Login $e) => $this->record('login', $e->user->getAuthIdentifier(), $e->user->email));
        Event::listen(Logout::class, fn (Logout $e) => $e->user && $this->record('logout', $e->user->getAuthIdentifier(), $e->user->email));
        Event::listen(Failed::class, fn (Failed $e) => $this->record('failed', $e->user?->getAuthIdentifier(), $e->credentials['email'] ?? null));
    }

    private function record(string $event, $userId, ?string $email): void
    {
        LoginLog::create([
            'user_id' => $userId,
            'email' => $email,
            'event' => $event,
            'ip_address' => request()->ip(),
            'user_agent' => substr((string) request()->userAgent(), 0, 255),
        ]);
    }
}
