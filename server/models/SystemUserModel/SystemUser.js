// DB Connection
import { MysqlConnection } from '../../db/MySQL/mysqlConnectionConfig.js';

// Model Interface
import Model from '../Model.js';


// ----- System User DB Model
export default class SystemUser extends Model{
    static db = new MysqlConnection();
    static table = "systemusers";
    
    // Method for Inserting new elements
    static async insert(data){
        const query = `INSERT INTO ${this.table} (userID, username, password) VALUES( ? , ? , ? );`; // Query with missing Values
        const values = [ // Values to insert
            data.userDataID, 
            data.username, 
            data.password
        ];

        try{
            const query_exec = await this.db.query(query, values);
            if(query_exec.status){ // Query succesfully executed
                return true; // Return True status
            }else{ return false } // Query Not succesfully executed: Error
        } catch(error) { return false } // Return false status: ERROR
    }

    // Method for updating elements
    static async update(id, data){
        const sql = `UPDATE ${this.table} SET username = ?, password = ? WHERE id = ?`;
        const values = [ // Values to update
            data.username, 
            data.password,
            id
        ];

        try{
            const query_exec = await this.db.query(sql, values);
            if(query_exec.status){ // Query succesfully executed
                return true; // Return True status
            }else{ return false } // Query Not succesfully executed: Error
        } catch(error) { return false } // Return false status: ERROR
    }

    // Method for geting all elements
    static async getAll(){
        const query = 'SELECT * FROM ' + this.table + ';';
        try{
            const query_exec = await this.db.query(query)
            if(query_exec.status){ // Query succesfully executed
                return [true, query_exec.result]; // Return True status
            }else{ return [false, null] } // Query Not succesfully executed: Error
        } catch(error) { return [false, null] } // Return false status: ERROR
    }
    
    // Method for geting one elements
    static async getByID(id){
        const query = `SELECT * FROM ${this.table} WHERE id = ${id};`;
        try{
            const query_exec = await this.db.query(query)
            if(query_exec.status){ // Query succesfully executed
                return [true, query_exec.result]; // Return True status
            }else{ return [false, null] } // Query Not succesfully executed: Error
        } catch(error) { return [false, null] } // Return false status: ERROR
    }

    // Method for deleting elements in a logical way
    static async logicDelete(id){
        const sql = `UPDATE ${this.table} SET LogDelete = NOW() WHERE id = ${id};`;
        try{
            const query_exec = await this.db.query(sql);
            if(query_exec.status){ // Query succesfully executed
                return true; // Return True status
            }else{ return false } // Query Not succesfully executed: Error
        } catch(error) { return false } // Return false status: ERROR
    }

    // Method for deleting elements in a physical way
    static async physicalDelete(id){
        const sql = `DELETE FROM ${this.table} WHERE id = ${id};`;
        try{
            const query_exec = await this.db.query(sql);
            if(query_exec.status){ // Query succesfully executed
                return true; // Return True status
            }else{ return false } // Query Not succesfully executed: Error
        } catch(error) { return false } // Return false status: ERROR
    } 
}