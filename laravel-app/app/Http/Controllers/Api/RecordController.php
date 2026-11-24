<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExcelRecord;
use App\Services\ActivityLogger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = min(max((int) $request->input('per_page', 10), 1), 100);

        $query = ExcelRecord::query()->with('uploadedFile:id,original_name');

        if ($search = trim((string) $request->input('search', ''))) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $records = $query->orderByDesc('id')->paginate($perPage);

        return response()->json([
            'data' => $records->items(),
            'current_page' => $records->currentPage(),
            'last_page' => $records->lastPage(),
            'per_page' => $records->perPage(),
            'total' => $records->total(),
            'from' => $records->firstItem(),
            'to' => $records->lastItem(),
        ]);
    }

    public function store(Request $request, ActivityLogger $logger): JsonResponse
    {
        $data = $this->validateData($request);
        $data['created_by'] = auth()->id();

        $record = ExcelRecord::create($data);

        $logger->log(
            'create',
            'ExcelRecord',
            $record->id,
            null,
            $record->toArray(),
            'Создана запись «'.$record->name.'»'
        );

        return response()->json(['message' => 'Запись добавлена', 'record' => $record], 201);
    }

    public function show(ExcelRecord $record): JsonResponse
    {
        return response()->json(['record' => $record->load('uploadedFile:id,original_name')]);
    }

    public function update(Request $request, ExcelRecord $record, ActivityLogger $logger): JsonResponse
    {
        $before = $record->toArray();
        $data = $this->validateData($request);
        $data['updated_by'] = auth()->id();

        $record->update($data);
        $after = $record->fresh()->toArray();

        $logger->log('update', 'ExcelRecord', $record->id, $before, $after, 'Обновлена запись «'.$record->name.'»');

        return response()->json(['message' => 'Запись обновлена', 'record' => $record]);
    }

    public function destroy(ExcelRecord $record, ActivityLogger $logger): JsonResponse
    {
        $before = $record->toArray();
        $name = $record->name;
        $record->delete();

        $logger->log('delete', 'ExcelRecord', $before['id'], $before, null, 'Удалена запись «'.$name.'»');

        return response()->json(['message' => 'Запись удалена']);
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'amount' => ['nullable', 'numeric'],
            'description' => ['nullable', 'string', 'max:2000'],
        ], [
            'name.required' => 'Укажите имя.',
            'email.required' => 'Укажите email.',
            'email.email' => 'Введите корректный email.',
        ]);
    }
}
