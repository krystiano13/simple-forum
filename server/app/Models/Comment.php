<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    /**
     * Table name
     * @var string
    */
    protected $table = "comments";

    /**
     * Primary Key
     * @var string
    */
    protected $primaryKey = "id";

    /**
     * Fillable
     * @var array
    */
    protected $fillable = [
        'updated_at',
        'created_at',
        'username',
        'post_id',
        'content'
    ];
}
