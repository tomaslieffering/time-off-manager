<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\ApiResponses;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use ApiResponses;

    public function __invoke()
    {
        try {
            $user = User::findOrFail(Auth::id());
        } catch (ModelNotFoundException $e) {
            return $this->notFound('Specified user could not be logged out');
        }

        return new UserResource($user);
    }
}
