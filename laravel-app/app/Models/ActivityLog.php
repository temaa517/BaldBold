<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    protected $table = 'activity_logs';

    protected $fillable = [
        'user_id',
        'user_name',
        'action',
        'subject',
        'subject_id',
        'before',
        'after',
        'description',
    ];

    protected $casts = [
        'before' => 'array',
        'after' => 'array',
    ];
}
