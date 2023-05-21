import bcrypt from "bcrypt"
import { db } from "../database/database.connection.js"

export async function authValidation(req, res, next){
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token) return res.status(401).send("Token inexistente")
    
    try {
       
        const session = await db.query(`SELECT * FROM session WHERE token = $1`, [token])
        if (!session) return res.status(401).send("Token inválido")
        
        res.locals.session = session
        
        next()
    } catch (error) {
        return res.status(500).send(error.message) 
    }
}

export async function signUpValidate(req, res, next){
    
    const {email} = req.body;

    try {
        const userExist = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
  
        if (userExist.rowCount !== 0) return res.sendStatus(409);

        next()
    } catch (error) {
        return res.status(500).send(error.message)
    }
   
}

export async function signInValidate(req, res, next){
    
    const {email, password} = req.body

    try {
        const userExist = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (userExist.rowCount === 0) return res.status(401).send("user don't exist")
 
        const comparePassword = bcrypt.compareSync(password, userExist.rows[0].password)
        if (!comparePassword) return res.sendStatus(401)

        res.locals.userExist = userExist
        
        next();
        
    } catch (error) {
        return res.status(500).send("deu ero")
    }
    
}