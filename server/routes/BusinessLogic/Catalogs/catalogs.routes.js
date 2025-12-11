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
    getGroupBy
} from '../../../controllers/BusinessLogic/Catalogs/groups.controller.js';

// Lines Controller
import { 
    createLine, 
    getAllLines, 
    getLineByID, 
    updateLine,  
    LinelogicDelete, 
    LinephysicalDelete 
} from '../../../controllers/BusinessLogic/Catalogs/lines.controller.js';

// Articles Controller
import { 
    createArticle, 
    getAllArticles, 
    getArticleByID, 
    updateArticle,  
    ArticlelogicDelete, 
    ArticlephysicalDelete 
} from '../../../controllers/BusinessLogic/Catalogs/articles.controller.js';



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

// Physical Delete Group
router.post('/groupPhysicalDelete', GroupphysicalDelete);


// ----- Lines -----
// Create Line
router.post('/createLine', createLine);

// Get All Lines
router.post('/getAllLines', getAllLines);

// Get Line by ID
router.post('/getLineByID', getLineByID);

// Update Line
router.post('/updateLine', updateLine);

// Logical Delete Line
router.post('/lineLogicalDelete', LinelogicDelete);

// Physical Delete Line
router.post('/linePhysicalDelete', LinephysicalDelete);



// ----- Articles -----
// Create Article
router.post('/createArticle', createArticle);

// Get All Articles
router.post('/getAllArticles', getAllArticles);

// Get Article by ID
router.post('/getArticleByID', getArticleByID);

// Update Article
router.post('/updateArticle', updateArticle);

// Logical Delete Article
router.post('/articleLogicalDelete', ArticlelogicDelete);

// Physical Delete Article
router.post('/articlePhysicalDelete', ArticlephysicalDelete);

// =============== Catalogs Routes


export default router;