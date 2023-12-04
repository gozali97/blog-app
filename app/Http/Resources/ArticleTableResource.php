<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleTableResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'author' => $this->author,
            'title' => $this->title,
            'slug' => $this->slug,
            'status' => str($this->status->label())->ucfirst(),
            'category' => [
                'name' => $this->category->name,
                'url' => route('category.show', $this->category),
            ],
            'tags' => $this->tags->map(fn ($tag) => [
                'name' => $tag->name,
                'slug' => $tag->slug,
            ]),
        ];
    }
}
