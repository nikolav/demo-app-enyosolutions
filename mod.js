const { client } = require("./src/mysq-connection");

//
client.connect(error => {
    if (error)
      throw error;
    
    client.query(
        `select 'TEST-DATA' as test`,
        (err, res, fields) => {
            console.log(err);
            console.log(res);
            console.log(fields);

        }
    )

});

