<?php

use App\Jobs\UpdateTurnoStatusJob;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Log;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Schedule::call(function () {
    // Consulta para cambiar el estado de los turnos caducados
    DB::table('turnos')
        ->where('estado', 'programado')
        ->whereDate('fecha_turno', '<', now())
        ->update(['estado' => 'caducado']);
})->daily();