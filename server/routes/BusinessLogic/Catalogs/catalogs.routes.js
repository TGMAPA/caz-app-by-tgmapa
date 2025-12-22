// Modules
import express from 'express';

// === Controllers Functions
// Groups Controller
import { 
    createGroup, 
    getAllGroups, 
    getGroupByID, 
    updateGroup,  
    GrouplogicDelete, 
    GroupphysicalDelete,
    getGroupBy,
    RestoreGroup
} from '../../../controllers/BusinessLogic/Catalogs/groups.controller.js';

// Lines Controller
import { 
    createLine, 
    getAllLines, 
    getLineByID, 
    updateLine,  
    LinelogicDelete, 
    LinephysicalDelete,
    getLineBy,
    RestoreLine
} from '../../../controllers/BusinessLogic/Catalogs/lines.controller.js';

// Articles Controller
import { 
    createArticle, 
    getAllArticles, 
    getArticleByID, 
    updateArticle,  
    ArticlelogicDelete, 
    ArticlephysicalDelete,
    getArticleBy,
    RestoreArticle
} from '../../../controllers/BusinessLogic/Catalogs/articles.controller.js';

// UnitOfMeasurement Controller
import { 
    createUnitOfMeasurement, 
    getAllUnitsOfMeasurement, 
    getUnitOfMeasurementByID, 
    updateUnitsOfMeasurement,  
    UnitsOfMeasurementlogicDelete, 
    UnitsOfMeasurementphysicalDelete,
    getUnitOfMeasurementBy,
    RestoreUnitsOfMeasurement
} from '../../../controllers/BusinessLogic/Catalogs/unitsOfMeasurement.controller.js';



// -- Router Instance for routes handling
const router = express.Router();

// =============== Catalogs Routes

// ----- Groups -----
// Create Group
router.post('/createGroup', createGroup);

// Get All Groups
router.post('/getAllGroups', getAllGroups);

// Get Group by ID
router.post('/getGroupByID', getGroupByID);

// Get Group by filter
router.post('/getGroupBy', getGroupBy);

// Update Group
router.post('/updateGroup', updateGroup);

// Logical Delete Group
router.post('/groupLogicalDelete', GrouplogicDelete);

// Restore Group
router.post('/groupRestore', RestoreGroup);

// Physical Delete Group
router.post('/groupPhysicalDelete', GroupphysicalDelete);


// ----- Lines -----
// Create Line
router.post('/createLine', createLine);

// Get All Lines
router.post('/getAllLines', getAllLines);

// Get Line by ID
router.post('/getLineByID', getLineByID);

// Get Line by filter
router.post('/getLineBy', getLineBy);

// Update Line
router.post('/updateLine', updateLine);

// Logical Delete Line
router.post('/lineLogicalDelete', LinelogicDelete);

// Restore Line
router.post('/lineRestore', RestoreLine);

// Physical Delete Line
router.post('/linePhysicalDelete', LinephysicalDelete);



// ----- Articles -----
// Create Article
router.post('/createArticle', createArticle);

// Get All Articles
router.post('/getAllArticles', getAllArticles);

// Get Article by ID
router.post('/getArticleByID', getArticleByID);

// Get Article by filter
router.post('/getArticleBy', getArticleBy);

// Update Article
router.post('/updateArticle', updateArticle);

// Logical Delete Article
router.post('/articleLogicalDelete', ArticlelogicDelete);

// Restore Article
router.post('/articleRestore', RestoreArticle);

// Physical Delete Article
router.post('/articlePhysicalDelete', ArticlephysicalDelete);



// ----- UnitOfMeasurement -----
// Create UnitOfMeasurement
router.post('/createUnitOfMeasurement', createUnitOfMeasurement);

// Get All UnitOfMeasurement
router.post('/getAllUnitsOfMeasurement', getAllUnitsOfMeasurement);

// Get UnitOfMeasurement by ID
router.post('/getUnitOfMeasurementByID', getUnitOfMeasurementByID);

// Get UnitOfMeasurement by filter
router.post('/getUnitOfMeasurementBy', getUnitOfMeasurementBy);

// Update UnitOfMeasurement
router.post('/updateUnitOfMeasurement', updateUnitsOfMeasurement);

// Logical Delete UnitOfMeasurement
router.post('/unitOfMeasurementLogicalDelete', UnitsOfMeasurementlogicDelete);

// Restore unitOfMeasurement
router.post('/unitOfMeasurementRestore', RestoreUnitsOfMeasurement);

// Physical Delete unitOfMeasurement
router.post('/unitOfMeasurementPhysicalDelete', UnitsOfMeasurementphysicalDelete);


// =============== Catalogs Routes


export default router;