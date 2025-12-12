// UnitsOfMeasurement Model
import UnitsOfMeasurement from "../../../models/BusinessModels/Catalogs/UnitsOfMeasurementModel/UnitsOfMeasurementModel.js";


// ===== Controller Functions

// Function to create a UnitsOfMeasurement and error handling
export const createUnitOfMeasurement = async (req, res) => {
    try {
        const data = req.body;
        const status = await UnitsOfMeasurement.insert(data);
        if(status){ // If status = true: Insertion Successfull
            res.json(
                { 
                    status: status, 
                    message: 'UnitsOfMeasurement creada exitosamente'
                }
            );
        }else{ // Insertion Not Successfull
            res.status(500).json({ error: "Hubo un problema al crear la UnitsOfMeasurement." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear la UnitsOfMeasurement." });
    }
};

// Function to get all the UnitsOfMeasurements in db and error handling
export const getAllUnitsOfMeasurement = async (req, res) => {
    try {
        const [status, UnitsOfMeasurements] = await UnitsOfMeasurement.getAll();
        if(status){ // Operation Succesfull
            res.json(
                { 
                    UnitsOfMeasurements: UnitsOfMeasurements, 
                    message: 'Se obtuvieron las UnitsOfMeasurements exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener las UnitsOfMeasurements." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener las UnitsOfMeasurements." });
    }
};

// Function to get all the UnitsOfMeasurements in db and error handling
export const getUnitOfMeasurementByID = async (req, res) => {
    try {
        const id = req.body.id;
        const [status, UnitsOfMeasurement] = await UnitsOfMeasurement.getByID(id);
        if(status){ // Operation Succesfull|
            res.json(
                { 
                    UnitsOfMeasurement: UnitsOfMeasurement, 
                    message: 'Se obtuvo la UnitsOfMeasurement exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener la UnitsOfMeasurement." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener la UnitsOfMeasurement." });
    }
};

// Function to update a UnitsOfMeasurement and error handling
export const updateUnitsOfMeasurement = async (req, res) => {
    try {
        const data = req.body.data;
        const id2Search = req.body.id; // Id to update
        const status = await UnitsOfMeasurement.update(id2Search, data);
        if(status){ // Operation Succesfull
            res.json(
                {
                    status: status,
                    message: 'UnitsOfMeasurement actualizada exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al actualizar la UnitsOfMeasurement." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al actualizar la UnitsOfMeasurement." });
    }
};

// Function to Logic Delete a UnitsOfMeasurement and error handling
export const UnitsOfMeasurementlogicDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await UnitsOfMeasurement.logicDelete(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'UnitsOfMeasurement eliminada exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al eliminar la UnitsOfMeasurement." });
        }  
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al eliminar la UnitsOfMeasurement." });
    }
};

// Function to Logic Delete a UnitsOfMeasurement and error handling
export const UnitsOfMeasurementphysicalDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await UnitsOfMeasurement.physicalDelete(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'UnitsOfMeasurement eliminada exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al eliminar la UnitsOfMeasurement." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al eliminar la UnitsOfMeasurement." });
    }
};