<?php

namespace App\Services;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;

class ActivityLogger
{
    public function log(
        string $action,
        string $subject,
        ?int $subjectId = null,
        ?array $before = null,
        ?array $after = null,
        ?string $description = null
    ): ActivityLog {
        $user = Auth::user();

        return ActivityLog::create([
            'user_id' => $user?->id,
            'user_name' => $user?->name ?? 'Гость',
            'action' => $action,
            'subject' => $subject,
            'subject_id' => $subjectId,
            'before' => $before,
            'after' => $after,
            'description' => $description,
        ]);
    }
}
