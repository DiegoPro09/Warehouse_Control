<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Warehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_warehouse',
        'description'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'products_has_warehouse');
    }
}