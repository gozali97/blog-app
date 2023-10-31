<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => rand(1, 3),
            'user_id' => User::factory(),
            'title' => $title = $this->faker->sentence(),
            'slug' => str($title)->slug(),
            'teaser' => $this->faker->paragraph,
            'body' => $this->faker->paragraphs(3, true),
        ];
    }
}
