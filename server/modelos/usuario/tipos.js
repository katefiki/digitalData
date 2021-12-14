import { gql } from 'apollo-server-express';

const tiposUsuario = gql`
  type Usuario {
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    email: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
    inscripciones: [Inscripcion]
    avancesCreados: [Avance]
    proyectosLiderados: [Proyecto]
  }
  input FiltroUsuarios {
    _id: ID
    identificacion: String
    email: String
    rol: Enum_Rol
    estado: Enum_EstadoUsuario
  }
  type Query {
    Usuarios: [Usuario]
    Usuario(_id: String!): Usuario
  }
  type Mutation {
    crearUsuario(
      nombre: String!
      apellido: String!
      identificacion: String!
      email: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
      password: String!
    ): Usuario
    editarUsuario(
      _id: String!
      nombre: String!
      apellido: String!
      identificacion: String!
      email: String!
      estado: Enum_EstadoUsuario!
    ): Usuario
    eliminarUsuario(_id: String, email: String): Usuario
  }
`;


export { tiposUsuario };