import Express from 'express';
import {usuariosModel} from './modelos/usuario/usuarios.js';
import {ProyectModel} from './modelos/proyecto/proyectos.js';
import {ObjetivosModel} from './modelos/objetivos.js';
import conectarBaseDatos from './database/database.js';
import {InscripcionModel} from './modelos/inscripcion/inscripcion.js';
import { ModeloAvance } from './modelos/avances/avances.js';


//import Cors from 'cors';
//import dotenv from 'dotenv';


const main = async () => {
await conectarBaseDatos(); 
//     await ModeloAvance.create({
//         fecha: new Date('2021/12/24'),
//         descripcion: 'Configuracion de herramientas',
//         observaciones: 'instalacion de tecnologia requeridas',
//         proyecto : 'proyecto1',
//         creadoPor : 'Alvaro Suarez',

//     })
//         .then((u) => {
//                 console.log('avance creado satisfactoriamente', u);
//             })
//             .catch((e) => {
//                 console.error('error al añadir avance', e);
//             }); 
    // await InscripcionModel.create({
    //     estado: 'ACEPTADO',
    //     fechaIngreso: new Date('2021/12/24'),
    //     fechaEgreso: new Date('2021/12/31'),
    //     proyecto : 'proyecto1',
    //     estudiante : 'Alvaro Suarez'

    // })
    //     .then((u) => {
    //             console.log('inscripcion creada satisfactoriamente', u);
    //         })
    //         .catch((e) => {
    //             console.error('error al crear la inscripcion', e);
    //         }); 
    // await ObjetivosModel.create({
    //     descripcion : 'Enseñar programacion a Colombianos',
    //     tipo : 'GENERAL',
    // })
    //     .then((u) => {
    //             console.log('objetivo creado satisfactoriamente', u);
    //         })
    //         .catch((e) => {
    //             console.error('error al crear el objetivo', e);
    //         }); 
  
    // await ProyectModel.create({
    //     nombre: 'Proyecto Mision TIC',
    // fechaInicio: new Date('2021/12/24'),
    // fechaFin: new Date('2022/12/24'),
    // presupuesto: 120000,
    // lider: 'Pedro Hernandez',
    // })
    // .then((u) => {
    //     console.log('usuario creado satisfactoriamente', u);
    // })
    // .catch((e) => {
    //     console.error('error al crear el usuario', e);
    // }); 
    // await usuariosModel.create({
    //     nombre: 'Pedro',
    //     apellido: 'Hernandez',
    //     identificacion: '32586987',
    //     email: 'phernandez@mail.com',
    //     rol : 'LIDER' ,
        
    // })
    // .then((u) => {
    //     console.log('usuario creado satisfactoriamente', u);
    // })
    // .catch((e) => {
    //     console.error('error al crear el usuario', e);
    // }); 
    //obtener un usuario  
    // await usuariosModel.findOne({identificacion :'1002547847' })
    // .then ((u) => {
    //     console.log ('usuario encontrado', u);
    // })
    // .catch((e) => {
    //     console.error('error al obtener el usuario', e);
    // });
    //obtener usuarios
    // await usuariosModel.find()
    //     .then((u) => {
    //         console.log('usuarios', u)
    //     })
    //     .catch((e) => {
    //         console.error('error al obtener los usuarios', e);
    //     });
    // editar un usuario
    // await usuariosModel.findOneAndUpdate (
    //     { email : 'egomez@mail.com' },
    //     {
    //         nombre : 'Pedro',
    //         apellido : 'Perez',
    //     }).then((u) => {
    //         console.log('usuario actualizado', u)
    //         })
    //     .catch((e) => {
    //         console.error('error al actualizar usuario', e);
    //             });
    //eliminar un usuario
//     await usuariosModel.findOneAndDelete({email : 'egomez@mail.com'})
//     .then((u) => {
//         console.log('usuario eliminado', u);
//     })
//     .catch((e) => {
//         console.error(e);
//     });
     };
 main();
