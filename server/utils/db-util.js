const allConfig = require('../config/environment');
const config = allConfig.database
const mysql = require("mysql")

const pool = mysql.createPool({
  host     :  config.HOST,
  user     : config.USERNAME,
  password : config.PASSWORD,
  database : config.DATABASE
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

let createTable = function( sql ) {
  return query( sql, [] )
}

let findDataById = function( table, key, id ) {
  let  _sql =  "SELECT * FROM ?? WHERE ?? = ? "
  return query( _sql, [ table, key, id] )
}

let findAllDataByPage = function( table, keys, start, end){
    let  _sql =  "SELECT ?? FROM ??  LIMIT ? , ? "
  return query( _sql, [keys,  table,  parseInt(start), parseInt(end) ] )
}

let findDataByPage = function( table, keys, key, value, start, end ) {
  let  _sql =  "SELECT ?? FROM ?? WHERE ?? = ? LIMIT ? , ? "
  return query( _sql, [keys, table, key,parseInt(value), parseInt(start), parseInt(end) ] )
}

let insertData = function( table, values ) {
  let _sql = "INSERT IGNORE INTO ?? SET ?"
  return query( _sql, [ table, values ] )
}

let updateData = function( table, values, id ) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?"
  return query( _sql, [ table, values, id ] )
}

let deleteDataById = function( table, key, value ) {
  let _sql = "DELETE FROM ?? WHERE ?? = ?"
  return query( _sql, [ table, key, value ] )
}

let select = function( table, keys ) {
  let  _sql =  "SELECT ?? FROM ?? "
  return query( _sql, [ keys, table ] )
}

let count = function( table ) {
  let  _sql =  "SELECT COUNT(*) AS total_count FROM ?? "
  return query( _sql, [ table ] )
}

let someCount = function(table,key,value){
  let  _sql =  "SELECT COUNT(*) AS total_count FROM ?? WHERE ?? = ?"
  return query( _sql, [ table, key, parseInt(value)] )
}


module.exports = {
  query,
  createTable,
  findDataById,
  findAllDataByPage,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count,
  someCount
}
