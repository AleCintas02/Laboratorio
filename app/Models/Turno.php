<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;
    protected $table = 'turnos';
    protected $fillable = [
        'documento',
        'apellido',
        'nombre',
        'telefono',
        'provincia',
        'localidad',
        'calle',
        'numero',
        'sector',
        'manzana',
        'casa',
        'barrio',
        'email',
        'sexo',
        'fecha_nacimiento',
        'estado',
        'estado_resultado',
        'resultados',
    ];
}
