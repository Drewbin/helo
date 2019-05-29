module.exports = {

    register : (req, res) => {
        const db = req.db;
        const { username, password } = req.body

        db.register([ username, password ]).then( () => {
            res.status(200).send('User registered')
        }).catch( err => {
            res.status(500).send('Failed to register user')
            console.error(err)
        })
    },

    login : (req, res) => {
        const db = req.db;
        const { username, password } = req.body;

        db.login([ username, password ]).then( () => {
            res.status(200).send('Login successful');
        }).catch( err => {
            res.status(500).send('Login failed.');
            console.error(err);
        })
    },

    getAll : (req, res) => {
        const db = req.db;

        db.get_all().then(posts => {
            res.status(200).send(posts)
        }).catch(err => {
            res.status(500).send(err);
            console.error(err);
        })
    },

    create_post : (req, res) => {
        const db = req.db;
        const { title, image, content, }
    }

}