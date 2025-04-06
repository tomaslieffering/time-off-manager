<?php

use App\Http\Controllers\LeaveRequestController;
use Illuminate\Support\Facades\Route;

Route::middleware([])->group(function() {
    Route::get('/requests', [LeaveRequestController::class, 'index']);
    Route::post('/requests', [LeaveRequestController::class, 'store']);
    Route::put('/requests/{id}/approve', [LeaveRequestController::class, 'approve']);
    Route::put('/requests/{id}/reject', [LeaveRequestController::class, 'reject']);
    Route::delete('/requests/{id}', [LeaveRequestController::class, 'destroy']);
});
