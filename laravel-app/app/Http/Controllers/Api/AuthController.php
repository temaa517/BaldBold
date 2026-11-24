<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $defaultRoleName = config('voyager.user.default_role', 'user');
        $roleId = \TCG\Voyager\Facades\Voyager::model('Role')
            ->where('name', $defaultRoleName)
            ->value('id');

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role_id' => $roleId ?? \TCG\Voyager\Facades\Voyager::model('Role')->min('id'),
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Регистрация выполнена',
            'user' => $this->userPayload($user),
            'csrf_token' => $request->session()->token(),
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            return response()->json(['message' => 'Неверный email или пароль'], 422);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Вход выполнен',
            'user' => $this->userPayload(Auth::user()),
            'csrf_token' => $request->session()->token(),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Выход выполнен',
            'csrf_token' => $request->session()->token(),
        ]);
    }

    public function me(): JsonResponse
    {
        $user = Auth::user();

        return response()->json(['user' => $user ? $this->userPayload($user) : null]);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate(['email' => ['required', 'email']]);

        $status = Password::sendResetLink($request->only('email'));

        return response()->json(
            ['message' => __($status)],
            $status === Password::RESET_LINK_SENT ? 200 : 422
        );
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();
            }
        );

        return response()->json(
            ['message' => __($status)],
            $status === Password::PASSWORD_RESET ? 200 : 422
        );
    }

    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role_id' => $user->role_id,
            'is_admin' => (int) $user->role_id === 1,
        ];
    }
}
