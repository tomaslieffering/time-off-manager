<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    private $teams = ['HR', 'Delivery', 'Finance', 'Managers'];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->teams as $team) {
            Team::create([
                'name' => $team
            ]);
        }
    }
}
