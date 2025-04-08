<?php

namespace App\Enums;

enum LeaveRequestStatuses: string
{
    case Approved = 'approved';
    case Rejected = 'rejected';
    case Pending = 'pending';
    case Completed = 'completed';
}
