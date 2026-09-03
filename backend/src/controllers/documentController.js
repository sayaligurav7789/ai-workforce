const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

class DocumentController {
  async uploadDocument(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const document = await prisma.projectDocument.create({
        data: {
          projectId: req.params.projectId,
          fileName: req.file.filename,
          originalFileName: req.file.originalname,
          fileType: path.extname(req.file.originalname).substring(1),
          filePath: `/uploads/${req.file.filename}`,
          fileSize: req.file.size,
          uploadedById: req.user?.id,
          processingStatus: 'PENDING'
        }
      });

      res.status(201).json({
        success: true,
        message: 'Document uploaded',
        data: document
      });
    } catch (error) {
      next(error);
    }
  }

  async getProjectDocuments(req, res, next) {
    try {
      const documents = await prisma.projectDocument.findMany({
        where: { projectId: req.params.projectId },
        orderBy: { uploadedAt: 'desc' }
      });
      res.status(200).json({
        success: true,
        data: documents
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteDocument(req, res, next) {
    try {
      await prisma.projectDocument.delete({
        where: { id: req.params.id }
      });
      res.status(200).json({
        success: true,
        message: 'Document deleted'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  controller: new DocumentController(),
  upload
};
