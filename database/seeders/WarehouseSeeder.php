<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Warehouse;
use App\Models\Product;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear 3 almacenes
        Warehouse::factory(3)->create()->each(function ($warehouse) {
            // Para cada almacén, asociar productos aleatorios con cantidades aleatorias
            Product::factory(5)->create()->each(function ($product) use ($warehouse) {
                $product->warehouse()->attach($warehouse->id);
            });
        });
    }
}
