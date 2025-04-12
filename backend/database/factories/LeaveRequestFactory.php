<?php

namespace Database\Factories;

use App\Enums\LeaveRequestStatuses;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LeaveRequest>
 */
class LeaveRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return array_merge([
            'approver_id' => User::factory(),
            'requester_id' => User::factory(),
            'reason' => fake()->randomElement([
                'Holiday', 
                'Bereavement', 
                'Child care', 
                'Sick',
            ]),
        ], $this->getRealisticLeave());
    }

    private function getRealisticLeave()
    {
        $dateStart = fake()->dateTimeBetween('-4 week', '+8 week');
        $dateEnd = fake()->dateTimeInInterval($dateStart, '+2 week');
        $status = fake()->randomElement(array_column(LeaveRequestStatuses::cases(), 'value'));

        if (Carbon::parse($dateEnd)->isPast()) {
            $status = LeaveRequestStatuses::Completed->value;
        }

        return [
            'status' => $status,
            'date_start' => $dateStart,
            'date_end' => fake()->dateTimeInInterval($dateStart, '+2 week'),
        ];
    }
}
