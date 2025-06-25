// DB Connection
import { MysqlConnection } from '../..';

// Model Interface
import Model from '../Model.js';


// User DB Model
export default class User extends Model{
    static db = new MysqlConnection();

    // Method for Inserting new elements
    async insert(data){
        let result = await connection.query('SELECT * FROM users');
        console.log(result);
    }

    // Method for geting all elements
    async getAll(data){}

    // Method for updating elements
    async update(data){}

    // Method for deleting elements
    async delete(id){} 
}
