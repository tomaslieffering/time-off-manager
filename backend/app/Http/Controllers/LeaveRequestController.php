<?php

namespace App\Http\Controllers;

use App\Events\NewLeaveRequest;
use App\Http\Requests\StoreLeaveRequestRequest;
use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequest;
use App\Models\User;
use App\Traits\ApiResponses;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LeaveRequestController extends Controller
{
    use ApiResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::with('leaveRequests')->find(Auth::id());

        return [
            'upcoming' => LeaveRequestResource::collection(
                $user->leaveRequests()
                    ->whereDate('date_end', '>=', Carbon::today()->toDateString())
                    ->get()
                    ->sortBy('date_start')
                ),
            'previous' => LeaveRequestResource::collection(
                $user->leaveRequests()
                ->whereDate('date_end', '<', Carbon::today()->toDateString())
                ->get()
                ->sortBy('date_start')
                )
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeaveRequestRequest $request)
    {
        $leaveRequest = LeaveRequest::create($request->getModelAttributes());
        NewLeaveRequest::dispatch($leaveRequest);

        return $this->ok('Stored new leave request');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($leaveRequestId)
    {
        try {
            $leaveRequest = LeaveRequest::findOrFail($leaveRequestId);
        } catch (ModelNotFoundException $e) {
            return $this->notFound('Could not find specified resource');
        }

        if ($leaveRequest->status === 'pending') {
            $leaveRequest->delete();
            return $this->ok('Deleted leave request');
        } else {
            return $this->error('Request status must be pending to delete');
        }
    }
}
