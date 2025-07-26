// Model Interface
import Model from '../../../Model.js';


// Lines Model
export default class Line extends Model{
    static table = "inventory_lines";
    
    // Method for Inserting new elements
    static async insert(data){
        const query = `INSERT INTO ${this.table} ( name, groupID ) VALUES( ? , ? );`; // Query with missing Values
        const values = [ // Values to insert
            data.name,
            data.groupID
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
        const sql = `UPDATE ${this.table} SET name = ? , groupID = ? WHERE id = ?`;
        const values = [ // Values to update
            data.name,
            data.groupID,
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
