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

    usuarios.push(usuario)   // aqui eu armazeno o usuario dentro do vetor ou Banco de dados 

    return response.json(usuario)     // aqui eu retorno o usuario que estou criando.
})

app.put("/users/:id", (request, response) =>{
    const {id} = request.params  // aqui eurecebo o ID  do ususario
    const{nome, sobrenome, sexo, data, contato} = request.body // aqui eu manipulo as informações do usuario 


    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id)  
    // aqui eu valido se o usuario existe ou não
    // o findIndex percorre o vetor de array "usuarios"
    
    
    // caso não exista retornar a messagem "usuario não encontrado"
    if(usuarioIndex < 0) {
        return response.status(400).json({ message: "usuario não encontrado"})
    }

    // aqui eu pego todos os dados do usuario 
    const usuario = {
        id, nome, sobrenome, sexo, data, contato
    }

    // aqui eu substituo o usuario encontrado dentro do usuarioIndex e retorno a atualização que esta contida ...
    // dentro da variavel usuario e jogo dentro do meu vetor de array "usuarios"
    usuarios[usuarioIndex] = usuario
    return response.json(usuario)
})

app.delete("/users/:id", (request, response) => {
    const {id} = request.params

    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id)  
    
    if(usuarioIndex < 0) {
        return response.status(400).json({ message: "usuario não encontrado"})
    }

    usuarios.splice(usuarioIndex, 1) // aqui eu removo o usuario dentro do vetor utilizando splice

    return response.status(204).send()  // eu retorno a operação executada
})

app.listen(3333);
