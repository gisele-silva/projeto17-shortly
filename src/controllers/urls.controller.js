import { nanoid } from "nanoid"
import { db } from "../database/database.connection.js"

export async function shortUrlPost (req, res){
    const { url } = req.body
    
    const user = res.locals.user
    const userId = user.rows[0].id
    
    const shortUrl = nanoid(8)

    try {
        const result = await db.query(
            `INSERT INTO shorts (url, "shortUrl", "userId") 
            VALUES ($1, $2, $3) 
            RETURNING id`, 
            [url, shortUrl, userId])
      
          res.status(201).send({ id: result.rows[0].id, shortUrl: shortUrl})
          
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function urlId (req, res){
    const { id } = req.params
    try {
        const url = await db.query(`SELECT * FROM shorts WHERE id = $1`, [id])
    
        if (url.rowCount === 0) return res.sendStatus(404)
        
        res.send({ id: url.rows[0].id, shortUrl: url.rows[0].shortUrl, url: url.rows[0].url})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function shortUrlGet (req, res){
    const { shortUrl } = req.params
    try {
        const url = await db.query(`SELECT * FROM shorts WHERE "shortUrl" = $1;`, [shortUrl])
        console.log(url.rowCount)
        if (url.rowCount === 0) return res.sendStatus(404)
    
        await db.query(`UPDATE shorts SET visit = visit + 1 WHERE id = $1`, [url.rows[0].id])
    
        return res.redirect(url.rows[0].url)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function urlDelete (req, res){
    const { id } = req.params
    const user = res.locals.user

    try {
        const resultId = await db.query(`SELECT * FROM shorts WHERE id = $1;`, [id])
        if (resultId.rowCount === 0) return res.sendStatus(404)
      
        if (resultId.rows[0].userId !== user.rows[0].id) return res.sendStatus(401)

        await db.query(`DELETE FROM shorts WHERE id = $1`, [id])

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}