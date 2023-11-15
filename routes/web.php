<?php

use Illuminate\Support\Facades\Route;

Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');
Route::get('tags/{tag:slug}', [\App\Http\Controllers\TagController::class, 'show'])->name('tags.show');
Route::get('category/{category:slug}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('category.show');
Route::get('dashboard', \App\Http\Controllers\DashboardController::class)->name('dashboard')->middleware('auth');

Route::resource('articles', \App\Http\Controllers\ArticleController::class);
require __DIR__.'/auth.php';
