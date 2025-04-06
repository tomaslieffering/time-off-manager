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

        LeaveRequest::factory()
            ->recycle($users)
            ->count(50)
            ->create();
    }
}
