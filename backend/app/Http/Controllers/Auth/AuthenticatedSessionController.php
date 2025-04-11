<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\ApiResponses;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    use ApiResponses;

    public function store(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $token = $request->user()->createToken(Auth::user()->name);
 
            return $this->success('Login successful', [
                'user' => new UserResource(Auth::user()),
                'token' => $token->plainTextToken
            ]);
        }
 
        return $this->notAuthorized('Invalid credentials');
    }

    public function destroy(Request $request)
    {
        try {
            $user = User::findOrFail(Auth::id());
        } catch (ModelNotFoundException $e) {
            return $this->notFound('Specified user could not be logged out');
        }

        $user->tokens()->delete();

        return response()->noContent();
    }
}
