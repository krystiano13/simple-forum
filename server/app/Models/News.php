<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    /**
     * Table name
     * @var string
    */
    protected $table = 'news';

    /**
     * Primary Key
     * @var string
    */
    protected $primaryKey = 'id';

    /**
     * Fillable
     * @var array<string>
    */
    protected $fillable = [
        'title',
        'content',
        'username'
    ];
}
