<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TurnoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/solicitar-turno', function () {
    return Inertia::render('FormularioPaciente');
});

Route::get('/descargar-resultados', function () {
    return Inertia::render('Resultados');
});
Route::get('/consultar-turno', function () {
    return Inertia::render('ConsultarTurno');
});
Route::get('/turno-solicitado-con-exito', function () {
    return Inertia::render('TurnoSolicitado');
});



Route::middleware(['auth', 'rol:root'])->group(function () {
    Route::get('register-admin', [AdminController::class, 'create'])
        ->name('register-admin');

    Route::post('register-admin', [AdminController::class, 'store']);
    Route::get('/turnos', [TurnoController::class, 'index']);
    Route::put('/turnos/{id}', [TurnoController::class, 'update']);
    Route::post('/turnos/{id}/upload-result', [TurnoController::class, 'uploadResult']);
    Route::get('/resultados/{documento}', [TurnoController::class, 'showResult']);
    Route::post('/turnos/{id}/upload-result', [TurnoController::class, 'uploadResult']);

});



Route::prefix('api')->group(function () {
    Route::post('/turnos', [TurnoController::class, 'store']);
    Route::get('/buscar-turno/{documento}', [TurnoController::class, 'buscarTurno']);
    
});





Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
