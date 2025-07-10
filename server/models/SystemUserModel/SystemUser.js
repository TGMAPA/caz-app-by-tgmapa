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
        } catch(error) { return false;  } // Return false status: ERROR
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
}
