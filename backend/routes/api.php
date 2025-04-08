<?php

use App\Http\Controllers\AdminLeaveRequestsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\LeaveRequestController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web'])->group(function() {
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});

Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/requests', [LeaveRequestController::class, 'index']);
    Route::post('/requests', [LeaveRequestController::class, 'store']);
    Route::delete('/requests/{id}', [LeaveRequestController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function() {
    Route::get('/admin/requests', [AdminLeaveRequestsController::class, 'index']);
    Route::put('/admin/requests/{id}/approve', [AdminLeaveRequestsController::class, 'approve']);
    Route::put('/admin/requests/{id}/reject', [AdminLeaveRequestsController::class, 'reject']);
});
