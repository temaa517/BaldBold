<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('excel_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('uploaded_file_id')->nullable()->constrained('uploaded_files')->nullOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->decimal('amount', 12, 2)->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('source_row')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->index('email');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('excel_records');
    }
};
