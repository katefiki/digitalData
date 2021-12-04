import {gql} from 'apollo-server-express';

const tiposIncripcion = gql`
    type Inscripcion {
        _id: ID!
        estado: Enum_EstadoInscripcion!
        fechaIngreso: Date!
        fechaEgreso: Date!
        proyecto: String!
        estudiante : Usuario!
    }


    type Query{
        Inscripciones: [Inscripcion]
    }
    type mutacion{
        crearInscripcion(
            estado: Enum_EstadoInscripcion!
            proyecto: String!
            estudiante : Usuario!
        ); Inscripcion
        aprobarInscripcion(id: String!): Inscripcion
    }
`;

export {tiposIncripcion};
