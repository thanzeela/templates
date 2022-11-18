const db = require('./db');
function getAll(callback){
const sql = "SELECT Id,name,email,age FROM customers";
db.executequery(sql, [], callback);
}
function addOne(name,email,age, callback){
    const sql ="INSERT INTO  customers(name, email,  country,age)VALUES(?, ?, 'IN',?)";
db.executequery(sql, [name, email, age], callback);
}
module.exports.getAll= getAll;
module.exports.addOne = addOne;
