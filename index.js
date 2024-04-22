
const express =require('express');
const{Pool} = require('pg');



const app = express();
const PORT = 3000;

app.use(express.json());

// o nodemom faz o processo de matar e levantae o servidor automaticamente quando o arquivo é salvo
//iniciar o servidor

//conexao com o banco de dados

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'backbanco',
    password:'ds564',
    port: 5432,
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}🚀`);
});
// para iniciar o servidor é só digitar no terminal node index.js

app.get('/', (req, res) => {
    res.send('A rota esta funcionado!');
});

// criação dos métodos de CRUD 

//rota que obtem todos os usuários
app.get('/usuarios',async (req, res) => {
try{
    const resultado = await pool.query('SELECT * FROM usuarios');
    res.json({
        total:resultado.rowCount,
        usuarios:resultado.rows,
    });
}catch(error){
    console.error("erro ao obter os usuários", error);
    res.status(500).send("erro ao obter os usuários");
}
});


//rota que cria usuario
app.post('/', async (req, res) => {
    try{
        const {nome, email} = req.body;
        await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [nome, email]);
        res.status(201).send({message :"Usuário criado com sucesso"});
       
    }catch(error){
        console.error("Erro ao inserir novo usuário", error);
        res.status(500).send("Erro ao inserir novo usuário")
    }
});

//rota que obtem um usuario pelo id 
app.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if(resultado.rowCount == 0){
            return res.status(404).send({message: "ID não encontrado"});
        }
        res.status(201).send(resultado.rows);

    }catch(error){
        console.error("Erro ao obter o usuário pelo id", error);
        res.status(500).send("Erro ao obter o usuário  pelo id")
    }
});
//rota que deleta um usuario

app.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const picirili = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        if(picirili.rowCount == 0){
            return res.status(404).send({message: "Id não encontrado"});
        }
        res.status(201).send({message: "Usuário deletado com sucesso"});
    }catch(error){
        console.error("Erro ao deletar o usuário", error);
        res.status(500).send("Erro ao deletar o usuário");
    }
});
//rota que atualiza um usuario
app.put('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const {nome, email} = req.body;
        const teste = await pool.query('UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3', [nome, email, id]);
        if(teste.rowCount == 0){
            return res.status(404).send({message: "Usuário não encontrado"});
        }
        res.status(201).send({message: "Usuário atualizado com sucesso"});
    }catch(error){
        console.error("Erro ao atualizar o usuário", error);
        res.status(500).send("Erro ao atualizar o usuário");
    }
});