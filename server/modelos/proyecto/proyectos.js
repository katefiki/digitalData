import mongoose from 'mongoose';
// import { Enum_EstadoProyecto, Enum_FaseProyecto, Enum_TipoObjetivo } from '../enums/enums.js';
import { ObjetivosModel } from '../objetivos.js';
import { usuariosModel } from '../usuario/usuarios.js';
const { Schema, model } = mongoose;



const proyectSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    presupuesto: {
      type: Number,
      required: true,
    },
    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      enum: ['ACTIVO', 'INACTIVO'],
      default: 'INACTIVO',
    },
    fase: {
      type: String,
      enum: ['INICIADO', 'DESARROLLO', 'TERMINADO', 'NULO'],
      default: 'NULO',
    },
    lider: {
    type: Schema.Types.ObjectId,
      required: true,
      ref: usuariosModel,
    },
    objetivos: [
      {
        descripcion: {
          type: String,
          required: true,
        },
        tipo: {
          type: String,
          enum: ['GENERAL', 'ESPECIFICO'],
          required: true,
        },
      },
    ],
  },
  {
     toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
   }
);

 proyectSchema.virtual('avances', {
   ref: 'Avance',
   localField: '_id',
   foreignField: 'proyecto',
 });

 proyectSchema.virtual('inscripciones', {
  ref: 'Inscripcion',
  localField: '_id',
  foreignField: 'proyecto',
 });

const ProyectModel = model('Proyecto', proyectSchema);

export { ProyectModel };
