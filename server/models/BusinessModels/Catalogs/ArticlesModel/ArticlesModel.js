// Model Interface
import Model from '../../../Model.js';


// Articles Model
export default class Article extends Model{
    static table = "inventory_articles";
    
    // Method for Inserting new elements
    static async insert(data){
        const query = `INSERT INTO ${this.table} (keyID, name, lineID, measurementUnit, cost, sellingPrice, createdAt, discontinued) VALUES( ? , ? , ? , ? , ? , ? , NOW() , ? );`; // Query with missing Values
        const values = [ // Values to insert
            data.keyID, 
            data.name,
            data.lineID,
            data.measurementUnit, 
            data.cost, 
            data.sellingPrice, 
            data.discontinued
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
        const sql = `UPDATE ${this.table} SET keyID = ?, name = ?, lineID= ? , measurementUnit= ? , cost = ?, sellingPrice = ?, discontinued = ? WHERE id = ?`;
        const values = [ // Values to update
            data.keyID, 
            data.name,
            data.lineID,
            data.measurementUnit, 
            data.cost, 
            data.sellingPrice, 
            data.discontinued,
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
