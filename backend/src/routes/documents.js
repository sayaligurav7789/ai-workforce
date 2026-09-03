const express = require('express');
const { controller: documentController, upload } = require('../controllers/documentController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/projects/:projectId/upload', upload.single('file'), (req, res, next) => documentController.uploadDocument(req, res, next));
router.get('/projects/:projectId', (req, res, next) => documentController.getProjectDocuments(req, res, next));
router.delete('/:id', (req, res, next) => documentController.deleteDocument(req, res, next));

module.exports = router;
