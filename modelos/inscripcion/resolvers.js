import { InscripcionModel } from './inscripcion.js';
import { ProyectModel } from '../proyecto/proyectos.js';
import { usuariosModel } from '../usuario/usuarios.js';

const resolverInscripciones = {
  Inscripcion: {
    proyecto: async (parent, args, context) => {
      return await ProyectModel.findOne({ _id: parent.proyecto });
    },
    estudiante: async (parent, args, context) => {
      return await usuariosModel.findOne({ _id: parent.estudiante });
    },
  },
  Query: {
    Inscripciones: async (parent, args, context) => {
      let filtro = {};
      if (context.userData) {
        if (context.userData.rol === 'LIDER') {
          const projects = await ProyectModel.find({ lider: context.userData._id });
          const projectList = projects.map((p) => p._id.toString());
          filtro = {
            proyecto: {
              $in: projectList,
            },
          };
        }
      }
      const inscripciones = await InscripcionModel.find({ ...filtro });
      return inscripciones;
    },

    // inscripcionesNoAprobadas: async () => {
    //   const ina = await InscripcionModel.find({ estado: 'PENDIENTE' }).populate('estudiante');
    // },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscripcionModel.create({
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return inscripcionCreada;
    },
    aprobarInscripcion: async (parent, args) => {
      const inscripcionAprobada = await InscripcionModel.findByIdAndUpdate(
        args.id,
        {
          estado: 'ACEPTADO',
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
  },
};

export { resolverInscripciones };