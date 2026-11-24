<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExcelRecord extends Model
{
    use HasFactory;

    protected $table = 'excel_records';

    protected $fillable = [
        'uploaded_file_id',
        'name',
        'email',
        'phone',
        'amount',
        'description',
        'source_row',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'source_row' => 'integer',
    ];

    public function uploadedFile()
    {
        return $this->belongsTo(UploadedFile::class);
    }
}
