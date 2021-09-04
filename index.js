const { request, response } = require("express");
const express = require("express");
const {v4} = require("uuid");

const app = express();

app.use(express.json());

const usuarios = [];   // aqui onde ta armazenados todos os usuarios

// GET serve para listar dados 
app.get('/users', (request, response) => {
    return response.json(usuarios)
});

// POST serve para criar dados
app.post("/users", (request, response) => { 
    const{nome, sobrenome, sexo, data, contato} = request.body // aqui eu pego os dados do corpo da requisição "body"

    const usuario = {id: v4(),nome, sobrenome, sexo, data, contato} // aqui eu faço a criação de 1 usuario.

    usuarios.push[usuario]   // aqui eu armazeno o usuario dentro do vetor ou Banco de dados 

    return response.json(usuario)     // aqui eu retorno o usuario que estou criando.
})

app.listen(3333);
