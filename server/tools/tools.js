// Modules
import bcrypt from 'bcrypt';  // Hashing passwords

// Function to hash Refresh Token for Session
export async function hashToken(token) {
  return await bcrypt.hash(token, 10);
}


export function minutes2milisec(minutes){
    return 1000 * 60 * minutes;
} 

export function getMySQLDateTime(date = new Date()) {
  const pad = n => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

// Method to build a filter WHERE with multiple fields and values
export function buildWHEREQuerywithDict(base_query, fields, logicalOperator){
    let aux_query_fields = "";
    let counter = 0;
    for (const table_field in fields) { // Dynamic query build per field
        const value = fields[table_field];
        
        if(value === null){ // Handle comparation to null
            aux_query_fields+= ` ${table_field} IS NULL`;
            break;
        }
        
        switch(typeof(value)){  // Match fields with its values datatype
            case "string":
                // String Variable
                aux_query_fields+= ` ${table_field} = '${value}'`;
                break;
            
            case "number":
                // Number Variable
                aux_query_fields+= ` ${table_field} = ${value}`;
                break;
        

            default:
                aux_query_fields+= ` ${table_field} = ${value}`;
                break
        }
        
        if(Object.keys(fields).length > 1 && counter < Object.keys(fields).length-1){
            aux_query_fields+= " " + logicalOperator;
        }
        counter++;
    }
    //aux_query_fields+= ";"
    base_query+= aux_query_fields;

    return base_query; // Return query
}