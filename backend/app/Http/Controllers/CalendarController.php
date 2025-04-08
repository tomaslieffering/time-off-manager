<?php

namespace App\Http\Controllers;

use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequest;

class CalendarController extends Controller
{
    public function __invoke()
    {
        return LeaveRequestResource::collection(LeaveRequest::where('status', 'approved')->get());
    }
}
