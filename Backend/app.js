const express= require('express');
const morgan = require('morgan');
const path= require('path');
const mysql= require('mysql');
const cors = require('cors');
const myConnection= require('express-myconnection');
const app= express();

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "localhost:3000", 
                    credentials: true
                }
            ]
        }
}
};

app.use(cors(
    config.application.cors.server
  ));



// rutas backend
const ColoniaRoutes = require('./rutas/colonia');
const DireccionLugarRoutes = require('./rutas/direccionlugar');
const EmpresaRoutes = require('./rutas/empresa');
const PerfilEmpresaRoutes = require('./rutas/perfilempresa');
const PerfilUsuarioRoutes = require('./rutas/perfilusuario');
const PublicacionRoutes = require('./rutas/publicacion');
const PublicacionEmpresaRoutes = require('./rutas/publicacionempresa');
const ServicioRoutes = require('./rutas/servicio');
const UsuarioRoutes = require('./rutas/usuario');
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password:'CAFL1707',
    port:3306,
    database:'publicaciones'
}, 'single'));
app.use(express.urlencoded({extended: false}));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
//rutas frontend/apis
app.use('/api/colonia', ColoniaRoutes);
app.use('/api/direccionlugar', DireccionLugarRoutes);
app.use('/api/empresa', EmpresaRoutes);
app.use('/api/perfilempresa', PerfilEmpresaRoutes);
app.use('/api/perfilusuario', PerfilUsuarioRoutes);
app.use('/api/publicacion', PublicacionRoutes);
app.use('/api/publicacionempresa', PublicacionEmpresaRoutes);
app.use('/api/servicio', ServicioRoutes);
app.use('/api/usuario', UsuarioRoutes);

app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), () =>{
    console.log("PUERTO 3000");
});	
