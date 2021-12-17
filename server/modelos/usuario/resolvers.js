import { usuariosModel } from './usuarios.js';
import bcrypt from 'bcrypt';
import { InscripcionModel } from '../inscripcion/inscripcion.js';

const resolversUsuario = {
      Usuario: {
      inscripciones: async (parent, args, context) => {
        return InscripcionModel.find({ estudiante: parent._id });
      },
    },
  Query: {
    Usuarios: async (parent, args, context) => {
      console.log(args);
      const usuarios = await usuariosModel.find({ ...args.filtro });
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await usuariosModel.findOne({ _id: args._id });
      return usuario;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await usuariosModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        email: args.email,
        rol: args.rol,
        //password: args.password,
        password: hashedPassword,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await usuariosModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          email: args.email,
          estado: args.estado,
        },
        { new: true }
      );

      return usuarioEditado;
    },
      editarPerfil: async (parent, args) => {
        const usuarioEditado = await usuariosModel.findOneAndUpdate(
          args._id,
          { ...args.campos },
          { new: true }
        );
        return usuarioEditado;
      },
    
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await usuariosModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('email')) {
        const usuarioEliminado = await usuariosModel.findOneAndDelete({ email: args.email });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };