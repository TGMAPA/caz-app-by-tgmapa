// Group Model
import Group from "../../../models/BusinessModels/Catalogs/GroupsModel/GroupsModel.js";


// ===== Controller Functions

// Function to create a Group and error handling
export const createGroup = async (req, res) => {
    try {
        const data = req.body;
        const status = await Group.insert(data);
        if(status){ // If status = true: Insertion Successfull
            res.json(
                { 
                    status: status, 
                    message: 'Grupo creado exitosamente'
                }
            );
        }else{ // Insertion Not Successfull
            res.status(500).json({ error: "Hubo un problema al crear el grupo." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear el grupo." });
    }
};

// Function to get all the Groups in db and error handling
export const getAllGroups = async (req, res) => {
    try {
        const [status, Groups] = await Group.getAll();
        if(status){ // Operation Succesfull
            res.json(
                { 
                    Groups: Groups, 
                    message: 'Se obtuvieron los grupos exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener los grupos." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener los grupos." });
    }
};

// Function to get all the Groups in db and error handling
export const getGroupByID = async (req, res) => {
    try {
        const id = req.body.id;
        const [status, Result] = await Group.getByID(id);
        if(status){ // Operation Succesfull|
            res.json(
                { 
                    Group: Result, 
                    message: 'Se obtuvo el grupo exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener el grupo." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener el grupo." });
    }
};

// Function to get all the Groups in db and error handling
export const getGroupBy = async (req, res) => {
    try {
        const [status, Result] = await Group.getBy(req.body);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    Group: Result, 
                    message: 'Se obtuvo el grupo exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener el grupo." });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Hubo un problema al obtener el grupo." });
    }
};

// Function to update a Group and error handling
export const updateGroup = async (req, res) => {
    try {
        const data = req.body.data;
        const id2Search = req.body.id; // Id to update
        const status = await Group.update(id2Search, data);
        if(status){ // Operation Succesfull
            res.json(
                {
                    status: status,
                    message: 'Grupo actualizado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al actualizar el grupo." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al actualizar el grupo." });
    }
};

// Function to Logic Delete a Group and error handling
export const GrouplogicDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await Group.logicDelete(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Grupo eliminado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al eliminar el Grupo." });
        }  
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al eliminar el Grupo." });
    }
};

// Function to restore a Logic Elimination of a Group and error handling
export const RestoreGroup = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await Group.restore(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Grupo restaurado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al restaurar el Grupo." });
        }  
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al restaurar el Grupo." });
    }
};

// Function to Logic Delete a Group and error handling
export const GroupphysicalDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await Group.physicalDelete(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Grupo eliminado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al eliminar el Grupo." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al eliminar el Grupo." });
    }
};