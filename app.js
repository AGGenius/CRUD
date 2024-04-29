const express = require('express');
const app = express();

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h1>Lista de personajes</h1>
        <ul>
            ${usuarios.map((usuario) => `<li>ID: ${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | Origen: ${usuario.lugarProcedencia}</li>`).join('')}
        </ul>
    `)
});

//Read
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
})

//Create
app.post('/usuarios', (req, res) => {
    const nuevoPersonaje = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    }

    usuarios.push(nuevoPersonaje);
    res.status(201).json(nuevoPersonaje);
})

//Read
app.get('/usuarios/:nombre', (req, res) => {
    res.send(usuarios.find((nombre) => nombre = req.params['nombre']));
})

//Update
app.put('/usuarios/:nombre', (req, res) => {
    usuarioAModificar = usuarios.findIndex((usuario) => usuario.nombre.toLocaleLowerCase() === req.params['nombre'].toLocaleLowerCase());
    
    usuarios[usuarioAModificar] = {
        id: usuarioAModificar + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    }

    res.status(200).json(usuarios);
})

//Delete
app.delete('/usuarios/:nombre', (req, res) => {
    usuarios = usuarios.filter((usuario) => usuario.nombre.toLocaleLowerCase() != req.params['nombre'].toLocaleLowerCase());
    res.status(200).json(usuarios);
})

app.listen(3000, () => {
    console.log('Express está ejecutandose en http://localhost:3000');
})