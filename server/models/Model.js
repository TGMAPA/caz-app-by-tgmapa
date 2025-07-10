// Tools
import { buildWHEREQuerywithDict } from '../tools/tools.js';


// "Interface" or abstract class for creating new models using the same base methods
export default class Model {
    // Method for Inserting new elements
    async insert(data){}

    // Method for updating elements
    async update(id, data){}

    // Method for geting all elements
    static async getAll(){
        const query = 'SELECT * FROM ' + this.table + ';';
        try{
            const query_exec = await this.db.query(query)
            if(query_exec.status){ // Query succesfully executed
                return [true, query_exec.result]; // Return True status
            }else{ return [false, null] } // Query Not succesfully executed: Error
        } catch(error) { return [false, null] } // Return false status: ERROR
    }
    
    // Method for geting one elements
    static async getByID(id){
        const query = `SELECT * FROM ${this.table} WHERE id = ${id};`;
        try{
            const query_exec = await this.db.query(query)
            if(query_exec.status){ // Query succesfully executed
                return [true, query_exec.result]; // Return True status
            }else{ return [false, null] } // Query Not succesfully executed: Error
        } catch(error) { return [false, null] } // Return false status: ERROR
    }

    static async getBy(fields = {}){
        let query = `SELECT * FROM ${this.table} WHERE`;
        query = buildWHEREQuerywithDict(query, fields, "AND"); // Build Query with dynamic fields
        try{
            const query_exec = await this.db.query(query)
            if(query_exec.status){ // Query succesfully executed
                return [true, query_exec.result]; // Return True status
            }else{ return [false, null] } // Query Not succesfully executed: Error
        } catch(error) { return [false, null] } // Return false status: ERROR
    }

    // Method for deleting elements in a logical way
    static async logicDelete(id){
        const sql = `UPDATE ${this.table} SET LogDelete = NOW() WHERE id = ${id};`;
        try{
            const query_exec = await this.db.query(sql);
            if(query_exec.status){ // Query succesfully executed
                return true; // Return True status
            }else{ return false } // Query Not succesfully executed: Error
        } catch(error) { return false } // Return false status: ERROR
    }

    // Method for deleting elements in a physical way
    static async physicalDelete(id){
        const sql = `DELETE FROM ${this.table} WHERE id = ${id};`;
        try{
            const query_exec = await this.db.query(sql);
            if(query_exec.status){ // Query succesfully executed
                return true; // Return True status
            }else{ return false } // Query Not succesfully executed: Error
        } catch(error) { return false } // Return false status: ERROR
    } 
}