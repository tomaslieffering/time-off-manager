<?php

namespace Database\Factories;

use App\Enums\LeaveRequestStatuses;
use App\Models\User;
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
        return [
            'approver_id' => User::factory(),
            'requester_id' => User::factory(),
            'status' => fake()->randomElement(array_column(LeaveRequestStatuses::cases(), 'value')),
            'date_end' => fake()->dateTimeBetween('+3 week', '+4 week'),
            'date_start' => fake()->dateTimeBetween('-8 week', '+2week'),
            'reason' => fake()->randomElement([
                'Holiday', 
                'Bereavement', 
                'Child care', 
                'Sick',
            ]),
        ];
    }
}
