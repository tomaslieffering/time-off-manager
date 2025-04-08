<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeaveRequestRequest;
use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LeaveRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admin = Auth::user()->is_admin;

        if ($admin) {
            return LeaveRequestResource::collection(LeaveRequest::all());
        } else {
            return LeaveRequestResource::collection(Auth::user()->leaveRequests);
        }    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeaveRequestRequest $request)
    {
        LeaveRequest::create($request->getModelAttributes());
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
    public function destroy(LeaveRequest $leaveRequest)
    {
        //
    }
}
