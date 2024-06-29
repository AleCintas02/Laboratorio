<?php

namespace App\Http\Controllers;

use App\Models\Turno;
use Illuminate\Http\Request;

class TurnoController extends Controller
{
    public function store(Request $request)
    {
        // Validación de los datos recibidos del formulario
        $validatedData = $request->validate([
            'documento' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'telefono' => 'required|string|max:20',
            'provincia' => 'required|string|max:255',
            'localidad' => 'required|string|max:255',
            'calle' => 'nullable|string|max:255',
            'numero' => 'nullable|string|max:20',
            'sector' => 'nullable|string|max:255',
            'manzana' => 'nullable|string|max:255',
            'casa' => 'nullable|string|max:255',
            'barrio' => 'nullable|string|max:255',
            //'fechaNacimiento' => 'required|date',
            'sexo' => 'required|string|in:Masculino,Femenino,X',
            'email' => 'required|string|email|max:255',
            'estado' => 'required|string|in:entregado,pendiente', // Validación para el campo estado
        ]);

        // Crear un nuevo turno con los datos validados
        $turno = Turno::create($validatedData);

        // Puedes retornar una respuesta JSON o redireccionar a una página de éxito
        return response()->json(['message' => 'Turno creado correctamente', 'turno' => $turno], 201);
    }
}
