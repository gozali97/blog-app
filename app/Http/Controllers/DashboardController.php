<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleItemResource;
use App\Models\Article;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $article = Article::query()
            ->select('id','title', 'image', 'slug','user_id', 'teaser', 'created_at')
            ->with(['tags' => fn ($tag) => $tag->select('name', 'slug')])
            ->latest()
            ->limit(12)
            ->get();
        return inertia('Dashboard', [
            'articles' => ArticleItemResource::collection($article),
        ]);
    }
}
