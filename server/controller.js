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

    getOne : (req, res) => {
        const db = req.db;

        db.get_one().then( post => {
            res.status(200).send(post)
        }).catch(err => {
            res.status(500).send(err);
            console.error(err);
        })
    },
    
    create : (req, res) => {
        const db = req.db;
        const { title, image, content, author_id } = req.body;

        db.create_post([ title, image, content, author_id ]).then( () => {
            res.status(200).seend('Post created');
        }).catch(err => {
            res.status(500).send('Post creation failed');
            console.error(err);
        })
    },

    edit : (req, res) => {
        const db = req.db;
        const { title, image, content, author_id } = req.body;
        const { id } = req.session;

        db.edit([ title, image, contenct, author_id ]).then( () => {
            res.status(200).send('Edit successful.')
        }).catch(err => {
            res.status(500).send('Edit failed.');
            console.error(err);
        })
    },

    delete : (req, res) => {
        const db = req.db;
        const { id } = req.params;

        db.delete([ id ]).then( () => {
            res.status(200).send('Delete successful')
        }).catch(err => {
            res.status(200).send('Delete failed.');
            console.error(err);
        })
    },

}