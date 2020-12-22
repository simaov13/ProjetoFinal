const db = require('../config/sqlite');

//procurar os restaurantes
exports.getRestaurantes = (req, res) => {
    try {
<<<<<<< Updated upstream
        //Selecionar todos os restaurantes
        let sql = 'SELECT * FROM restaurante';
=======
        let sql = 'SELECT * FROM restaurante';

>>>>>>> Stashed changes
        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//procurar um restaurante por um id
exports.getRestaurante = (req, res) => {
    try {
<<<<<<< Updated upstream
        //procurar na tabela restaurante o id
        let sql = 'SELECT * FROM restaurante WHERE id_restaurante = ?';
=======
        let sql = 'SELECT * FROM restaurante WHERE id_restaurante = ?';

>>>>>>> Stashed changes
        db.get(sql, [req.params.id_restaurante], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};



//adicionar Restaurante
exports.adicionarRestaurante = (req, res) => {
    try {
        // req.body
        let id_restaurante = req.body.id_restaurante;
        let name = req.body.name;
        let image = req.body.image;
        let location = req.body.location;
        let phone = req.body.phone;
        let email = req.body.email;
<<<<<<< Updated upstream


        //se ele for diferente merchant dá erro, se nao executa
        if (req.body.type != 'merchant') return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant")' });
        //verificar se restaurante já existe
        let sql = 'SELECT name FROM restaurante WHERE name = ?';
        db.get(sql, [name], (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (result) return res.status(409).send({ message: 'Restaurante já registado' });
        });
=======
    
        //se ele for diferente merchant dá erro, se nao executa
        if (req.body.type != 'merchant')  return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant")' });
>>>>>>> Stashed changes
        // criar restaurante
        sql = 'INSERT INTO restaurante (id_restaurante, name, image, location, phone, email) VALUES (?,?,?,?,?,?)';
        db.run(sql, [id_restaurante, name, image, location, phone, email], (err) => {
            if (err) return res.status(500).send(err.message);
<<<<<<< Updated upstream
=======
    
>>>>>>> Stashed changes
            return res.status(201).send({
                message: 'Restaurante adicionado com sucesso',
                user: {
                    id_restaurante: id_restaurante,
                    name: name,
<<<<<<< Updated upstream
                    image: image,
=======
                    image: image,  
>>>>>>> Stashed changes
                    location: location,
                    phone: phone,
                    email: email,
                },
            });
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
<<<<<<< Updated upstream
};


//editar restaurante
exports.editarRestaurante = (req, res) => {
    try {
        //se ele for diferente merchant dá erro, se nao executa
        if (req.body.type != 'merchant') return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant")' });
        //alterar restaurante
        let sql = 'UPDATE restaurante set name = ?, image = ?, location = ?, phone = ?, email = ? WHERE  id_restaurante = ?'
        db.get(sql, [name, image, location, phone, email], (err, result) => {
            if (err) return res.status(500).send(err.message);
            return res.json(result).send({ message: 'Restaurante editado com sucesso' });

        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//eliminar restaurante
exports.eliminarRestaurante = (req, res) => {
    try {
        //se ele for diferente merchant dá erro, se nao executa
        if (req.body.type != 'merchant') return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant")' });
        //verificar se existe
        let sql = 'SELECT id_restaurante FROM restaurante WHERE id_restaurante = ?';
        db.get(sql, [id_restaurante], (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (!result) return res.status(409).send({ message: 'Restaurante não existe' });
        });
        //eliminar restaurante
        let sql1 = 'DELETE * FROM restaurante WHERE id = ?';
        db.get(sql, [req.params.id_restaurante], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


=======
    };
    
    
    //editar restaurante
    exports.editarRestaurante = (req, res) => {
        try {
            //se ele for diferente merchant dá erro, se nao executa
            if (req.body.type != 'merchant') return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant")' }); 
            //alterar restaurante
            let sql = 'UPDATE restaurante set name = ?, image = ?, location = ?, phone = ?, email = ? WHERE  id_restaurante = ?'
            db.get(sql, [name, image, location, phone, email], (err, result) => {
                if (err) return res.status(500).send(err.message);
                return res.json(result).send({ message: 'Restaurante editado com sucesso' });
    
            });
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };
    
    //eliminar restaurante
    exports.eliminarRestaurante = (req, res) => {
        try {
            //se ele for diferente merchant dá erro, se nao executa
            if (req.body.type != 'merchant')  return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant")' });
            //eliminar restaurante
            let sql = 'DELETE * FROM restaurante WHERE id_restaurante = ?';
            db.get(sql, [req.params.id_restaurante], (err, result) => {
                if (err) return res.status(500).send(err.message);
    
                return res.json(result);
            });
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };
>>>>>>> Stashed changes