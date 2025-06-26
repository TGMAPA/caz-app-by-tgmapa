// DB Connection
import { MysqlConnection } from '../../db/MySQL/mysqlConnectionConfig.js';

// Model Interface
import Model from '../Model.js';


// User DB Model
export default class User extends Model{
    static db = new MysqlConnection();
    static table = "users";
    
    // Method for Inserting new elements
    static async insert(data){
        const query = `INSERT INTO ${this.table} (name, position) VALUES( ? , ? )`; // Query with missing Values
        const values = [data.name, data.position]; // Values to insert
        const result = await this.db.query(query, values);
        return result;
    }

    // Method for geting all elements
    static async getAll(){
        const query = 'SELECT * FROM ' + this.table;
        const result = await this.db.query(query)
        return result;
    }

    // Method for updating elements
    static async update(id, data){
        const sql = `UPDATE ${this.table} SET name = ?, position = ? WHERE id = ?`;
        const values = [data.name, data.position, id];
        const result = await this.db.query(sql, values);
        console.log(result);
        return result;
    }

    // Method for deleting elements
    static async logicDelete(id){

    }

    // Method for deleting elements in a logical way
    async physicalDelete(id){

    } 
}
