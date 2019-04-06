module.exports = {

    create_user : (req, res) => {
        const dbInstance = req.db;
        const { user_id, username, profile_pic } = req.body

        dbInstance.create_user([ user_id, username, profile_pic ]).then( () => {
            res.status(200).send('User registered')
        }).catch( err => {
            res.status(500).send('Failed to register user')
            console.error(err)
        })
    },



}