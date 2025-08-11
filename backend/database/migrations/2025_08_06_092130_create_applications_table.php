<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_offer_id')->constrained()->onDelete('cascade');
            $table->foreignId('candidate_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['received', 'in_progress', 'interview', 'accepted', 'rejected'])
                  ->default('received');
            $table->text('cover_letter')->nullable();
            $table->string('cv_path')->nullable();
            $table->json('documents')->nullable(); // Autres documents
            $table->text('internal_notes')->nullable();
            $table->integer('ai_score')->nullable(); // Score IA
            $table->json('status_history')->nullable(); // Historique des changements
            $table->timestamp('status_changed_at')->nullable();
            $table->foreignId('status_changed_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('applications');
    }
};