// DB Connection
import { MysqlConnection } from '../../db/MySQL/mysqlConnectionConfig.js';

// Model Interface
import Model from '../Model.js';


// User DB Model
export default class UserData extends Model{
    static db = new MysqlConnection();
    static table = "userdata";
    
    // Method for Inserting new elements
    static async insert(data){
        const query = `INSERT INTO ${this.table} (name, lastname_1, lastname_2, position, phoneNum, personalEmail, address) VALUES( ? , ? , ? , ? , ? , ? , ? );`; // Query with missing Values
        const values = [ // Values to insert
            data.name, 
            data.lastname_1,
            data.lastname_2,
            data.position, 
            data.phoneNum, 
            data.personalEmail, 
            data.address
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
        const sql = `UPDATE ${this.table} SET name = ?, lastname_1= ? , lastname_2= ? , position = ?, phoneNum = ?, personalEmail = ?, address = ? WHERE id = ?`;
        const values = [ // Values to update
            data.name, 
            data.lastname_1,
            data.lastname_2,
            data.position, 
            data.phoneNum, 
            data.personalEmail, 
            data.address,
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
