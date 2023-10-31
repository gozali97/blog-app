<?php

use Illuminate\Support\Facades\Route;

Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');
Route::get('category/{category:slug}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('category.show');
Route::get('dashboard', \App\Http\Controllers\DashboardController::class)->name('dashboard')->middleware('auth');

require __DIR__.'/auth.php';
