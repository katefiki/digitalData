import { inscripcionModel } from '../inscripcion'

const resolverInscripciones ={

    Query:{
        Usuarios: async (parent,args)=>{
            const inscripciones = await inscripcionModel.find();
            return inscripciones;
        },
    },
    mutation:{
        crearInscripcion: async (parent, args) =>{
            const inscripcionCreada = await inscripcionModel.create({
                estado: args.estado,
                proyecto: args.proyecto,
                estudiante: args.estudiante,
            });
            return inscripcionCreada;
        },
        aprobarInscricion: async (parent,args)=>{
            const inscripcionAprobada = await inscripcionModel.findByIdAndUpdate(
                args.id,
                {
                  estado: 'ACEPTADO',
                  fechaIngreso: Date.now()
                },
            );
            return inscripcionAprobada;
        },
    },
};
export {resolverInscripciones};
