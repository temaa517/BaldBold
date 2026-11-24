<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadedFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'original_name',
        'stored_name',
        'extension',
        'mime_type',
        'size',
        'disk',
        'path',
        'rows_count',
        'uploaded_by',
    ];

    public function records()
    {
        return $this->hasMany(ExcelRecord::class);
    }
}
