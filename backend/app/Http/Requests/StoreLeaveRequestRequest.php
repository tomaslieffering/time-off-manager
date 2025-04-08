<?php

namespace App\Http\Requests;

use App\Enums\LeaveRequestStatuses;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Date;

class StoreLeaveRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'reason' => 'required|string',
            'other_reason' => 'nullable|required_if:reason,Other',
            'date_start' => ['required', (new Date)->afterOrEqual(today())],
            'date_end' => ['required', (new Date)->after('date_start')]
        ];
    }

    public function getModelAttributes(): array
    {
        return array_merge($this->safe()->only(['date_start', 'date_end']), [
            'requester_id' => Auth::user()->id,
            'status' => LeaveRequestStatuses::Pending->value,
            'reason' => $this->validated('reason') === 'Other' ? $this->validated('other_reason') : $this->validated('reason')
        ]);
    }
}
