<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Turno;
use Illuminate\Support\Facades\Log;  // Añadir esta línea para importar Log

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
            'sexo' => 'required|string|in:Masculino,Femenino,X',
            'email' => 'required|string|email|max:255',
            'fecha_nacimiento' => 'required|date',
            'estado' => 'required|string|in:pendiente,programado,atendido,caducado,finalizado',
            'estado_resultado' => 'required|string|in:pendiente,entregado',
            'resultados' => 'nullable|string',
            //'rol' => 'required|string|in:root,A,P',
        ]);

        // Agregar depuración
        Log::debug('Datos validados:', $validatedData);

        // Crear un nuevo turno con los datos validados
        $turno = Turno::create($validatedData);

        // Puedes retornar una respuesta JSON o redireccionar a una página de éxito
        return response()->json(['message' => 'Turno creado correctamente', 'turno' => $turno], 201);
    }
}
