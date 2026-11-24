<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UploadedFile;
use App\Services\ActivityLogger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index(): JsonResponse
    {
        $files = UploadedFile::query()->orderByDesc('id')->limit(100)->get();

        return response()->json(['data' => $files]);
    }

    public function destroy(UploadedFile $uploadedFile, ActivityLogger $logger): JsonResponse
    {
        $before = $uploadedFile->toArray();

        if (Storage::disk($uploadedFile->disk)->exists($uploadedFile->path)) {
            Storage::disk($uploadedFile->disk)->delete($uploadedFile->path);
        }

        $uploadedFile->delete();

        $logger->log(
            'delete',
            'UploadedFile',
            $before['id'],
            $before,
            null,
            'Удалён файл «'.$uploadedFile->original_name.'»'
        );

        return response()->json(['message' => 'Файл удалён']);
    }
}
