const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'admin@aiwforce.com' },
    update: {},
    create: {
      email: 'admin@aiwforce.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'pm@aiwforce.com' },
    update: {},
    create: {
      email: 'pm@aiwforce.com',
      password: hashedPassword,
      firstName: 'Project',
      lastName: 'Manager',
      role: 'PROJECT_MANAGER',
      status: 'ACTIVE'
    }
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'dev@aiwforce.com' },
    update: {},
    create: {
      email: 'dev@aiwforce.com',
      password: hashedPassword,
      firstName: 'Developer',
      lastName: 'User',
      role: 'DEVELOPER',
      status: 'ACTIVE'
    }
  });

  console.log('✓ Users created:', {
    user1: user1.email,
    user2: user2.email,
    user3: user3.email
  });

  // Create sample projects
  const project1 = await prisma.project.upsert({
    where: { id: 'banking-sys-proj' },
    update: {},
    create: {
      id: 'banking-sys-proj',
      name: 'Banking Management System',
      description:
        'A comprehensive banking solution for customer account management',
      domain: 'Banking',
      status: 'REQUIREMENTS_ANALYSIS',
      ownerId: user1.id,
      members: {
        create: [
          {
            userId: user2.id,
            role: 'MANAGER'
          },
          {
            userId: user3.id,
            role: 'DEVELOPER'
          }
        ]
      }
    }
  });

  const project2 = await prisma.project.upsert({
    where: { id: 'ecommerce-sys-proj' },
    update: {},
    create: {
      id: 'ecommerce-sys-proj',
      name: 'E-Commerce Management System',
      description:
        'An online retail platform with inventory and order management',
      domain: 'E-Commerce',
      status: 'DESIGN',
      ownerId: user2.id,
      members: {
        create: [
          {
            userId: user1.id,
            role: 'MANAGER'
          },
          {
            userId: user3.id,
            role: 'DEVELOPER'
          }
        ]
      }
    }
  });

  console.log('✓ Projects created:', {
    project1: project1.name,
    project2: project2.name
  });

  // Create sample requirements
  const req1 = await prisma.requirement.upsert({
    where: { id: 'req-banking-001' },
    update: {},
    create: {
      id: 'req-banking-001',
      projectId: project1.id,
      reqId: 'FR-001',
      title: 'Customer Registration',
      description: 'Allow customers to register with the system',
      type: 'FUNCTIONAL',
      priority: 'CRITICAL',
      status: 'APPROVED'
    }
  });

  const req2 = await prisma.requirement.upsert({
    where: { id: 'req-banking-002' },
    update: {},
    create: {
      id: 'req-banking-002',
      projectId: project1.id,
      reqId: 'FR-002',
      title: 'Fund Transfer',
      description: 'Enable secure fund transfers between accounts',
      type: 'FUNCTIONAL',
      priority: 'HIGH',
      status: 'REVIEW'
    }
  });

  console.log('✓ Requirements created');

  // Create sample agents
  const agentReq = await prisma.agent.upsert({
    where: { id: 'agent-req-001' },
    update: {},
    create: {
      id: 'agent-req-001',
      name: 'Requirement Analyst',
      type: 'REQUIREMENT_ANALYST',
      description:
        'AI agent for analyzing requirements and deriving user stories',
      status: 'ACTIVE'
    }
  });

  const agentPM = await prisma.agent.upsert({
    where: { id: 'agent-pm-001' },
    update: {},
    create: {
      id: 'agent-pm-001',
      name: 'Project Manager',
      type: 'PROJECT_MANAGER',
      description:
        'AI agent for project planning and task management',
      status: 'ACTIVE'
    }
  });

  const agentDev = await prisma.agent.upsert({
    where: { id: 'agent-dev-001' },
    update: {},
    create: {
      id: 'agent-dev-001',
      name: 'Developer',
      type: 'DEVELOPER',
      description:
        'AI agent for code generation and development assistance',
      status: 'ACTIVE'
    }
  });

  const agentQA = await prisma.agent.upsert({
    where: { id: 'agent-qa-001' },
    update: {},
    create: {
      id: 'agent-qa-001',
      name: 'QA Engineer',
      type: 'QA_ENGINEER',
      description:
        'AI agent for test case generation and quality assurance',
      status: 'ACTIVE'
    }
  });

  console.log('✓ Agents created:', {
    requirementAnalyst: agentReq.name,
    projectManager: agentPM.name,
    developer: agentDev.name,
    qaEngineer: agentQA.name
  });

  // Create sample task
  const task1 = await prisma.task.create({
    data: {
      projectId: project1.id,
      requirementId: req1.id,
      title: 'Implement Registration API',
      description:
        'Create REST API endpoints for customer registration',
      status: 'IN_PROGRESS',
      priority: 'CRITICAL',
      assignedToUserId: user3.id,
      estimatedEffort: 8,
      dueDate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      )
    }
  });

  console.log('✓ Tasks created:', task1.title);

  // Create sample conversation
  const conversation = await prisma.conversation.create({
    data: {
      projectId: project1.id,
      userId: user2.id,
      agentId: agentReq.id,
      title: 'Requirements Analysis for Banking System',
      status: 'ACTIVE'
    }
  });

  // User message
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: user2.id,
      senderType: 'USER',
      content:
        'Please analyze the SRS document for the banking system'
    }
  });

  // AI Agent message
  // senderId is null because senderId references the User table,
  // while this message is sent by an AI Agent.
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: null,
      senderType: 'AI_AGENT',
      content:
        'I have analyzed the SRS document. Here are the key requirements extracted...'
    }
  });

  console.log('✓ Conversations and messages created');

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });