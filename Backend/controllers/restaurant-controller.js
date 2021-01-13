const db = require('../config/sqlite');
//inicio do ficheiro
const jwt = require("jsonwebtoken");

//procurar os restaurantes
exports.getRestaurantes = (req, res) => {
    try {
        //Selecionar todos os restaurantes
        let sql = 'SELECT * FROM restaurante';

        db.all(sql, [], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(result);
            }

        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};

//procurar um restaurante por um id
exports.getRestaurante = (req, res) => {
    try {
        //procurar na tabela restaurante o id
        let sql = 'SELECT * FROM restaurante WHERE id_restaurante = ?';

        db.get(sql, [req.params.id_restaurante], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(result);
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};



//adicionar Restaurante
exports.adicionarRestaurante = (req, res) => {
    try {
        // req.body
        let id_restaurante = req.body.id_restaurante;
        let name = req.body.name;
        let image = req.body.image;
        let address = req.body.address;
        let phone = req.body.phone;
        let email = req.body.email;
        let city = req.body.city;
        let type_restaurante = req.body.type_restaurante;


        //Diferente de um tipo de restaurante
        if (type_restaurante != 'Hamburger' && type_restaurante != 'Pizaria' && type_restaurante != 'Chinês' && type_restaurante != 'Japonês' && type_restaurante != 'Rodizio') {
            res.status(406).send({
                message: 'Tipo de restaurante inválido ("Hamburger"/"Pizaria"/"Chinês"/"Japones"/"Rodizio")'
            });
            throw 'Tipo de restaurante inválido';
        }

        //se ele for diferente merchant dá erro, se nao executa
        if (type == 'merchant') {
            //verificar se restaurante já existe
            let sql = 'SELECT name FROM restaurante WHERE name = ?';
            db.get(sql, [name], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    if (result) {
                        res.status(409).send({ message: 'Restaurante já registado' });
                    }
                }

            });
        }
        var id_utilizador = req.params.id_utilizador;
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        //verificar o tipo de utilizador
        if (decoded.type != "merchant") {
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'Obter Informação da Empresa'
                }
            }
        } else {
            sql = 'INSERT INTO restaurante (name, image, address, phone, email,type_restaurante) VALUES (?,?,?,?,?,?)';
            db.run(sql, [name, image, address, phone, email, type_restaurante], (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(201).send({
                        message: 'Restaurante adicionado com sucesso',
                        user: {
                            name: name,
                            image: image,
                            address: address,
                            phone: phone,
                            email: email,
                            type_restaurante: type_restaurante
                        },
                    });
                }

            });
            //typeUser is incorrect
            res.status(401).json(response)
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};


//editar restaurante
exports.editarRestaurante = (req, res) => {
    try {
        // req.body
        let id_restaurante = req.body.id_restaurante;
        let name = req.body.name;
        let image = req.body.image;
        let address = req.body.address;
        let phone = req.body.phone;
        let email = req.body.email;

        //se ele for diferente merchant dá erro, se nao executa
        if (type == 'merchant') {
            //alterar restaurante
            let sql = 'UPDATE restaurante set name = ?, image = ?, address = ?, phone = ?, email = ? WHERE  id_restaurante = ?'
            db.get(sql, [name, image, address, phone, email, id_restaurante], (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send({ message: 'Restaurante editado com sucesso' });
                }
            });
        }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
    return;
};
//eliminar restaurante
exports.eliminarRestaurante = (req, res) => {
    try {
        //se ele for diferente merchant dá erro, se nao executa
        if (req.body.type != 'merchant') {
            //verificar se existe
            let sql = 'SELECT id_restaurante FROM restaurante WHERE id_restaurante = ?';
            db.get(sql, [id_restaurante], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    if (!result) {
                        res.status(409).send({ message: 'Restaurante não existe' });
                    }
                }
            });
        }
        //eliminar restaurante
        let sql1 = 'DELETE FROM restaurante WHERE id_restaurante = ?';
        db.get(sql1, [req.params.id_restaurante], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(result);
            }

        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};
