<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Warehouse;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_product',
        'price',
        'observations',
        'id_category'
    ];

    protected $hidden = [
        'created_at', 
        'updated_at'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function warehouse()
    {
        return $this->belongsToMany(Warehouse::class, 'products_has_warehouse')->withPivot('quantity');
    }
}
