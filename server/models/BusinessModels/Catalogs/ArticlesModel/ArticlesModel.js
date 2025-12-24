// Model Interface
import Model from '../../../Model.js';

// Group Model 
import Group from '../../Catalogs/GroupsModel/GroupsModel.js'

// Line Model 
import Line from '../../Catalogs/LinesModel/LinesModel.js'

// UnitsOfMeasurement Model 
import UnitsOfMeasurement from '../../Catalogs/UnitsOfMeasurementModel/UnitsOfMeasurementModel.js'


// Articles Model
export default class Article extends Model{
    static table = "inventory_articles";

    // Columns for getall method join query
        static columns = `
            ${this.table}.*,

            ${UnitsOfMeasurement.table}.abbreviation AS unitName,
            ${UnitsOfMeasurement.table}.LogDelete AS unitDeleted,

            ${Line.table}.name AS lineName,
            ${Line.table}.LogDelete AS lineDeleted,

            ${Group.table}.name AS groupName,
            ${Group.table}.LogDelete AS groupDeleted
        `;
    
        static joins = `
            LEFT JOIN ${UnitsOfMeasurement.table}
                ON ${UnitsOfMeasurement.table}.id = ${this.table}.measurementUnit

            LEFT JOIN ${Line.table}
                ON ${Line.table}.id = ${this.table}.lineID

            LEFT JOIN ${Group.table}
                ON ${Group.table}.id = ${Line.table}.groupID
        `;
    
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
