// Model Interface
import Model from '../../../Model.js';

// Group Model 
import Group from '../../Catalogs/GroupsModel/GroupsModel.js'


// Lines Model
export default class Line extends Model{
    static table = "inventory_lines";

    // Columns for getall method join query
    static columns = `
        ${this.table}.*,
        ${Group.table}.name AS groupName,
        ${Group.table}.LogDelete AS groupDeleted
    `;

    // JOIN with groups even if deleted (LEFT JOIN)
    static joins = `
        LEFT JOIN ${Group.table} ON ${Group.table}.id = ${this.table}.groupID
    `;
    
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
