// Modules
import bcrypt from 'bcrypt';  

// DB Connection
import { MysqlConnection } from '../../db/MySQL/mysqlConnectionConfig.js';

// Model Interface
import Model from '../Model.js';

// Tools
import { buildWHEREQuerywithDict } from '../../tools/tools.js'


// ----- System User DB Model
export default class SessionRefreshToken extends Model{
    static db = new MysqlConnection();
    static table = "session_refresh_tokens";
    
    // Method for Inserting new elements
    static async insert(data){
        const query = `INSERT INTO ${this.table} (systemUserID, refresh_token_hash, created_at, expires_at, user_agent, ip_address, revoked) VALUES( ?, ?, ?, ?, ?, ?, ? );`; // Query with missing Values
        const values = [ // Values to insert
            data.systemUserID, 
            data.refresh_token_hash, 
            data.created_at,
            data.expires_at,
            data.user_agent,
            data.ip_address,
            data.revoked
        ];

        try{
            const query_exec = await this.db.query(query, values);
            if(query_exec.status){ // Query succesfully executed
                return true; // Return True status
            }else{ return false } // Query Not succesfully executed: Error
        } catch(error) { return false;  } // Return false status: ERROR
    }

    // Method for updating elements
    static async update(id, data){
        const sql = `UPDATE ${this.table} SET systemUserID = ?, refresh_token_hash = ?, created_at = ?, expires_at = ?, user_agent = ?, ip_address = ?, revoked = ?, WHERE id = ?`;
        const values = [ // Values to update
            data.systemUserID, 
            data.refresh_token_hash, 
            data.created_at,
            data.expires_at,
            data.user_agent,
            data.ip_address,
            data.revoked,
            id
        ];

        try{
            const query_exec = await this.db.query(sql, values);
            if(query_exec.status){ // Query succesfully executed
                return true; // Return True status
            }else{ return false } // Query Not succesfully executed: Error
        } catch(error) { return false } // Return false status: ERROR
    }

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

    // Method for geting one elements
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

    // Method for revoking a session
    static async revokeSession(SystemUserID, current_refresh_token){
        const fields = {
            systemUserID: SystemUserID,
            revoked: 0,
            logDelete: null
        };

        // Search open Sessions of a SystemUser and verify if any of them are revoked or LogDeleted
        let query = `SELECT * FROM ${this.table} WHERE`;
        query = buildWHEREQuerywithDict(query, fields, "AND"); // Build Query with dynamic fields

        try{
            const query_exec = await this.db.query(query);

            if(!query_exec.status){ return false } // Query succesfully executed
            
            for(let i=0; i<query_exec.result.length; i++){
                // Compare with every session to find if the current token is in any of systemuser's sessions
                if( await bcrypt.compare(current_refresh_token, query_exec.result[i].refresh_token_hash) ){
                    // Refresh token is VALID
                    
                    // Revoke Token
                    const query = `UPDATE ${this.table} SET revoked = ? WHERE refresh_token_hash = ?`;
                    const values = [ // Values to update
                        1,
                        query_exec.result[i].refresh_token_hash
                    ];

                    try{
                        const query_exec = await this.db.query(query, values);

                        if( query_exec.status ){ return true } // Query succesfully executed
                        else{ return false } // Query Not succesfully executed: Error
                    } catch(error) { return false }
                }
                // else: Session doesnt exist
            }
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

    // Method for returning if a refresh token is expired
    static async isExpired(SystemUserID, current_refresh_token){
        const fields = {
            systemUserID: SystemUserID,
            revoked: 0,
            logDelete: null
        };

        // Search open Sessions of a SystemUser and verify if any of them are revoked or LogDeleted
        let query = `SELECT * FROM ${this.table} WHERE`;
        query = buildWHEREQuerywithDict(query, fields, "AND"); // Build Query with dynamic fields
        
        let TokenIsExpired = true; // Function response const declaration

        try{
            const query_exec = await this.db.query(query)
            
            for(let i=0; i<query_exec.result.length; i++){
                // Compare with every session to find if the current token is in any of systemuser's sessions
                if(await bcrypt.compare(current_refresh_token, query_exec.result[i].refresh_token_hash)){
                    // Refresh token is VALID
                    if( new Date(query_exec.result[i].expires_at)  > new Date()){
                        // The token isnt expired
                        TokenIsExpired = false;
                    } // else: The token is expired
                    break;
                }
                // else: Session doesnt exist
            }

            if(query_exec.status){ // Query succesfully executed
                return [true, TokenIsExpired]; // Return True status
            }else{ return [false, null] } // Query Not succesfully executed: Error
        } catch(error) { return [false, null] } // Return false status: ERROR
    }
}

