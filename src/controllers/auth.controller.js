import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signUp (req, res){
    const {name, email, password} = req.body
    
    try {

        const hash = bcrypt.hashSync(password, 10)
   
        await db.query(`INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3);`, [name, email, hash])

        return res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function signIn (req, res){
    
    const user = res.locals.userExist
    
    try {
        const token = uuid()
        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [user.rows[0].id, token]);

        res.status(200).send({token})
    } catch (error) {
        return res.status(500).send(error.message)
    }

}


