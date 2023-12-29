<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Api\AuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Authentication routes
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

//Categories routes
Route::get('/categories/show', [CategoryController::class, 'show'])->middleware('auth:sanctum');
Route::get('/categories/get/{id}', [CategoryController::class, 'showById'])->middleware('auth:sanctum');
Route::post('/categories/create', [CategoryController::class, 'create'])->middleware('auth:sanctum');
Route::put('/categories/update/{id}', [CategoryController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/categories/delete/{id}', [CategoryController::class, 'delete'])->middleware('auth:sanctum');

//Warehouses routes
Route::get('/warehouses/show', [WarehouseController::class, 'show'])->middleware('auth:sanctum');
Route::get('/warehouse/get/{id}', [WarehouseController::class, 'showById'])->middleware('auth:sanctum');
Route::get('/warehouses/show/products/{id}', [WarehouseController::class, 'showProductsInWarehouse'])->middleware('auth:sanctum'); //Muestra los productos relacionado a un almacen
Route::post('/warehouse/create', [WarehouseController::class, 'create'])->middleware('auth:sanctum');
Route::put('/warehouse/update/{id}', [WarehouseController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/warehouse/delete/{id}', [WarehouseController::class, 'delete'])->middleware('auth:sanctum');

//Products routes
Route::get('/products/show', [ProductController::class, 'show'])->middleware('auth:sanctum');
Route::get('/product/get/{id}', [ProductController::class, 'showById'])->middleware('auth:sanctum');
Route::get('/products/show/warehouses/{id}', [ProductController::class, 'showWarehousesInProducts'])->middleware('auth:sanctum');
Route::post('/products/create', [ProductController::class, 'create'])->middleware('auth:sanctum');
Route::put('/products/update/{id}', [ProductController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/products/delete/{id}', [ProductController::class, 'delete'])->middleware('auth:sanctum');