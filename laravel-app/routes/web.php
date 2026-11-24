<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\RecordController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/password/forgot', [AuthController::class, 'forgotPassword']);
    Route::post('/password/reset', [AuthController::class, 'resetPassword']);

    Route::middleware('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        Route::post('/uploads', [UploadController::class, 'store']);
        Route::get('/files', [FileController::class, 'index']);
        Route::delete('/files/{uploadedFile}', [FileController::class, 'destroy']);

        Route::get('/records', [RecordController::class, 'index']);
        Route::post('/records', [RecordController::class, 'store']);
        Route::get('/records/{record}', [RecordController::class, 'show']);
        Route::put('/records/{record}', [RecordController::class, 'update']);
        Route::delete('/records/{record}', [RecordController::class, 'destroy']);

        Route::get('/logs', [LogController::class, 'index']);
        Route::get('/logs/{activityLog}', [LogController::class, 'show']);
    });
});

Route::get('/login', function () {
    return view('app');
})->name('login');

Route::get('/password/reset', function () {
    return view('app');
})->name('password.reset');

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*')->name('spa');
