<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleItemResource;
use App\Http\Resources\ArticleSingleResource;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;

class ArticleController extends Controller
{

    public $tags;
    public $categories;
    public function __construct(){
        $this->middleware('auth')->except('show', 'index');
        $this->tags = Tag::select('id','name')->get();
        $this->categories = Category::select('id','name')->get();
    }

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

//        return new ArticleSingleResource($article);
        $articles = Article::query()
            ->select('id', 'title', 'slug')
            ->whereNot('id', $article->id)
            ->with('category')
            ->limit(10)
            ->get();

        $currentArticle = $article->load([
            'tags' => fn($query) => $query->select('name', 'slug'),
            'category' => fn($query) => $query->select('id','name', 'slug'),
        ]);

        return inertia('Articles/Show',[
            'article' => (new ArticleSingleResource($currentArticle))->additional([
                'related' => $articles,
            ]),
        ]);
    }

    public function create(){

        return inertia('Articles/Create',[
                'tags' => $this->tags,
                'categories' => $this->categories,
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'picture' => ['nullable', 'mimes:png,jpg,jpeg', 'image'],
            'title' => ['required', 'string', 'min:3'],
            'teaser' => ['required', 'string', 'min:3'],
            'body' => ['required', 'string', 'min:3'],
            'category_id' => ['required', 'exists:categories, id'],
            'tags' => ['required', 'array'],
        ]);

        $picture = $request->file('picture');

        $article =   $request->user()->articles()->create([
                        'title' => $title = $request->title,
                        'slug' => $slug = str($title)->slug(),
                        'teaser' => $request->teaser,
                        'category_id' => $request->category_id,
                        'body' => $request->body,
                        'image' => $request->hasFile('picture') ? $picture->storeAs('images/articles', $slug .'.'.$picture->extension()) : null,
                    ]);
        $article->tags()->attach($request->tags);

      return to_route('articles.show', $article);
    }
}
