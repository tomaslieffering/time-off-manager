<x-mail::message>
# New Leave request submitted by {{ $leaveRequest->requester->name }}

<x-mail::panel>
Reason: **{{ $leaveRequest->reason }}**

Leave start: **{{ $leaveStart }}**

Leave end: **{{ $leaveEnd }}**
</x-mail::panel>

<x-mail::button :url="'http://timeoffmanager.local/admin/requests'">
View all pending requests
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
