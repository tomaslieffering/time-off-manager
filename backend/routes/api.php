<?php

use App\Http\Controllers\Admin\AdminCalendarController;
use App\Http\Controllers\Admin\AdminLeaveRequestsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function() {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    
    Route::get('/user', UserController::class);
    
    Route::get('/requests', [LeaveRequestController::class, 'index']);
    Route::post('/requests', [LeaveRequestController::class, 'store']);
    Route::delete('/requests/{id}', [LeaveRequestController::class, 'destroy']);

    Route::get('/calendar', CalendarController::class);
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function() {

    Route::get('/admin/requests', [AdminLeaveRequestsController::class, 'index']);
    Route::put('/admin/requests/{id}/approve', [AdminLeaveRequestsController::class, 'approve']);
    Route::put('/admin/requests/{id}/reject', [AdminLeaveRequestsController::class, 'reject']);
    
    Route::get('/admin/calendar', AdminCalendarController::class);
});
