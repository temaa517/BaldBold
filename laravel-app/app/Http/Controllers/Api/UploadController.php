<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExcelRecord;
use App\Models\UploadedFile;
use App\Services\ActivityLogger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    private const ALLOWED_EXTENSIONS = ['xlsx', 'xls', 'xlsm', 'xlsb', 'csv', 'ods'];

    public function store(Request $request, ActivityLogger $logger): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'max:20480'],
        ], [
            'file.required' => 'Выберите файл Excel для загрузки.',
            'file.file' => 'Загружаемое значение должно быть файлом.',
            'file.max' => 'Максимальный размер файла — 20 МБ.',
        ]);

        $rawRows = $request->input('rows');

        if (is_string($rawRows)) {
            $decoded = json_decode($rawRows, true);
            $rawRows = is_array($decoded) ? $decoded : null;
        }

        if (! is_array($rawRows) || count($rawRows) === 0) {
            return response()->json([
                'message' => 'Не удалось прочитать строки из файла.',
                'errors' => ['rows' => ['Файл не содержит пригодных для импорта строк.']],
            ], 422);
        }

        Validator::make(['rows' => $rawRows], [
            'rows' => ['required', 'array', 'min:1'],
            'rows.*.name' => ['required', 'string', 'max:255'],
            'rows.*.email' => ['required', 'email', 'max:255'],
            'rows.*.phone' => ['nullable', 'string', 'max:50'],
            'rows.*.amount' => ['nullable', 'numeric'],
            'rows.*.description' => ['nullable', 'string', 'max:2000'],
            'rows.*.source_row' => ['nullable', 'integer'],
        ])->validate();

        $file = $request->file('file');
        $extension = strtolower($file->getClientOriginalExtension());

        if (! in_array($extension, self::ALLOWED_EXTENSIONS, true)) {
            return response()->json([
                'message' => 'Неподдерживаемый формат файла. Допустимые форматы: '.implode(', ', self::ALLOWED_EXTENSIONS).'.',
                'errors' => ['file' => ['Допустимые форматы: '.implode(', ', self::ALLOWED_EXTENSIONS).'.']],
            ], 422);
        }

        $rows = $rawRows;

        $uploaded = DB::transaction(function () use ($file, $extension, $rows, $logger) {
            $storedName = Str::random(40).'.'.$extension;
            $path = 'uploads/'.$storedName;

            Storage::disk('local')->put($path, file_get_contents($file->getRealPath()));

            $uploaded = UploadedFile::create([
                'original_name' => $file->getClientOriginalName(),
                'stored_name' => $storedName,
                'extension' => $extension,
                'mime_type' => $file->getClientMimeType(),
                'size' => $file->getSize(),
                'disk' => 'local',
                'path' => $path,
                'rows_count' => count($rows),
                'uploaded_by' => auth()->id(),
            ]);

            foreach ($rows as $row) {
                ExcelRecord::create([
                    'uploaded_file_id' => $uploaded->id,
                    'name' => $row['name'],
                    'email' => $row['email'],
                    'phone' => $row['phone'] ?? null,
                    'amount' => isset($row['amount']) && $row['amount'] !== '' ? $row['amount'] : null,
                    'description' => $row['description'] ?? null,
                    'source_row' => $row['source_row'] ?? null,
                    'created_by' => auth()->id(),
                ]);
            }

            $logger->log(
                'upload',
                'UploadedFile',
                $uploaded->id,
                null,
                $uploaded->toArray(),
                'Загружен файл «'.$uploaded->original_name.'», строк: '.count($rows)
            );

            return $uploaded;
        });

        return response()->json([
            'message' => 'Файл загружен и данные сохранены',
            'file' => $uploaded,
            'rows_imported' => count($rows),
        ], 201);
    }
}
