// Modules
import mysql from 'mysql2/promise';


// Connection Configuration
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'caz-app'
}

// Class for MysqlConnection Handling 
export class MysqlConnection{
    // Constructor Method
    constructor(){
        this.config = config; // Config json
        this.mysqlConnection = null; // Object to locate mysql connection
    }
    
    // Method to try a mysql db connection
    async connect(){
        try{
            this.mysqlConnection = await mysql.createConnection(this.config);
            return true;
        } catch (error){
            console.error( "Mysql Start Connection Error: ", error);
            return false;
        }
    }

    // Method to try to stop the mysql db connection
    async end(){
        try{
            await this.mysqlConnection.end();
        } catch (error){
            console.error( "Mysql End Connection Error: ", error);
        }
    }

    async query( query , values= []){
        if( await this.connect() ){
            try{
                const [rows, fields] = await this.mysqlConnection.execute(query, values); // Execute SQL query
                await this.end();
                return {
                            status: true,
                            result: rows
                        }; // Return result
            } catch (error){
                //console.error( "Mysql Query Execution Error: ", error);
                await this.end();
                return {
                            status: false,
                            result: null
                        }; // Return result
            }
        }
        await this.end(); // Delete connection 
    }
}