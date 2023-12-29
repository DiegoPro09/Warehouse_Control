<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name_product' => $this->faker->name,
            'price' => $this->faker->randomFloat(2, 1, 100), // Número aleatorio con 2 decimales entre 1 y 100
            'observations' => $this->faker->sentence,
            'id_category' => \App\Models\Category::factory(),
        ];
    }
}
