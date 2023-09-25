<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * Table name
     * @var string
    */
    protected $table = "posts";

    /**
     * Primary Key
     * @var int
     */
    protected $primaryKey = "id";

    /**
     * Fillable
     * @var array
     */
    protected $fillable = [
        'created_at',
        'updated_at',
        'username',
        'title',
        'content'
    ];

    /**
     * Hidden
     * @var array
     */
    protected $hidden = [
        'updated_at',
    ];
}
