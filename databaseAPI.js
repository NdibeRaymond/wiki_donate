const mysql = require("mysql");

const database = {
     _pool: mysql.createPool({
        host: "database",
        user: "root",
        password: "root",
        database: "mysql"
     }),
    _getConnection: callback=>{
      database._pool.getConnection((err, connection)=>{
          if(!err){
          callback(connection);
          }else{
              console.log("error getting connection ", err);
          }
      })
    },
    _createDonationTable: (connection, callback)=>{
            connection.query(`CREATE TABLE mysql.donations (
                id INT NOT NULL AUTO_INCREMENT,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                street_address VARCHAR(500) NOT NULL,
                city VARCHAR(50) NOT NULL,
                state VARCHAR(50) NOT NULL,
                country VARCHAR(50) NOT NULL,
                postal_code VARCHAR(10) NOT NULL,
                phone_number VARCHAR(20) NOT NULL,
                email VARCHAR(255) NOT NULL,
                preferred_form_of_contact VARCHAR(20) NOT NULL,
                Preferred_form_of_payment VARCHAR(20) NOT NULL,
                frequency_of_donation VARCHAR(200) NOT NULL,
                amount_of_donation NUMERIC(19,4) NOT NULL,
                comments VARCHAR(1000) NOT NULL,
                PRIMARY KEY (id)
              );`, (err)=>{
                  if(!err){
                      console.log("donation table created successfully");
                      callback(connection);
                  }else{
                      console.log("error creating donation table: ", err);
                  }
              })
    },
    _donationTableExists: (callback)=>{
       database._getConnection(connection=>{
        connection.query("SELECT * from mysql.donations", (err)=>{
            if(err && err.code === "ER_NO_SUCH_TABLE"){
               database._createDonationTable(connection, callback)
            }else{
                callback(connection);
            }
        })
       })
    },

    getDonations: (id=null, callback)=>{
       database._donationTableExists(connection=>{
            //    database._getConnection(connection=>{
                connection.query(id ? 
                    `SELECT * from mysql.donations WHERE id=${id}` :
                    "SELECT * from mysql.donations"
                     , (err, rows)=>{
                        connection.release();
                       if(!err){
                        callback(rows);
                       }else{
                           console.log("error getting donations ", err);
                       }
                   })
               })
    //    })
    },
    getDonationsByFirstName: (first_name, callback)=>{
        database._donationTableExists(connection=>{
                connection.query(
                `SELECT * from mysql.donations WHERE first_name="${first_name}"`
                , (err, rows)=>{
                    connection.release();
                    if(!err){
                        callback(rows);
                    }else{
                        console.log("error getting donations by first_name ", err);
                    }
                })
        })
    },
    createDonation: (obj, callback)=>{
        database._donationTableExists(connection=>{
            connection.query(`
            INSERT INTO mysql.donations (first_name, last_name, street_address, city,
                state, country, postal_code, phone_number, email, preferred_form_of_contact,
                preferred_form_of_payment, frequency_of_donation, amount_of_donation, comments)
        
            VALUES ("${obj.first_name}", "${obj.last_name}", "${obj.street_address}", "${obj.city}", 
                   "${obj.state}", "${obj.country}", "${obj.postal_code}", "${obj.phone_number}", 
                   "${obj.email}", "${obj.preferred_form_of_contact}", "${obj.preferred_form_of_payment}",
                   "${obj.frequency_of_donation}", "${obj.amount_of_donation}", "${obj.comments}");
            `,(err, res)=>{
                connection.release();
                if(!err){
                  callback(res);
                }else{
                    console.log("failed to createDonation: ", err);
                }
            })
        })
    },
    deleteDonation: (id, callback)=>{
        if(id){
            database._donationTableExists(connection=>{
                connection.query(`
                DELETE FROM mysql.donations WHERE id=${id};
                `,(err, res)=>{
                    connection.release();
                    if(!err){
                        callback(res);
                    }else{
                        console.log("error deleting value from database: ", err);
                    }
                })
            })
        }
    },
    deleteDonationsByFirstName: (first_name,callback)=>{
        database._donationTableExists(connection=>{
            connection.query(
                `DELETE FROM mysql.donations WHERE first_name="${first_name}"`
                , (err, res)=>{
                    connection.release();
                    if(!err){
                        callback(res);
                    }else{
                        console.log("error deleting value from database by first name ", err);
                    }
                })
        })
    },
    deleteAllDonations: (callback)=>{
        database._donationTableExists(connection=>{
            connection.query(`
            DELETE FROM mysql.donations;
            `,(err, res)=>{
                connection.release();
                if(!err){
                    callback(res);
                }else{
                    console.log("error deleting all values from database: ", err);
                }
            })
        })
    }
}

module.exports = database;
