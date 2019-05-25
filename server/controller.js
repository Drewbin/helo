module.exports = {

    create_user : (req, res) => {
        const dbInstance = req.db;
        const { username, password } = req.body

        dbInstance.create_user([ username, password ]).then( () => {
            res.status(200).send('User registered')
        }).catch( err => {
            res.status(500).send('Failed to register user')
            console.error(err)
        })
    },



}