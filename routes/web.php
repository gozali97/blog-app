<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');
Route::get('tags/{tag:slug}', [\App\Http\Controllers\TagController::class, 'show'])->name('tags.show');
Route::get('category/{category:slug}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('category.show');
Route::get('dashboard', \App\Http\Controllers\DashboardController::class)->name('dashboard')->middleware('auth');

Route::get('articles/table', [\App\Http\Controllers\ArticleController::class, 'table'])->name('article.table');
//Route::resource('articles', \App\Http\Controllers\ArticleController::class);
Route::get('articles', [\App\Http\Controllers\ArticleController::class, 'index'])->name('articles.index');
Route::get('articles/create', [\App\Http\Controllers\ArticleController::class, 'create'])->name('articles.create');
Route::post('articles/store', [\App\Http\Controllers\ArticleController::class, 'store'])->name('articles.store');
Route::get('articles/show/{article:slug}', [\App\Http\Controllers\ArticleController::class, 'show'])->name('articles.show');
Route::get('articles/edit/{article:slug}', [\App\Http\Controllers\ArticleController::class, 'edit'])->name('articles.edit');
Route::post('articles/update/{article}', [\App\Http\Controllers\ArticleController::class, 'update'])->name('articles.update');
Route::delete('articles/delete/{article}', [\App\Http\Controllers\ArticleController::class, 'destroy'])->name('articles.destroy');
require __DIR__.'/auth.php';
