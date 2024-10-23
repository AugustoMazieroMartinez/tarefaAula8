const express = require('express');
const { randomUUID } = require("crypto")
const app = express();
const pessoas = [
    {id: 1, nome: "aaa", celular: "12345678"},
    {id: 2, nome: "bbb", celular: "12345678"},
    {id: 3, nome: "ccc", celular: "12345678"},
    {id: 4, nome: "ddd", celular: "12345678"},
    {id: 5, nome: "eee", celular: "12345678"},
]
app.use(express.json());

app.get("/", (request, response) => {
    return response.json("Rota Inválida");
})
app.get("/pessoas", (request, response) => {
    return response.json(pessoas);
})
app.post("/pessoas", (request, response) => {
    const { nome, celular } = request.body;
    console.log(request.body);
    const person = {
        nome: nome,
        celular: celular,
        id: randomUUID()
    }
    pessoas.push(person);
    return response.json(pessoas);
})
app.put("/pessoas/:id", (request, response) => {
    const { id } = request.params;
    const { nome, celular } = request.body;

    const pessoaIndex = pessoas.findIndex(p => p.id === parseInt(id));

    // Verifica se a pessoa foi encontrada
    if (pessoaIndex !== -1) {
        // Cria o novo objeto com os dados atualizados
        const person = {
            id: parseInt(id),
            nome: nome || pessoas[pessoaIndex].nome, // Mantém o nome antigo se não for fornecido
            celular: celular || pessoas[pessoaIndex].celular // Mantém o celular antigo se não for fornecido
        };

        // Atualiza o array de pessoas com o novo objeto
        pessoas[pessoaIndex] = person;
    }
    return response.json(pessoas);
})

app.delete("/pessoas/:id", (request, response) => {
    const {id} = request.params;
    const pessoaIndex = pessoas.findIndex(p => p.id === parseInt(id));
    pessoas.splice(pessoaIndex, 1);
    return response.json(pessoas);
})
app.listen(3000, () => console.log("Servidor rodando na porta 3000")) 