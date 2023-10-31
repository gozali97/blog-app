<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            ['name' => $name = 'Laravel', 'slug' => str($name)->slug()],
            ['name' => $name = 'Codeigniter', 'slug' => str($name)->slug()],
            ['name' => $name = 'Tailwind CSS', 'slug' => str($name)->slug()],
            ['name' => $name = 'React JS', 'slug' => str($name)->slug()],
            ['name' => $name = 'Vue JS', 'slug' => str($name)->slug()],
            ['name' => $name = 'Next JS', 'slug' => str($name)->slug()],
            ['name' => $name = 'Nuxt JS', 'slug' => str($name)->slug()],
        ])->each(fn ($tag) => Tag::create($tag));
    }
}
