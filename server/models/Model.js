// "Interface" or abstract class for creating new models using the same base methods

export default class Model {
    // Method for Inserting new elements
    async insert(data){}

    // Method for geting all elements
    async getAll(){}

    // Method for geting one element by its ID
    async getByID(id){}

    // Method for updating elements
    async update(id, data){}

    // Method for deleting elements in a logical way
    async logicDelete(id){} 

    // Method for deleting elements in a logical way
    async physicalDelete(id){} 
}