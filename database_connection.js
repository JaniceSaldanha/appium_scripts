const colors = require('colors'); 
const { executionAsyncId } = require('async_hooks');
const { table } = require('console');
const moment = require('moment');
const sqlite3 = require('sqlite3').verbose()
 

const date= new Date()
  const run_date= moment(date).format('DD-MM-YYYY_HH:mm:ss');
 console.log(run_date)


module.exports = class Database1 { 
    constructor(){ 

        this.testCaseNameString= "";
        this.testCaseOutputString= "";
        this.testCaseTimeString= ""
    }

tableEntry = (id,elements, output, execution_time) => {

   //Connecting to SQLite Database { filepath, mode of opening , error message}
   const db = new sqlite3.Database('./database.db',sqlite3.OPEN_READWRITE, (err)=>{   //Create an object from database
    if(err)  return console.error(err.message)

    console.log("Connection Established Successfully ")
});

      var testid=id
    var test_case=elements
    var out= output
    var time_of_exec=execution_time 

    this.testCaseNameString = `${test_case}`;
  this.testCaseOutputString =`${out}`;
   this.testCaseTimeString =`${time_of_exec}`; 
   this.testCaseIdString= `${testid}`




var robot="CCR"

//Creation of Primary Table TestCase( This table will contain testcase Id as PK, TestCase Name and Robot Type)
db.run('CREATE TABLE IF NOT EXISTS main(Test_ID VARCHAR(50) PRIMARY KEY, Test_Case_Name TEXT,Robot_Type TEXT)');
console.log("Table created")

//Creation of Secondary Table for Database
db.run('CREATE TABLE IF NOT EXISTS test(test_run_id TEXT,TestID VARCHAR(50),Output TEXT,execution_time INTEGER,FOREIGN KEY(TestID) REFERENCES main(Test_ID), CONSTRAINT Composite_key PRIMARY KEY(test_run_id,TestID))');
console.log("table created")



//INSERT INTO PRIMARY TABLE
const sql0= (`INSERT INTO main(Test_ID,Test_Case_Name,Robot_Type) VALUES (?,?,?)`);

//Insert into  table
db.run(sql0,[this.testCaseIdString,this.testCaseNameString,robot], (err) =>{
  if(err)  return console.error(err.message)
console.log("A new row has been created")
})

  //DISPLAY CONTENTS OF PRIMARY TABLE
  const display_table=`Select * from main`   //Storing the command into a variable

  //Display the table content
 db.all(display_table,[],(err,rows) => {   //passing the varibale in the db.all 
     if (err) {
       throw err;
     }
     rows.forEach((row) => {      //printing ever row in the table
       console.log(row);
     });  
   }) 
  



//Insert into SECONDARY TABLE
 const sql =(`INSERT INTO test (test_run_id,TestID,Output,execution_time) VALUES (?,?,?,?)`);

 //Insert into SECONDARY TABLE
  db.run(sql,[run_date,this.testCaseIdString,this.testCaseOutputString,this.testCaseTimeString], (err) =>{
    if(err)  return console.error(err.message)
    console.log("A new row has been created")
   })


   //Display the table content OF SECONDARY TABLE
 const display_secondary_table=`Select * from test`   //Storing the command into a variable
db.all(display_secondary_table,[],(err,rows) => {   //passing the varibale in the db.all 
    if (err) {
      throw err;
   }
    rows.forEach((row) => {      //printing ever row in the table
      console.log(row);
    });
  })


//Close database
db.close((err)=>{
    if(err)  return console.error(err.message)

});

}}  //closing of database1 class



