<?php

namespace App\Models;

use App\Events\DeletedLeaveRequest;
use App\Events\NewLeaveRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'date_start',
        'date_end',
        'reason',
        'requester_id',
        'approver_id'
    ];

    protected $dispatchesEvents = [
        'created' => NewLeaveRequest::class,
        'deleted' => DeletedLeaveRequest::class
    ];
    
    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'date_start' => 'datetime',
            'date_end' => 'datetime',
        ];
    }
}
