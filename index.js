const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json()); // manda o json para o body da requisição

const projects = [];

app.get('/projects', (request, response) => {
    // const { title, owner } = request.query;
    
    // console.log(title);
    // console.log(owner);

    return response.json(projects);
});

app.post('/projects', (request, response) =>{
    const { title, owner } = request.body;
    
    // console.log(title);
    // console.log(owner);

    const project = {id: uuidv4(), title, owner};

    projects.push(project); // esse push vai jogar a criação do nosso projeto para o nosso array

    return response.json(project); // sempre retornar o projeto recém criado e nunca exibir a lista completa
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params; // aqui pegamos nosso ID
    const { title, owner } = request.body; // retornando uma nova informação

    // aqui usamos o finfIndex para percorrer rodo o array atrás do id
    // findIndex vai percorrer todos os projetos, e toda vez que ele percorrer na vairável project
    // caso ela satisfeita e retornar true, ela vai me retornar o id que estou passando (project => project.id === id)
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Projeto não foi encontrado' });
    }

    // agora que tenho índice, vou criar uma nova informação do projeto
    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Projeto não foi encontrado' });
    }

    // splice pega o vetor e remove apenas o que foi passado
    projects.splice(projectIndex, 1); // 1 = número de posições que vai ser apagado

    return response.status(204).send();
    
});

app.listen(3333);