<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    public function articles()
    {
        return $this->belongsToMany(Article::class)
            ->select('articles.id', 'articles.title', 'articles.image', 'articles.slug', 'articles.user_id', 'articles.teaser', 'articles.created_at')
            ->with(['tags' => fn ($tag) => $tag->select('name', 'slug')]);
    }
}
