import mongoose from 'mongoose';
import { ProyectModel } from '../proyecto/proyectos.js';
import { usuariosModel } from '../usuario/usuarios.js';

const { Schema, model } = mongoose;

// interface Avance {
//   fecha: Date;
//   descripcion: string;
//   observaciones: [string];
//   proyecto: Schema.Types.ObjectId;
//   creadoPor: Schema.Types.ObjectId;
// }

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
    type : String,
    //type: Schema.Types.ObjectId,
    //ref: ProyectModel,
    required: true,
  },
  creadoPor: {
    type : String,
   // type: Schema.Types.ObjectId,
    //ref: usuariosModel,
    required: true,
  },
});

const ModeloAvance = model('Avance', avanceSchema);

export { ModeloAvance };