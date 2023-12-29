<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear 5 categorías
        Category::factory(5)->create()->each(function ($category) {
            // Para cada categoría, crear 3 productos asociados a esa categoría
            Product::factory(3)->create(['id_category' => $category->id]);
        });
    }
}
