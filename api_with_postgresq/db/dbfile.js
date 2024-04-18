import pkg from "pg"

const {Client} = pkg;

export const client =  new Client({
    host : "localhost",
    user:"postgres",
    port:5432,
    password:'am30vi26',
    database:'testapi'
})

