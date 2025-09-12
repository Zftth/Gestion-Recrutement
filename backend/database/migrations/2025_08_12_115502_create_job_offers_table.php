<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('job_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recruiter_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
             $table->string('location')->nullable();
            $table->text('requirements')->nullable();   
            $table->string('salary')->nullable();       
            $table->string('contract_type')->nullable(); 
            $table->string('experience')->nullable();
            $table->string('company')->nullable(); 
            $table->string('type')->nullable(); 
            $table->enum('status', ['ouverte', 'fermée'])->default('ouverte');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_offers');
    }
};
