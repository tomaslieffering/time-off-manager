<?php

use App\Enums\LeaveRequestStatuses;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('requester_id');
            $table->foreignId('approver_id')->nullable();
            $table->enum('status', array_column(LeaveRequestStatuses::cases(), 'value'))->default(LeaveRequestStatuses::Pending->value);
            $table->date('date_start');
            $table->date('date_end');
            $table->string('reason');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};
