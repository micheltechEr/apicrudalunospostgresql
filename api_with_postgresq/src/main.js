import express from 'express'
import {client} from '../db/dbfile.js'

export const app = express()

client.connect()

app.use(express.json())


app.get('/alunos',(req,res)=>{
client.query('SELECT * FROM alunos',(err,result)=>{
    if(!err){
        res.status(200).send(result.rows)
        }
        else{
            res.send(404).send('Erro durante a busca,não encontramos alunos')
        }
    })
})

app.post('/alunos',(req,res)=>{
    const student = req.body
    const newStudantID = Math.floor(Math.random()*100)
    let queryInsertCommand = `INSERT INTO alunos (id_aluno,nome,idade) VALUES(${newStudantID},'${student.nome}',${student.idade})`
    client.query(queryInsertCommand,(err,result)=>{
        if(!err){
            res.status(200).send('Inserido com sucesso')
        }
        else{
            res.status(409).send('Erro durante a inserção,favor verificar os dados inseridos')
        }
    })
})