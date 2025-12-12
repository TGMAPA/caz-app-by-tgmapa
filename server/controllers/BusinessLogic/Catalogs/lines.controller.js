// Line Model
import Line from "../../../models/BusinessModels/Catalogs/LinesModel/LinesModel.js";


// ===== Controller Functions

// Function to create a Line and error handling
export const createLine = async (req, res) => {
    try {
        const data = req.body;
        const status = await Line.insert(data);
        if(status){ // If status = true: Insertion Successfull
            res.json(
                { 
                    status: status, 
                    message: 'Línea creada exitosamente'
                }
            );
        }else{ // Insertion Not Successfull
            res.status(500).json({ error: "Hubo un problema al crear la Línea." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear la Línea." });
    }
};

// Function to get all the Lines in db and error handling
export const getAllLines = async (req, res) => {
    try {
        const [status, Lines] = await Line.getAll();
        if(status){ // Operation Succesfull
            res.json(
                { 
                    Lines: Lines, 
                    message: 'Se obtuvieron las Líneas exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener las Líneas." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener las Líneas." });
    }
};

// Function to get all the Lines in db and error handling
export const getLineByID = async (req, res) => {
    try {
        const id = req.body.id;
        const [status, Result] = await Line.getByID(id);
        if(status){ // Operation Succesfull|
            res.json(
                { 
                    Line: Result, 
                    message: 'Se obtuvo la Línea exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener la Línea." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener la Línea." });
    }
};

// Function to get all the Lines in db and error handling
export const getLineBy = async (req, res) => {
    try {
        const [status, Result] = await Line.getBy(req.body);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    Line: Result, 
                    message: 'Se obtuvo la línea exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener la línea." });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Hubo un problema al obtener la línea." });
    }
};

// Function to update a Line and error handling
export const updateLine = async (req, res) => {
    try {
        const data = req.body.data;
        const id2Search = req.body.id; // Id to update
        const status = await Line.update(id2Search, data);
        if(status){ // Operation Succesfull
            res.json(
                {
                    status: status,
                    message: 'Línea actualizada exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al actualizar la Línea." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al actualizar la Línea." });
    }
};

// Function to Logic Delete a Line and error handling
export const LinelogicDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await Line.logicDelete(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Línea eliminada exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al eliminar la Línea." });
        }  
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al eliminar la Línea." });
    }
};

// Function to restore a Logic Elimination of a Line and error handling
export const RestoreLine = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await Line.restore(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Línea restaurada exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al restaurar la Línea." });
        }  
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al restaurar la Línea." });
    }
};

// Function to Logic Delete a Line and error handling
export const LinephysicalDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await Line.physicalDelete(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Línea eliminada exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al eliminar la Línea." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al eliminar la Línea." });
    }
};