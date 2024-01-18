const connection = require('../../connection/config/database')
const crypto = require('crypto');


const usersModel = {
    createUsers: async (req, res) => {
        const { name, email, password, role, pic } = req.body;

        // Delete user by email
        const deleteQuery = 'DELETE FROM users_information WHERE email = ?';
        connection.query(deleteQuery, [email], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error deleting user' });
            }

            // Hash the password using SHA-1
            const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

            // Insert the user into the database
            const insertQuery = 'INSERT INTO users_information (name, email, password, role, pic) VALUES (?, ?, ?, ?, ?)';
            const values = [name, email, hashedPassword, role, pic];

            connection.query(insertQuery, values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'User creation failed' });
                } else {
                    const message = result.affectedRows > 0 ? 'User updated successfully' : 'User created successfully';
                    return res.status(200).json({ message });
                }
            });
        });
    },

    getUsers: async (req, res) => {
        try {
            const data = "select * from users_information  order by id asc";

            connection.query(data, function (error, result) {
                console.log(result)
                if (!error) {
                    res.send(result)
                }

                else {
                    console.log(error)
                }

            })
        }
        catch (error) {
            console.log(error)
        }
    },

    getSpecificUser: async (req, res) => {
        try {
            const query = 'SELECT * FROM users_information WHERE email = ?';
            connection.query(query, [req.params.email], (error, result) => {
                if (!error && result.length > 0) {
                    return res.send(result);
                } else {
                    console.log(error || 'user not found');
                    return res.status(404).json({ message: 'user not found.' });
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    },
};

module.exports = usersModel