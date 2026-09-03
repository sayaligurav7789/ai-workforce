const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ConversationController {
  async createConversation(req, res, next) {
    try {
      const { projectId, agentId, title } = req.body;
      const conversation = await prisma.conversation.create({
        data: {
          projectId,
          agentId,
          userId: req.user?.id,
          title,
          status: 'ACTIVE'
        }
      });
      res.status(201).json({
        success: true,
        message: 'Conversation created',
        data: conversation
      });
    } catch (error) {
      next(error);
    }
  }

  async getConversations(req, res, next) {
    try {
      const conversations = await prisma.conversation.findMany({
        where: { projectId: req.params.projectId },
        include: { messages: { take: 1, orderBy: { createdAt: 'desc' } } },
        orderBy: { updatedAt: 'desc' }
      });
      res.status(200).json({
        success: true,
        data: conversations
      });
    } catch (error) {
      next(error);
    }
  }

  async addMessage(req, res, next) {
    try {
      const { content, senderType = 'USER' } = req.body;
      const message = await prisma.message.create({
        data: {
          conversationId: req.params.id,
          senderId: req.user?.id,
          senderType,
          content
        }
      });
      res.status(201).json({
        success: true,
        data: message
      });
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req, res, next) {
    try {
      const messages = await prisma.message.findMany({
        where: { conversationId: req.params.id },
        include: { sender: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: 'asc' }
      });
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ConversationController();
