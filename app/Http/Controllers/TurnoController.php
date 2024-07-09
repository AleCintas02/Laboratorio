<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Turno;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class TurnoController extends Controller
{
    public function index()
    {
        $turnos = Turno::all();
        return response()->json($turnos);
    }

    public function store(Request $request)
    {
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
            'fecha_turno' => 'nullable|date',
            'estado' => 'required|string|in:pendiente,programado,atendido,caducado,finalizado',
            'estado_resultado' => 'required|string|in:pendiente,entregado',
            'resultados' => 'nullable|string',
        ]);

        Log::debug('Datos validados:', $validatedData);

        $turno = Turno::create($validatedData);

        return response()->json(['message' => 'Turno creado correctamente', 'turno' => $turno], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'fecha_turno' => 'nullable|date',
            'estado' => 'required|string',
            'estado_resultado' => 'required|string',
        ]);

        $turno = Turno::findOrFail($id);

        $turno->fecha_turno = $request->input('fecha_turno');
        $turno->estado = $request->input('estado');
        $turno->estado_resultado = $request->input('estado_resultado');

        $turno->save();

        return response()->json($turno);
    }

    public function uploadResult(Request $request, $id)
    {
        $request->validate([
            'archivo_resultado' => 'required|file|mimes:pdf,txt,doc,docx|max:2048',
        ]);
    
        $turno = Turno::findOrFail($id);
    
        // Guardar el archivo en el sistema de almacenamiento
        $path = $request->file('archivo_resultado')->store('public/resultados');
    
        // Actualizar el campo 'resultados' del turno con la ruta del archivo
        $turno->resultados = $path;
        $turno->estado_resultado = 'entregado';
        $turno->estado = 'finalizado';
        $turno->save();
    
        return response()->json(['message' => 'Archivo subido y resultado actualizado', 'turno' => $turno]);
    }
    
    

    public function showResult($documento)
    {
        $turno = Turno::where('documento', $documento)->first();
    
        if (!$turno || !$turno->resultados) {
            return response()->json(['error' => 'No se encontró un resultado para el documento ingresado'], 404);
        }
    
        // Si estás guardando el archivo en 'public/resultados', 
        // la ruta en la base de datos debería ser algo como 'resultados/archivo.pdf'
        $url = Storage::url($turno->resultados);
    
        return response()->json(['resultado' => $url]);
    }
    
    
}
