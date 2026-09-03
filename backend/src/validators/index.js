const { z } = require('zod');

const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required')
});

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  domain: z.string().min(1, 'Domain is required')
});

const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  domain: z.string().min(1).optional(),
  status: z.enum([
    'PLANNING', 'REQUIREMENTS_ANALYSIS', 'DESIGN', 'DEVELOPMENT',
    'TESTING', 'DEPLOYMENT', 'MAINTENANCE', 'COMPLETED', 'ARCHIVED'
  ]).optional()
});

const createRequirementSchema = z.object({
  projectId: z.string().min(1),
  reqId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['FUNCTIONAL', 'NON_FUNCTIONAL', 'CONSTRAINT', 'BUSINESS', 'TECHNICAL']).default('FUNCTIONAL'),
  priority: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).default('MEDIUM')
});

const createTaskSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).default('MEDIUM'),
  estimatedEffort: z.number().optional(),
  dueDate: z.string().datetime().optional()
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'BLOCKED', 'REVIEW', 'COMPLETED', 'CANCELLED']).optional(),
  priority: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).optional(),
  assignedToUserId: z.string().optional(),
  dueDate: z.string().datetime().optional()
});

const createConversationSchema = z.object({
  projectId: z.string().optional(),
  agentId: z.string().optional(),
  title: z.string().optional()
});

const addMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  senderType: z.enum(['USER', 'AI_AGENT', 'SYSTEM']).default('USER')
});

module.exports = {
  registerSchema,
  loginSchema,
  createProjectSchema,
  updateProjectSchema,
  createRequirementSchema,
  createTaskSchema,
  updateTaskSchema,
  createConversationSchema,
  addMessageSchema
};
