<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeaveRequestRequest;
use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequest;
use App\Traits\ApiResponses;
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
        $admin = Auth::user()->is_admin;

        if ($admin) {
            return LeaveRequestResource::collection(LeaveRequest::all()->sortBy('date_start'));
        } else {
            return LeaveRequestResource::collection(Auth::user()->leaveRequests->sortBy('date_start'));
        }    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeaveRequestRequest $request)
    {
        LeaveRequest::create($request->getModelAttributes());

        return $this->ok('Stored new leave request');
    }

    /**
     * Approve the specified resource in storage.
     */
    public function approve(Request $request, LeaveRequest $leaveRequest)
    {
        //
    }

    /**
     * Reject the specified resource in storage.
     */
    public function reject(Request $request, LeaveRequest $leaveRequest)
    {
        //
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

        $leaveRequest->delete();

        return $this->ok('Deleted leave request');
    }
}
