<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\JobOfferController;
use App\Http\Controllers\API\ApplicationController;
use App\Http\Controllers\API\InterviewController;
use App\Http\Controllers\API\DocumentController;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\API\UserController;
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
Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/messages/send', [MessageController::class, 'sendMessage']);
    Route::get('/messages/conversation/{userId}', [MessageController::class, 'getConversation']);
    Route::put('/messages/read/{userId}', [MessageController::class, 'markAsRead']);
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/reset', [AuthController::class, 'reset']);
Route::get('/roles', function() {
    return Role::all();
});
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
    Route::prefix('applications/{applicationId}')->group(function () {
    Route::get('/documents', [DocumentController::class, 'index']);
    Route::post('/documents', [DocumentController::class, 'store']);
});
});
