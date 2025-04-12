<?php

namespace Database\Seeders;

use App\Models\LeaveRequest;
use App\Models\Team;
use App\Models\User;
use Database\Factories\LeaveRequestFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            TeamSeeder::class
        ]);

        $users = User::factory()
            ->teams(Team::all()->pluck('id')->toArray())
            ->count(20)
            ->create();

        LeaveRequest::factory()
            ->recycle($users)
            ->count(40)
            ->create();

        // Create our demo admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => 'password',
            'is_admin' => true,
        ]);

        // Create some leave requests for our demo 'user' user
        $requests = LeaveRequest::factory()
            ->count(3)
            ->create();

        // Create our demo 'user' user
        $user = User::create([
            'name' => 'Joe Blogs',
            'email' => 'joeblogs@mail.com',
            'password' => 'password',
            'is_admin' => false,
            'team_id' => 1
        ]);

        // Associate those leave requests with the demo 'user' user
        $user->leaveRequests()->saveMany($requests);
    }
}
