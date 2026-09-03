const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class NotificationController {
  async getNotifications(req, res, next) {
    try {
      const { unreadOnly = false } = req.query;
      const notifications = await prisma.notification.findMany({
        where: {
          userId: req.user.id,
          ...(unreadOnly && { isRead: false })
        },
        orderBy: { createdAt: 'desc' },
        take: 50
      });
      res.status(200).json({
        success: true,
        data: notifications
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req, res, next) {
    try {
      const notification = await prisma.notification.update({
        where: { id: req.params.id },
        data: { isRead: true, readAt: new Date() }
      });
      res.status(200).json({
        success: true,
        data: notification
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req, res, next) {
    try {
      await prisma.notification.updateMany({
        where: { userId: req.user.id, isRead: false },
        data: { isRead: true, readAt: new Date() }
      });
      res.status(200).json({
        success: true,
        message: 'All notifications marked as read'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController();
