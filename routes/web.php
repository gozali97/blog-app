<?php

use Illuminate\Support\Facades\Route;

Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');

Route::get('dashboard', \App\Http\Controllers\DashboardController::class)->name('dashboard')->middleware('auth');

require __DIR__.'/auth.php';
