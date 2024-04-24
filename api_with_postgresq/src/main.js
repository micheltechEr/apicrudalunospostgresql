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
    let student = req.body
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

app.put('/alunos/:id',(req,res)=>{
    const {nome,idade} = req.body
    let student_id = req.params.id
    let queryUpdateCommand = `UPDATE alunos SET nome = $1,idade = $2 WHERE id_aluno =  $3`

    client.query(queryUpdateCommand,[nome,idade,student_id],(err,result)=>{
        if(!err){
            res.status(200).send('Atualizado com sucesso')
        }
        else{
            res.status(400).send(err.message)
        }
    })
})

app.delete('/alunos/:id',(req,res)=>{
    let student_id = req.params.id
    let queryDeleteCommand = `DELETE FROM alunos WHERE id_aluno =  $1`

    client.query(queryDeleteCommand,[student_id],(err,result)=>{
        if(!err){
            res.status(200).send('Removido com sucesso')
        }
        else{
            res.status(400).send(err.message)
        }
    })
})