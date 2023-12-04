<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Resources\ArticleItemResource;
use App\Http\Resources\ArticleSingleResource;
use App\Http\Resources\ArticleTableResource;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use mysql_xdevapi\Collection;

class ArticleController extends Controller
{

    public $tags;
    public $categories;
    public $statuses;
    public function __construct(){
        $this->middleware('hasRole')->only('table', 'create');
        $this->middleware('auth')->except('show', 'index');
        $this->tags = Tag::select('id','name')->get();
        $this->categories = Category::select('id','name')->get();
        $this->statuses = collect(ArticleStatus::cases())->map(fn ($status) => [
            'id' => $status->value,
            'name' => str($status->label())->ucfirst(),
        ]);
    }

    public function index(){
        $article = Article::query()
            ->select('id','title', 'slug','user_id', 'teaser', 'created_at')
            ->with(['tags' => fn ($tag) => $tag->select('name', 'slug')])
            ->latest()
            ->limit(12)
            ->fastPaginate();

        return Inertia::render('Articles/Index', [
            'articles' => ArticleItemResource::collection($article),
        ]);
    }

    public function table(Request $request){

        $articles = Article::query()
            ->with([
                'author',
                'tags'=> fn($query) => $query->select('name', 'slug', 'id'),
                'category'=> fn($query) => $query->select('name', 'slug', 'id')
            ])
            ->whereBelongsTo($request->user(), 'author')
            ->latest()
            ->fastPaginate(5);
//    return ArticleTableResource::collection($articles);

        return Inertia::render('Articles/Table',[
            'articles' => ArticleTableResource::collection($articles),
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

        return Inertia::render('Articles/Show',[
            'article' => (new ArticleSingleResource($currentArticle))->additional([
                'related' => $articles,
            ]),
        ]);
    }

    public function create(){

        return Inertia::render('Articles/Create',[
                'tags' => $this->tags,
                'categories' => $this->categories,
                'statuses' => $this->statuses
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'picture' => ['nullable', 'mimes:png,jpg,jpeg', 'image'],
            'title' => ['required', 'string', 'min:3'],
            'teaser' => ['required', 'string', 'min:3'],
            'body' => ['required', 'string', 'min:3'],
            'category_id' => ['required'],
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

    public function edit(Article $article){

        return inertia('Articles/Edit',[
            'article' => $article->load([
                'tags' => fn ($query) => $query->select('id', 'name'),
                'category' => fn ($query) => $query->select('id', 'name'),
            ]),
            'tags' => $this->tags,
            'categories' => $this->categories,
            'statuses' => $this->statuses
        ]);
    }

    public function update(Request $request, Article $article){
dd($request->all());
        $request->validate([
            'picture' => ['nullable', 'mimes:png,jpg,jpeg', 'image'],
            'title' => ['required', 'string', 'min:3'],
            'teaser' => ['required', 'string', 'min:3'],
            'body' => ['required', 'string', 'min:3'],
            'category_id' => ['required'],
            'tags' => ['required', 'array'],
        ]);

        if ($request->hasFile('picture')) {
            $picture = $request->file('picture');
        }


        $article->update([
            'title' => $request->title,
            'teaser' => $request->teaser,
            'category_id' => $request->category_id,
            'body' => $request->body,
            'image' => $request->hasFile('picture') ? $picture->storeAs('images/articles', $article->slug .'.'.$picture->extension()) : $article->image,
        ]);
        $article->tags()->sync($request->tags, true);

        return to_route('articles.show', $article);
    }

    public function destroy(Article $article){
         if($article->image){
             Storage::delete($article->image);
         }
         $article->tags()->detach();
         $article->delete();

         return back();

    }
}
