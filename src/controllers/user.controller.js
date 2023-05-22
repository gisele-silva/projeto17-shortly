import { db } from "../database/database.connection.js";

export async function userMe (req, res){
    const user = res.locals.user

    try {
        const visitCount = await db.query(`SELECT SUM(shorts.visit) FROM shorts WHERE "userId" = $1;`, [user.rows[0].id]);
        const visitSum = visitCount.rows[0].sum;
        const url = await db.query(`SELECT * FROM shorts WHERE "userId" = $1;`, [user.rows[0].id]) 
        const shortenedUrls = url.rows.map((row) => {
            return {
                id: row.id,
                shortUrl: row.shortUrl,
                url: row.url,
                visitCount: row.visit
            }
        })

        res.send({
            id: user.rows[0].id,
            name: user.rows[0].name,
            visitCount: visitSum,
            shortenedUrls
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function ranking (req, res){
    
    try {
        const ranking = await db.query(`
        SELECT users.id, users.name, 
        COUNT(shorts.id) as "linksCount",
        COALESCE(SUM(shorts.visit), 0) as "visitCount"
        FROM users
        LEFT JOIN shorts ON shorts."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
        `)

        res.send(ranking.rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}