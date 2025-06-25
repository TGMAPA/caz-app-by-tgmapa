// DB Connection
import { MysqlConnection } from '../../mysqlConnectionConfig.js';


export default async function getUsers(){
    const connection = new MysqlConnection();
    let result = await connection.query('SELECT * FROM users');
    console.log(result);
    return result;
}