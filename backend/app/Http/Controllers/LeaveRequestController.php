<?php

namespace App\Http\Controllers;

use App\Http\Resources\LeaveRequestResource;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // check current user is admin

        // if admin, return all requests
        return LeaveRequestResource::collection(LeaveRequest::all());

        // if not, return only current user
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
