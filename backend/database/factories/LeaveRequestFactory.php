<?php

namespace Database\Factories;

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
            'status' => fake()->randomElement(['approved', 'rejected', 'pending', 'cancelled']),
            'date_start' => fake()->dateTimeBetween('-1 week', '+1 week'),
            'date_end' => fake()->dateTimeBetween('+1 week', '+3 week'),
            'reason' => fake()->randomElement([
                'Holiday', 
                'Bereavement', 
                'Child care', 
                'Sick',
            ]),
        ];
    }
}
