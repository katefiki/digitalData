import { usuariosModel } from '../../modelos/usuario/usuarios.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/tokenUtils.js';

const resolversAutenticacion = {
  Mutation: {
    registro: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await usuariosModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        email: args.email,
        rol: args.rol,
        password: hashedPassword,
      });
      console.log('usuario creado', usuarioCreado);
      return {
        token: generateToken({
          _id: usuarioCreado._id,
          nombre: usuarioCreado.nombre,
          apellido: usuarioCreado.apellido,
          identificacion: usuarioCreado.identificacion,
          email: usuarioCreado.email,
          rol: usuarioCreado.rol,
        }),
      };
    },

    login: async (parent, args) => {
      const usuarioEncontrado = await usuariosModel.findOne({ email: args.email });
      if (await bcrypt.compare(args.password, usuarioEncontrado.password)) {
        return {
          token: generateToken({
            _id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            apellido: usuarioEncontrado.apellido,
            identificacion: usuarioEncontrado.identificacion,
            email: usuarioEncontrado.email,
            rol: usuarioEncontrado.rol,
            foto: usuarioEncontrado.foto,
          }),
        };   
      }         
    },

    refreshToken: async (parent, args, context) => {
      console.log('contexto', context);
      if (!context.userData) {
        return {
          error: 'token no valido',
        };
      } else {
        return {
          token: generateToken({
            _id: context.userData._id,
            nombre: context.userData.nombre,
            apellido: context.userData.apellido,
            identificacion: context.userData.identificacion,
            email: context.userData.email,
            rol: context.userData.rol,
            foto: context.userData.foto,
          }),
        };
      }
      // valdiar que el contexto tenga info del usuario. si si, refrescar el token
      // si no devolver null para que en el front redirija al login.
    },
  },
};

export { resolversAutenticacion };