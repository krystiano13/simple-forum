<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentsCount extends Model
{
    use HasFactory;

    /** 
    * Table name
    * @var string;
    */

    protected $table = 'comments_count';

    /** 
    * Primary key
    * @var string;
    */

    protected $primaryKey = 'id';

    /** 
    * Fillable
    * @var array;
    */


    protected $fillable = [
        'id',
        'username',
        'count'
    ];

    /** 
    * Hidden
    * @var array;
    */

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
