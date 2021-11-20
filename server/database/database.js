import mongoose from 'mongoose';

const conectarBaseDatos = async () => {
    return await mongoose
        .connect(
        'mongodb+srv://admi:DigitalData@gestionproyectosdigital.rxf9s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    
    .then(() => {
      console.log('Conexion exitosa');
    })
    .catch((e) => {
      console.error('Error conectando a la bd', e);
    });
};

export default conectarBaseDatos;