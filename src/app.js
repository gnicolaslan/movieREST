const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

const {actorsRouter, genresRouter, moviesRouter} = require('./v1/routes')

app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/genres',genresRouter);
app.use('/api/v1/movies',moviesRouter);


//Activando el servidor desde express
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
