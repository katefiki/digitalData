import mongoose from 'mongoose';
// import { Enum_EstadoInscripcion } from '../enum/enum.js';
import { ProyectModel } from '../proyecto/proyectos.js';
import { usuariosModel } from '../usuario/usuarios.js';

const { Schema, model } = mongoose;


const inscripcionSchema = new Schema({
  estado: {
    type: String,
    enum: ['ACEPTADO', 'RECHAZADO', 'PENDIENTE'],
    default: 'PENDIENTE',
    required: true,
  },
  fechaIngreso: {
    type: Date,
    required: false,
  },
  fechaEgreso: {
    type: Date,
    required: false,
  },
  proyecto: {
    
    type: Schema.Types.ObjectId,
    ref: ProyectModel,
    required: true,
  },
  estudiante: {
      
    type: Schema.Types.ObjectId,
    ref: usuariosModel,
    required: true,
  },
});

const InscripcionModel = model('Inscripcion', inscripcionSchema);

export { InscripcionModel };