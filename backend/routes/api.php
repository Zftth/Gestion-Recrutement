<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\JobOfferController;
use App\Http\Controllers\API\ApplicationController;
use App\Http\Controllers\API\InterviewController;
use App\Http\Controllers\API\DocumentController;

/*
|--------------------------------------------------------------------------
| Routes API
|--------------------------------------------------------------------------
| Définition de toutes les routes de l'API
| Séparées en deux sections : publiques et protégées
|--------------------------------------------------------------------------
*/

// ----------------------
// Routes PUBLIQUES
// ----------------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ----------------------
// Routes PROTÉGÉES
// ----------------------
Route::middleware('auth:sanctum')->group(function () {

    // -------- AUTH --------
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    // -------- OFFRES D'EMPLOI --------
    Route::apiResource('job-offers', JobOfferController::class);

    // -------- CANDIDATURES --------
    Route::apiResource('applications', ApplicationController::class);

    // -------- ENTRETIENS --------
    Route::apiResource('interviews', InterviewController::class);

    // -------- DOCUMENTS --------
    Route::apiResource('documents', DocumentController::class);    
});
