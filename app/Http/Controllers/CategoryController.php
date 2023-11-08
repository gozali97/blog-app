<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleItemResource;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function show(Category $category){

        $article = Article::query()
            ->select('id','title', 'slug','user_id', 'teaser', 'created_at')
            ->with(['tags' => fn ($tag) => $tag->select('name', 'slug')])
            ->limit(12)
            ->fastPaginate();

         return inertia('Category/Show', [
             'category' => $category,
             'articles' => ArticleItemResource::collection($article),
         ]);
    }
}