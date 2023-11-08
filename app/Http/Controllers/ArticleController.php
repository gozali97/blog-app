<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleItemResource;
use App\Http\Resources\ArticleSingleResource;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(){
        $article = Article::query()
            ->select('id','title', 'slug','user_id', 'teaser', 'created_at')
            ->with(['tags' => fn ($tag) => $tag->select('name', 'slug')])
            ->latest()
            ->limit(12)
            ->fastPaginate();

        return inertia('Articles/Index', [
            'articles' => ArticleItemResource::collection($article),
        ]);
    }

    public function show(Article $article){

        return inertia('Articles/Show',[
            'article' => new ArticleSingleResource($article),
        ]);
    }
}
