<?php

namespace App\Listeners;

use App\Events\DeletedLeaveRequest;
use App\Events\NewLeaveRequest;
use Carbon\Carbon;
use Illuminate\Events\Dispatcher;

class LeaveRequestEventSubscriber
{
    public function updateUserHoursOnCreate(NewLeaveRequest $event): void 
		{
			$leaveRequest = $event->leaveRequest;
			$user = $leaveRequest->requester;
			$user->days = $user->days - $this->getLeaveLength($leaveRequest);
			$user->save();
		}
    
		public function updateUserHoursOnDelete(DeletedLeaveRequest $event): void 
		{
			$leaveRequest = $event->leaveRequest;
			$user = $leaveRequest->requester;
			$user->days = $user->days + $this->getLeaveLength($leaveRequest);

			$user->save();
		}

		private function getLeaveLength($leaveRequest)
		{
			$startDate = Carbon::parse($leaveRequest->date_start);
			$endDate = Carbon::parse($leaveRequest->date_end);
			return $startDate->diffInDays($endDate);
		}

    /**
     * Register the listeners for the subscriber.
     *
     * @return array<string, string>
     */
    public function subscribe(Dispatcher $events): array
    {
			return [
				NewLeaveRequest::class => 'updateUserHoursOnCreate',
				DeletedLeaveRequest::class => 'updateUserHoursOnDelete',
			];
    }
}