<?php

namespace App\Http\Controllers;

use App\Enums\LeaveRequestStatuses;
use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
    public function __invoke()
    {
        return LeaveRequestResource::collection(
            LeaveRequest::whereHas('requester', function (Builder $query) {
                $query->where('team_id', User::find(Auth::id())->team_id);
            })
            ->where('status', LeaveRequestStatuses::Approved->value)
            ->get()
        );
    }
}
