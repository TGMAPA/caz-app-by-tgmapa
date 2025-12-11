// Article Model
import Article from "../../../models/BusinessModels/Catalogs/ArticlesModel/ArticlesModel.js";


// ===== Controller Functions

// Function to create a Article and error handling
export const createArticle = async (req, res) => {
    try {
        const data = req.body;
        const status = await Article.insert(data);
        if(status){ // If status = true: Insertion Successfull
            res.json(
                { 
                    status: status, 
                    message: 'Artículo creado exitosamente'
                }
            );
        }else{ // Insertion Not Successfull
            res.status(500).json({ error: "Hubo un problema al crear el Artículo." });
        }
    } catch (error) {
        // Return error without the precise message  
        res.status(500).json({ error: "Hubo un problema al crear el Artículo." });
    }
};

// Function to get all the Articles in db and error handling
export const getAllArticles = async (req, res) => {
    try {
        const [status, Articles] = await Article.getAll();
        if(status){ // Operation Succesfull
            res.json(
                { 
                    Articles: Articles, 
                    message: 'Se obtuvieron los Artículos exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener los Artículos." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener los Artículos." });
    }
};

// Function to get all the Articles in db and error handling
export const getArticleByID = async (req, res) => {
    try {
        const id = req.body.id;
        const [status, Result] = await Article.getByID(id);
        if(status){ // Operation Succesfull|
            res.json(
                { 
                    Article: Result, 
                    message: 'Se obtuvo el Artículo exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener el Artículo." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener el Artículo." });
    }
};

// Function to get all the Articles in db and error handling
export const getArticleBy = async (req, res) => {
    try {
        const [status, Result] = await Article.getBy(req.body);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    Article: Result, 
                    message: 'Se obtuvo el artículo exitosamente.' 
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al obtener el artículo." });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Hubo un problema al obtener el artículo." });
    }
};

// Function to update a Article and error handling
export const updateArticle = async (req, res) => {
    try {
        const data = req.body.data;
        const id2Search = req.body.id; // Id to update
        const status = await Article.update(id2Search, data);
        if(status){ // Operation Succesfull
            res.json(
                {
                    status: status,
                    message: 'Artículo actualizado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al actualizar el Artículo." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al actualizar el Artículo." });
    }
};

// Function to Logic Delete a Article and error handling
export const ArticlelogicDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await Article.logicDelete(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Artículo eliminado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al eliminar el Artículo." });
        }  
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al eliminar el Artículo." });
    }
};

// Function to restore a Logic Elimination of a Article and error handling
export const RestoreArticle = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await Article.restore(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Artículo restaurado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al restaurar el Artículo." });
        }  
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al restaurar el Artículo." });
    }
};

// Function to Logic Delete a Article and error handling
export const ArticlephysicalDelete = async (req, res) => {
    try {
        const id = req.body.id;
        const status = await Article.physicalDelete(id);
        if(status){ // Operation Succesfull
            res.json(
                { 
                    status: status,
                    message: 'Artículo eliminado exitosamente'
                }
            );
        }else{ // Operation Not Succesfull
            res.status(500).json({ error: "Hubo un problema al eliminar el Artículo." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al eliminar el Artículo." });
    }
};