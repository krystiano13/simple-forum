<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    use HasFactory;

    /** 
     * Primary Key
     * @var string
    */
    protected $primaryKey = 'id';

    /** 
     * Table Name
     * @var string
    */
    protected $table = 'personal_access_tokens';

    /** 
     * Fillable
     * @var array
    */
    protected $fillable = [
        'name',
        'token',
        'tokenable_type'
    ];
}
