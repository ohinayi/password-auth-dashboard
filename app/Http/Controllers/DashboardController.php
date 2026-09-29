<?php

namespace App\Http\Controllers;

use App\Models\LoginLog;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $logins = LoginLog::where('event', 'login');

        $days = collect(range(13, 0))->map(fn ($i) => Carbon::today()->subDays($i));
        $perDay = LoginLog::where('event', 'login')
            ->where('created_at', '>=', $days->first())
            ->get(['created_at'])
            ->countBy(fn ($l) => $l->created_at->toDateString());

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalLogins' => (clone $logins)->count(),
                'loginsToday' => (clone $logins)->whereDate('created_at', today())->count(),
                'uniqueUsers' => (clone $logins)->distinct('user_id')->count('user_id'),
                'failedAttempts' => LoginLog::where('event', 'failed')->count(),
                'myLogins' => (clone $logins)->where('user_id', auth()->id())->count(),
            ],
            'chart' => $days->map(fn ($d) => [
                'date' => $d->format('M j'),
                'count' => $perDay[$d->toDateString()] ?? 0,
            ])->values(),
            'logs' => LoginLog::latest()->limit(50)->get()->map(fn ($l) => [
                'id' => $l->id,
                'email' => $l->email,
                'event' => $l->event,
                'ip' => $l->ip_address,
                'agent' => $l->user_agent,
                'at' => $l->created_at->toDateTimeString(),
            ]),
        ]);
    }
}
