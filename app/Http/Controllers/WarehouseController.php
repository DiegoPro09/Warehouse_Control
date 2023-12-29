<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Warehouse;

class WarehouseController extends Controller
{
    public function __construct(){
        $this->middleware('auth.check');
    }

    public function show(){
        $warehouses = Warehouse::all();

        if($warehouses->isEmpty()){
            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'No data available',
            ]);
        }

        return response([
            'status' => 'success',
            'code' => 200,
            'warehouses' => $warehouses
        ]);
    }

    public function showById($id){
        $warehouse = Warehouse::where('id', $id)->first();

        if(!$warehouse){
            return response([
                'status' => 'success',
                'code' => 400,
                'message' => 'No data available',
            ]);
        }

        return response([
            'status' => 'success',
            'code' => 200,
            'warehouse' => $warehouse
        ]);
    }

    public function showProductsInWarehouse($id){
        // Lóistar los productos relacionados con un almacén
        $warehouse = Warehouse::with('products')->find($id);

        if (!$warehouse) {
            return response([
                'status' => 'error',
                'code' => 404,
                'message' => 'Warehouse not found',
            ]);
        }

        return response([
            'status' => 'success',
            'code' => 200,
            'warehouse' => $warehouse,
        ]);
    }

    public function create(Request $request){
        $search = Warehouse::where('name_warehouse', $request->input('name_warehouse'))->first();

        if(!$search) {
            $data = $request->validate([
                'name_warehouse' => 'required|unique:warehouses,name_warehouse|max:50',
                'description' => 'nullable|max:150'
            ]);

            $warehouse = Warehouse::create($data);

            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'Warehouse created successfully',
                'warehouse' => $warehouse
            ]);
        }else{
            return response([
                'status' => 'error',
                'code' => 400,
                'message' => 'The warehouse already exists'
            ]);
        }
    }

    public function update(Request $request, $id){
        $warehouse = Warehouse::find($id);

        if($warehouse){
            $data = $request->validate([
                'name_warehouse' => 'required|string|max:50',
                'description' => 'nullable|max:150'
            ]);

            $warehouse->update($data);

            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'Warehouse updated successfully',
                'warehouse' => $data,
            ]);
        }

        return response([
            'status' => 'error',
            'code' => 404,
            'message' => 'Warehouse not found',
        ]);
    }

    public function delete($id){
        $warehouse = Warehouse::find($id);

        if($warehouse){
            //Eliminar la relacion con productos
            $warehouse->products()->detach();
            $warehouse->delete();

            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'Warehouse deleted successfully'
            ]);
        }

        return response([
            'status' => 'error',
            'code' => 404,
            'message' => 'Warehouse not found',
        ]);
    }
}
