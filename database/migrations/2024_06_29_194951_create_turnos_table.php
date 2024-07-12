<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('turnos', function (Blueprint $table) {
            $table->id();
            $table->string('documento');
            $table->string('apellido');
            $table->string('nombre');
            $table->string('telefono');
            $table->string('provincia');
            $table->string('localidad');
            $table->string('calle')->nullable();
            $table->string('numero')->nullable();
            $table->string('sector')->nullable();
            $table->string('manzana')->nullable();
            $table->string('casa')->nullable();
            $table->string('barrio')->nullable();
            $table->string('email');
            $table->string('sexo');
            $table->date('fecha_nacimiento');
            $table->string('fecha_turno')->nullable();
            $table->enum('estado', ['pendiente', 'programado', 'atendido', 'caducado', 'finalizado'])->default('pendiente');
            $table->enum('estado_resultado', ['pendiente', 'entregado'])->default('pendiente');
            $table->string('resultados')->nullable();
            //$table->enum('rol', ['root', 'A', 'P'])->default('P');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turnos');
    }
};
