<?php

namespace Database\Seeders;

use App\Models\LeaveRequest;
use App\Models\User;
use Database\Factories\LeaveRequestFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory()
            ->count(20)
            ->create();

        // Create some previous leave request
        LeaveRequest::factory()
        ->recycle($users)
        ->count(10)
            ->create([
                'date_end' => fake()->dateTimeBetween('-4 week', '-1 week'),
                'date_start' => fake()->dateTimeBetween('-8 week', '-6 week'),
                'status' => 'completed'
            ]);
            
        // Create some future leave request
        LeaveRequest::factory()
            ->recycle($users)
            ->count(10)
            ->create([
                'date_end' => fake()->dateTimeBetween('+3 week', '+4 week'),
                'date_start' => fake()->dateTimeBetween('+1 week', '+2week'),
            ]);

        // Create our demo admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => 'password',
            'is_admin' => true
        ]);

        // Create some leave requests for our demo 'user' user
        $requests = LeaveRequest::factory()->count(3)->create();

        // Create our demo 'user' user
        $user = User::create([
            'name' => 'John',
            'email' => 'john@mail.com',
            'password' => 'password',
            'is_admin' => false
        ]);

        // Associate those leave requests with the demo 'user' user
        $user->leaveRequests()->saveMany($requests);
    }
}
