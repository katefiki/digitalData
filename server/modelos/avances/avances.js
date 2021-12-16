import mongoose from 'mongoose';
import { ProyectModel } from '../proyecto/proyectos.js';
import { usuariosModel } from '../usuario/usuarios.js';

const { Schema, model } = mongoose;


const avanceSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  
  descripcion: {
    type: String,
    required: true,
  },

  observaciones: [
    {
      type: String,
    },
  ],

  proyecto: {
 
    type: Schema.Types.ObjectId,
    ref: ProyectModel,
    required: true,
  },
  creadoPor: {
  
    type: Schema.Types.ObjectId,
    ref: usuariosModel,
    required: true,
  },
});

const ModeloAvance = model('Avance', avanceSchema);

export { ModeloAvance };