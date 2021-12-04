import {gql} from 'apollo-server-express';

const tiposProyecto = gql`
	scalar Date

    input crearObjetivo {
        descripcion: String!
        tipo: Enum_TipoObjetivo!
    }

    input camposObjetivo {
        descripcion: String!
        tipo: Enum_TipoObjetivo!
    }

    input camposProyecto {
        nombre: String
        presupuesto: Float
        fechaInicio: Date
        fechaFin: Date
        estado: Enum_EstadoProyecto
        fase: Enum_FaseProyecto
        lider: String
    }

    type Objetivo{
        _id: ID!
        descripcion: String!
        tipo: Enum_TipoObjetivo!
    }

    type Proyecto{
        _id: ID!
        nombre: String!
        presupuesto: Float!
        fechaInicio: Date!
        fechaFin: Date!
        estado: Enum_EstadoProyecto!
        fase: Enum_FaseProyecto!
        lider: String!
        objetivos: [Objetivo]
    }

    type Query {
        Proyectos: [Proyecto]
    }

    type Mutation {
      crearProyecto(
        nombre: String!
        presupuesto: Float!
        fechaInicio: Date!
        fechaFin: Date!
        estado: Enum_EstadoProyecto!
        fase: Enum_FaseProyecto!
        lider: String!
        objetivos: [crearObjetivo]
      ): Proyecto
    editarProyecto(_id: String!, campos: camposProyecto!): Proyecto
    crearObjetivo(idProyecto: String!, campos: camposObjetivo!): Proyecto
    editarObjetivo(idProyecto: String!, indexObjetivo: Int!, campos: camposObjetivo!): Proyecto
    eliminarObjetivo(idProyecto: String!, idObjetivo: String!): Proyecto
    }
`;

// Verificar Linea 40 --->  lider: Usuario!, Actualmente lider: String!

export {tiposProyecto};
