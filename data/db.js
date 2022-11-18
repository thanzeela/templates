const mysql = require('mysql2');
const connectionDetails ={
    host:'localhost',
    user:'root',
    password:'Thanzi@2001',
    database:'experion1'
}
function getConnection(){
    return mysql.createConnection(connectionDetails);

}

function executequery(query, parameters, callback){
    let connection =getConnection();
    connection.connect();
    connection.query(query, parameters, callback);
    connection.commit();
    connection.end();

    }
    module.exports.executequery = executequery;
