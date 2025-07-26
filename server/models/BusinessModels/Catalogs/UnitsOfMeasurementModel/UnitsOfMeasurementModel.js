// Model Interface
import Model from '../../../Model.js';


// UnitsOfMeasurement Model
export default class UnitsOfMeasurement extends Model{
    static table = "inventory_unitsofmeasurement";
    
    // Method for Inserting new elements
    static async insert(data){
        const query = `INSERT INTO ${this.table} ( name, abbreviation ) VALUES( ? , ? );`; // Query with missing Values
        const values = [ // Values to insert
            data.name,
            data.abbreviation
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
        const sql = `UPDATE ${this.table} SET name = ? , abbreviation = ? WHERE id = ?`;
        const values = [ // Values to update
            data.name,
            data.abbreviation,
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
