<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Warehouse;

class ProductWarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear 20 productos
        Product::factory(20)->create()->each(function ($product) {
            // Asociar cada producto con 3 almacenes aleatorios con cantidades aleatorias
            $warehouses = Warehouse::inRandomOrder()->limit(3)->get();
            foreach ($warehouses as $warehouse) {
                $product->warehouse()->attach($warehouse->id);
            }
        });
    }
}
