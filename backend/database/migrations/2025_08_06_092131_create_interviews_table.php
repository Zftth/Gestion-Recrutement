<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->constrained()->onDelete('cascade');
            $table->foreignId('interviewer_id')->constrained('users');
            $table->datetime('scheduled_at');
            $table->integer('duration')->default(60); // en minutes
            $table->string('location')->nullable();
            $table->string('meeting_link')->nullable(); // Pour les entretiens en ligne
            $table->enum('status', ['scheduled', 'completed', 'cancelled', 'rescheduled'])
                  ->default('scheduled');
            $table->text('notes')->nullable();
            $table->json('evaluation')->nullable(); // Notes d'évaluation
            $table->text('feedback')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('interviews');
    }
};