// "Interface" or abstract class for creating new models using the same base methods

export default class Model {
    // Method for Inserting new elements
    async insert(data){}

    // Method for geting all elements
    async getAll(data){}

    // Method for updating elements
    async update(data){}

    // Method for deleting elements
    async delete(id){} 
}