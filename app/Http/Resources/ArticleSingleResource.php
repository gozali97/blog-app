<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ArticleSingleResource extends JsonResource
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
            'title' => $this->title,
            'teaser' => $this->teaser,
            'body' => $this->body,
            'author' => $this->author->name,
            'image' => $this->image ? Storage::url($this->image) : 'https://flowbite.com/docs/images/examples/image-1@2x.jpg',
            'category' => [
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ],
            'tags' => $this->tags->map(fn ($tag) =>[
                'name' => $tag->name,
                'slug' => $tag->slug,
            ]),

        ];
    }
}
