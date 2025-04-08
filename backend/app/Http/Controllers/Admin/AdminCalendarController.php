<?php

namespace App\Http\Controllers\Admin;

use App\Enums\LeaveRequestStatuses;
use App\Http\Controllers\Controller;
use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class AdminCalendarController extends Controller
{
    public function __invoke()
    {
        return LeaveRequestResource::collection(
            LeaveRequest::where('status', '!=', LeaveRequestStatuses::Completed->value)
                ->get()
                ->sortBy('date_start')
        );
    }
}
