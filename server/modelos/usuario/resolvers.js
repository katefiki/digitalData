import { usuariosModel } from './usuarios.js';
//import bcrypt from 'bcrypt';

const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args, context) => {
      const usuarios = await usuariosModel.find().populate([
        {
          path: 'inscripciones',
          populate: {
            path: 'proyecto',
            populate: [{ path: 'lider' }, { path: 'avances' }],
          },
        },
        {
          path: 'proyectosLiderados',
        },
      ]);
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await usuariosModel.findOne({ _id: args._id });
      return usuario;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      //const salt = await bcrypt.genSalt(10);
      //const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await usuariosModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        email: args.email,
        rol: args.rol,
        password: args.password,
        //password: hashedPassword,
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
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await usuariosModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await usuariosModel.findOneAndDelete({ email: args.email });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };