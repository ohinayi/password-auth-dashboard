<?php

namespace Tests\Feature;

use App\Models\LoginLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class PasswordAndLoginLogTest extends TestCase
{
    use RefreshDatabase;

    public static function weakPasswords(): array
    {
        return [['Sh0rt!A'], ['alllower1!x'], ['ALLUPPER1!X'], ['NoNumber!!x'], ['NoSpecial12x']];
    }

    #[DataProvider('weakPasswords')]
    public function test_rejects_weak_passwords(string $pw): void
    {
        $this->post('/register', ['name' => 'A', 'email' => 'a@x.com', 'password' => $pw, 'password_confirmation' => $pw])
            ->assertSessionHasErrors('password');
    }

    public function test_strong_password_and_login_logging(): void
    {
        $pw = 'Str0ng!Pass';
        $this->post('/register', ['name' => 'A', 'email' => 'a@x.com', 'password' => $pw, 'password_confirmation' => $pw])
            ->assertRedirect('/dashboard');
        $this->post('/logout');
        $this->post('/login', ['email' => 'a@x.com', 'password' => 'wrong']);
        $this->post('/login', ['email' => 'a@x.com', 'password' => $pw]);

        $events = LoginLog::pluck('event')->all();
        $this->assertContains('login', $events);
        $this->assertContains('logout', $events);
        $this->assertContains('failed', $events);
        $this->get('/dashboard')->assertOk();
    }
}
