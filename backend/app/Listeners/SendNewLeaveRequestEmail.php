<?php

namespace App\Listeners;

use App\Events\NewLeaveRequest;
use App\Mail\NewLeaveRequest as MailNewLeaveRequest;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendNewLeaveRequestEmail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NewLeaveRequest $event): void
    {
        $admins = User::where('is_admin', true)->get();

        foreach($admins as $admin) {
            Mail::to($admin)->send(new MailNewLeaveRequest($event->leaveRequest));
        }
    }
}
