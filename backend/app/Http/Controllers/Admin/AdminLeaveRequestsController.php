<?php

namespace App\Http\Controllers\Admin;

use App\Enums\LeaveRequestStatuses;
use App\Http\Controllers\Controller;
use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequest;
use App\Traits\ApiResponses;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminLeaveRequestsController extends Controller
{
    use ApiResponses;

    public function index()
    {
        return LeaveRequestResource::collection(
            LeaveRequest::whereDate('date_end', '>=', Carbon::today()->toDateString())
            ->where('status', 'pending')
            ->get()
            ->sortBy('date_start')
        );
    }

        /**
     * Approve the specified resource in storage.
     */
    public function approve(Request $request, $leaveRequestId)
    {
        try {
            $leaveRequest = LeaveRequest::findOrFail($leaveRequestId);
        } catch (ModelNotFoundException $e) {
            return $this->notFound('Could not find specified resource');
        }

        if ($leaveRequest->status === 'pending') {
            $leaveRequest->update([
                'status' => LeaveRequestStatuses::Approved->value,
                'approver_id' => Auth::id()
            ]);
            $leaveRequest->save();
            return $this->ok('Approved leave request');
        } else {
            return $this->error('Request status must be pending to approve');
        }
    }

    /**
     * Reject the specified resource in storage.
     */
    public function reject(Request $request, $leaveRequestId)
    {
        try {
            $leaveRequest = LeaveRequest::findOrFail($leaveRequestId);
        } catch (ModelNotFoundException $e) {
            return $this->notFound('Could not find specified resource');
        }

        if ($leaveRequest->status === 'pending') {
            $leaveRequest->update([
                'status' => LeaveRequestStatuses::Rejected->value,
                'approver_id' => Auth::id()
            ]);
            $leaveRequest->save();
            return $this->ok('Rejected leave request');
        } else {
            return $this->error('Request status must be pending to reject');
        }
    }
}
