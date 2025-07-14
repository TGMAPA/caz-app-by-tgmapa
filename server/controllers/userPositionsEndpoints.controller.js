// Db Conecction Logic
import { MysqlConnection } from '../db/MySQL/mysqlConnectionConfig.js';


// Function to Get Endpoints from a given Position
export async function getPositionEndpoints(position){

    const db = new MysqlConnection();
    
    // Query For getting every endpoint related with any System User position 
    const query = ` SELECT
                        e.endpoint
                    FROM
                        system_user_positions p
                    JOIN system_user_positions_privileges pp ON pp.positionID = p.id
                    JOIN system_user_privileges pr ON pr.id = pp.privilegeID
                    LEFT JOIN system_user_privileges_endpoints e ON e.privilegeID = pr.id
                    WHERE
                        p.id = ? ;  `;

    const values = [ // Values to insert
        position
    ];

    try{
        const query_exec = await db.query(query, values);
        if(query_exec.status){ // Query succesfully executed
            let endpoints = []; // Enppoint array

            // Return a single array of endpoints
            for(let i = 0; i<query_exec.result.length; i++){
                endpoints.push(query_exec.result[i].endpoint);
            }

            return [true, endpoints]; // Return True status
        }else{ return [false, null] } // Query Not succesfully executed: Error
    } catch(error) { return [false, null] } // Return false status: ERROR
}
    

