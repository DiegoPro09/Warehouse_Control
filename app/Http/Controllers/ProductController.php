<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use App\Models\Warehouse;

class ProductController extends Controller
{
    public function __construct(){
        $this->middleware('auth.check');
    }

    public function show(){
        $products = Product::all();

        if($products->isEmpty()){
            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'No data available',
            ]);
        }

        return response([
            'status' => 'success',
            'code' => 200,
            'products' => $products
        ]);
    }

    public function showById($id){
        $product = Product::where('id', $id)->first();

        if(!$product){
            return response([
                'status' => 'success',
                'code' => 400,
                'message' => 'No data available',
            ]);
        }

        return response([
            'status' => 'success',
            'code' => 200,
            'products' => $product
        ]);
    }

    public function showWarehousesInProducts($id){
        // Buscar el producto por su ID
        $product = Product::with('warehouse:id,name_warehouse,products_has_warehouse.quantity')->find($id);

        if (!$product) {
            return response([
                'status' => 'error',
                'code' => 404,
                'message' => 'Product not found',
            ]);
        }

        if ($product->warehouse) {
            // Remover el objeto pivot de cada almacén
            $product->warehouse->map(function ($warehouse) {
                unset($warehouse->pivot);
                return $warehouse;
            });
        }

        return response([
            'status' => 'success',
            'code' => 200,
            'product' => $product
        ]);
    }

    public function create(Request $request){
        $search = Product::where('name_product', $request->input('name_product'))->first();

        if(!$search) {
            $data = $request->validate([
                'name_product' => 'required|string|max:50',
                'id_category' => 'required|exists:categories,id',
                'price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
                'observations' => 'nullable|max:150',
                'warehouses' => 'array',
                'warehouses.*.id' => 'exists:warehouses,id',
                'warehouses.*.quantity' => 'nullable|integer|min:0',
            ]);

            $product = Product::create([
                'name_product' => $data['name_product'],
                'price' => $data['price'],
                'id_category' => $data['id_category'],
            ]);

            if(($data['warehouses'])){
                $warehousesData = $data['warehouses'];

                foreach ($warehousesData as $warehouseData) {
                    $warehouse = Warehouse::find($warehouseData['id']);

                    if ($warehouse) {
                        $quantity = 1;

                        $product->warehouse()->attach($warehouse, ['quantity' => $quantity]);
                    }
                }

                return response([
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Product created successfully',
                    'product' => $data
                ]);
            }

            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'Product created successfully',
                'product' => $data
            ]);
        }else{
            return response([
                'status' => 'error',
                'code' => 400,
                'message' => 'Product already exists'
            ]);
        }
    }

    public function update(Request $request, $id){
        // Buscar el producto por su id
        $product = Product::find($id);

        // Validar la solicitud
        $data = $request->validate([
            'name_product' => 'required|string|max:50',
            'id_category' => 'required|exists:categories,id',
            'price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'warehouses' => 'array',
            'warehouses.*.id' => 'exists:warehouses,id',
            'warehouses.*.quantity' => 'integer|min:0',
        ]);

        // Actualiza los campos del producto
        $product->update([
            'name_product' => $data['name_product'],
            'id_category' => $data['id_category'],
            'price' => $data['price'],
        ]);



        // Actualiza las relaciones con los almacenes si se proporcionan
        $this->productHasWarehouse($request, $id);

        // Devolver una respuesta
        return response([
            'status' => 'success',
            'code' => 200,
            'message' => 'Product updated successfully',
            'product' => $data,
        ]);
    }

    public function delete($id){
        $product = Product::find($id);

        if($product){
            //Eliminar la relacion con almacenes
            $product->warehouse()->detach();
            $product->delete();

            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'Product deleted successfully'
            ]);
        }

        return response([
            'status' => 'error',
            'code' => 404,
            'message' => 'Product not found',
        ]);
    }

    //Funcion para poder agregar, eliminar o actualizar products_has_warehouse
    public function productHasWarehouse(Request $request, $id){
        // Buscar el producto por su id
        $product = Product::find($id);

        // Valida la solicitud
        $validator = Validator::make($request->all(), [
            'warehouses' => 'required|array',
            'warehouses.*.id' => 'exists:warehouses,id',
            'warehouses.*.quantity' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response([
                'status' => 'error',
                'code' => 400,
                'message' => 'Validation failed',
                'errors' => $validator->errors(), 
            ]);
        }

        // Obtener datos de almacenes
        $warehousesData = $request->input('warehouses');

        // Sincronizar las relaciones con los almacenes proporcionados
        $syncData = [];
        foreach ($warehousesData as $warehouseData) {
            $syncData[$warehouseData['id']] = ['quantity' => $warehouseData['quantity']];
        }

        $product->warehouse()->sync($syncData);

        // Devolver una respuesta JSON
        return response([
            'status' => 'success',
            'code' => 200,
            'message' => 'Warehouse relations updated successfully',
            'product' => $product,
        ]);
    }
}