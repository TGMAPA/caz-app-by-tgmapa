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
        let result = await this.db.query('SELECT * FROM ' + this.table);
        console.log(result);
        return result;
    }

    // Method for geting all elements
    static async getAll(){
        const query = 'SELECT * FROM ' + this.table;
        const result = await this.db.query(query)
        console.log('Result ', result);
        return result;
    }

    // Method for updating elements
    static async update(data){}

    // Method for deleting elements
    static async delete(id){} 
}
