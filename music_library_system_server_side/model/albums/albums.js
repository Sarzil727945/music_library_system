const connection = require('../../connection/config/database')
const AlbumsModel = {

    createAlbums: async (req, res) => {
        try {
            const {
                title, genre, year, artistID, hostEmail
            } = req.body;

            const artistIDArr = artistID.split(',');

            const insertQuery = `INSERT INTO albums (title, release_year, genre, artists_id, artists, host_email) VALUES (?, ?, ?, ?, ?, ?)`;

            // Function to perform a single query and return a promise
            const queryArtist = (id) => {
                return new Promise((resolve, reject) => {
                    const query = 'SELECT * FROM artists WHERE id = ?';
                    connection.query(query, [id], (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result[0].name);
                        }
                    });
                });
            };

            // Use Promise.all to handle multiple asynchronous queries
            const names = await Promise.all(artistIDArr.map(id => queryArtist(id)));
            const artistNameArr = names + '';

            const result = await new Promise((resolve, reject) => {
                connection.query(
                    insertQuery,
                    [title, year, genre, artistID, artistNameArr, hostEmail],
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });

            if (result.affectedRows > 0) {
                console.log(result);
                return res.send(result);
            } else {
                console.log('Insert failed');
                return res.status(500).json({ message: 'Insert failed.' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getAlbums: async (req, res) => {
        try {
            const data = "select * from albums  order by id asc";
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

    getSpecificAlbums: async (req, res) => {
        try {
            const query = 'SELECT * FROM albums WHERE host_email = ?';
            connection.query(query, [req.params.email], (error, result) => {
                if (!error && result.length > 0) {
                    console.log(result);
                    return res.send(result);
                } else {
                    console.log(error || 'albums not found');
                    return res.status(404).json({ message: 'albums not found.' });
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    },

    updateAlbums: async (req, res) => {
        try {
            const {
                id, title, genre, year, artistID, hostEmail
            } = req.body;
            
            const artistIDArr = artistID.split(',');

            const updateQuery = `UPDATE albums SET title = ?, release_year = ?, genre = ?, artists_id = ?, artists = ?, host_email = ? WHERE id = ?`;

            const queryArtist = (id) => {
                return new Promise((resolve, reject) => {
                    const query = 'SELECT * FROM artists WHERE id = ?';
                    connection.query(query, [id], (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result[0].name);
                        }
                    });
                });
            };

            // Use Promise.all to handle multiple asynchronous queries
            const names = await Promise.all(artistIDArr.map(id => queryArtist(id)));
            const artistNameArr = names.join(', ');

            const result = await new Promise((resolve, reject) => {
                connection.query(
                    updateQuery,
                    [title, year, genre, artistID, artistNameArr, hostEmail, id],
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });

            // Handle the result or send a response to the client
            if (result.affectedRows > 0) {
                console.log(result);
                return res.send(result);
            } else {
                console.log('Update failed');
                return res.status(500).json({ message: 'Update failed.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteAlbums: async (req, res) => {
        try {
            const query = 'DELETE FROM albums WHERE id = ?';
            connection.query(query, [req.params.id], (error, result) => {
                if (!error && result.affectedRows > 0) {
                    console.log(result);
                    return res.send(result);
                } else {
                    console.log(error || 'albums not found');
                    return res.status(404).json({ message: 'albums not found.' });
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    },

};

module.exports = AlbumsModel