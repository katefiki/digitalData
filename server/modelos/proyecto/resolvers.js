import {ProyectModel} from './proyectos.js';

const resolversProyecto = {
    Query: {
        Proyectos: async (parent, args, context) => {
            const proyectos = await ProyectModel.find();
            return proyectos;
        },
    },
    Mutation:{
        crearProyecto: async (parent, args, context) => {
                const proyectoCreado = await ProyectModel.create({
                nombre: args.nombre,
                estado: args.estado,
                fase: args.fase,
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

export {resolversProyecto};
