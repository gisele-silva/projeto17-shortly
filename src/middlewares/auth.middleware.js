import bcrypt from "bcrypt"

export async function signUpValidate(req, res, next){
    const {email} = req.body;

    try {
        const userExist = await db.query(`SELECT * FROM users WHERE users.email = $1;`, [email]);
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
        if (userExist === 0) return res.sendStatus(401)

        const comparePassword = bcrypt.compareSync(password, userExist.password)
        if (!comparePassword) return res.sendStatus(401)

        res.locals.userExist = userExist
        next()
    } catch (error) {
        return res.status(500).send(error.message)
    }
    
}