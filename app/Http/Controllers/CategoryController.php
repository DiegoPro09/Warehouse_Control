<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function __construct(){
        $this->middleware('auth.check');
    }

    public function show(){
        $categories = Category::all();

        if($categories->isEmpty()){
            return response([
                'status' => 'success',
                'code' => 400,
                'message' => 'No data available',
            ]);
        }

        return response([
            'status' => 'success',
            'code' => 200,
            'categories' => $categories
        ]);
    }

    public function showById($id){
        $category = Category::where('id', $id)->first();

        if(!$category){
            return response([
                'status' => 'success',
                'code' => 400,
                'message' => 'No data available',
            ]);
        }

        return response([
            'status' => 'success',
            'code' => 200,
            'categories' => $category
        ]);
    }

    public function create(Request $request){
        $search = Category::where('name_category', $request->input('name_category'))->first();

        if(!$search) {
            $data = $request->validate([
                'name_category' => 'required|unique:categories,name_category|string|max:50'
            ]);

            $category = Category::create($data);

            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'Category created successfully',
                'category' => $category
            ]);
        }else{
            return response([
                'status' => 'error',
                'code' => 400,
                'message' => 'The category already exists'
            ]);
        }
    }

    public function update(Request $request, $id){
        $category = Category::find($id);

        if($category){
            $data = $request->validate([
                'name_category' => 'required|unique:categories,name_category|string|max:50'
            ]);

            $category->update($data);

            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'Category updated successfully',
                'category' => $data,
            ]);
        }

        return response([
            'status' => 'error',
            'code' => 404,
            'message' => 'Category not found',
        ]);
    }

    public function delete($id){
        $category = Category::find($id);

        if($category){
            $category->delete();

            return response([
                'status' => 'success',
                'code' => 200,
                'message' => 'Category deleted successfully'
            ]);
        }

        return response([
            'status' => 'error',
            'code' => 404,
            'message' => 'Category not found',
        ]);
    }
}
