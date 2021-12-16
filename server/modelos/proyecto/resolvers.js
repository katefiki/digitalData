import { InscripcionModel } from '../inscripcion/inscripcion.js';
import { usuariosModel } from '../usuario/usuarios.js';
import { ProyectModel } from './proyectos.js';

const resolversProyecto = {
  Proyecto: {
    lider: async (parent, args, context) => {
      const usr = await usuariosModel.findOne({
        _id: parent.lider.toString(),
      });
      return usr;
    },
    inscripciones: async (parent, args, context) => {
      const inscripciones = await InscripcionModel.find({
        proyecto: parent._id,
      });
      return inscripciones;
    },
  },
   Query: {
    Proyectos: async (parent, args, context) => {
      if (context.userData) {
        if (context.userData.rol === 'LIDER') {
          const proyectos = await ProyectModel.find({ lider: context.userData._id });
          return proyectos;
        } else if (context.userData.rol === 'LIDER') {
          // const proyectos = await ProyectModel.find({ lider: context.userData._id });
          // return proyectos;
        }
      }
      const proyectos = await ProyectModel.find();
      return proyectos;
    },
  },
  Mutation: {
    crearProyecto: async (parent, args, context) => {
      const proyectoCreado = await ProyectModel.create({
        nombre: args.nombre,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },
    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ProyectModel.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );

      return proyectoEditado;
    },
    crearObjetivo: async (parent, args) => {
      const proyectoConObjetivo = await ProyectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: { ...args.campos },
          },
        },
        { new: true }
      );

      return proyectoConObjetivo;
    },
    editarObjetivo: async (parent, args) => {
      const proyectoEditado = await ProyectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
    },
    eliminarObjetivo: async (parent, args) => {
      const proyectoObjetivo = await ProyectModel.findByIdAndUpdate(
        { _id: args.idProyecto },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return proyectoObjetivo;
    },
  },
};

export { resolversProyecto };



