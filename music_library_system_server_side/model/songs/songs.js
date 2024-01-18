const connection = require('../../connection/config/database')

const SongsModel = {

     getSongs: async (req, res) => {
          try {
               const data = "select * from songs  order by id asc";

               connection.query(data, function (error, result) {
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
};

module.exports = SongsModel