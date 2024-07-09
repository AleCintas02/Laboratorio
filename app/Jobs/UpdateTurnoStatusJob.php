<?php

namespace App\Jobs;

use App\Models\Turno;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateTurnoStatusJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        //
    }

    public function handle()
    {
        $now = Carbon::now();

        Turno::where('estado', 'programado')
            ->where('fecha_turno', '<', $now)
            ->update(['estado' => 'caducado']);
        }
        public function schedule()
        {
            return Carbon::now()->addDay(); 
        }

}
