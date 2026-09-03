# AI Workforce Backend

A production-ready Node.js + Express.js backend for the **AI Workforce** platform - a multi-agent AI system for intelligent Software Development Lifecycle (SDLC) automation.

## 🎯 Overview

The backend provides a complete REST API for managing:
- **Projects & SRS Documents** - Upload and manage software requirement specifications
- **Requirements Management** - Extract and organize requirements from SRS documents
- **Task & Project Management** - Create tasks, milestones, and track progress
- **AI Agent Integration** - Generic interfaces for integrating specialized AI agents
- **Conversations** - Support AI-human conversations and interactions
- **Generated Artifacts** - Store and manage AI-generated outputs
- **Notifications** - Real-time notification system

## 📋 Technology Stack

- **Runtime**: Node.js >= 18
- **Framework**: Express.js 4
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Zod
- **File Upload**: Multer
- **Security**: Helmet, CORS

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                    # Express application entry point
│   ├── config/                   # Configuration files
│   ├── controllers/              # Request handlers
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   ├── requirementController.js
│   │   ├── documentController.js
│   │   ├── agentController.js
│   │   ├── conversationController.js
│   │   ├── notificationController.js
│   │   └── artifactController.js
│   ├── middleware/               # Express middleware
│   │   └── auth.js              # Authentication & authorization
│   ├── routes/                   # API route definitions
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── tasks.js
│   │   ├── requirements.js
│   │   ├── documents.js
│   │   ├── agents.js
│   │   ├── conversations.js
│   │   ├── notifications.js
│   │   └── artifacts.js
│   ├── services/                 # Business logic
│   │   ├── authService.js
│   │   ├── projectService.js
│   │   ├── taskService.js
│   │   └── requirementService.js
│   ├── utils/                    # Utility functions
│   └── validators/               # Input validation schemas (Zod)
│       └── index.js
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.js                   # Database seeding script
├── uploads/                      # Local file storage for uploads
├── tests/                        # Test files
├── .env.example                  # Example environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies & scripts
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL database running on localhost:5432
- npm or yarn package manager

### Installation

1. **Extract the backend folder**
```bash
# Navigate to your project directory
cd AI-WorkForce
# Backend folder should already be here
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your configuration
# Most importantly, update:
# - DATABASE_URL (your PostgreSQL connection string)
# - JWT_SECRET (change to a strong secret)
# - PORT (if needed)
```

4. **Setup Prisma and Database**
```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed database with sample data
npm run db:seed
```

5. **Start the backend**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will start on `http://localhost:5000` (or the PORT specified in .env)

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile (requires auth)

### Projects
- `POST /api/projects` - Create a project
- `GET /api/projects` - List user's projects
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add project member
- `DELETE /api/projects/:id/members/:userId` - Remove project member

### Requirements
- `POST /api/requirements` - Create a requirement
- `GET /api/requirements/projects/:projectId` - Get project requirements
- `GET /api/requirements/:id` - Get requirement details
- `PUT /api/requirements/:id` - Update requirement
- `DELETE /api/requirements/:id` - Delete requirement

### Tasks
- `POST /api/tasks` - Create a task
- `GET /api/tasks/projects/:projectId` - Get project tasks
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Documents
- `POST /api/documents/projects/:projectId/upload` - Upload SRS document
- `GET /api/documents/projects/:projectId` - Get project documents
- `DELETE /api/documents/:id` - Delete document

### Agents
- `GET /api/agents` - List all agents
- `GET /api/agents/:id` - Get agent details

### Conversations
- `POST /api/conversations` - Create conversation
- `GET /api/conversations/projects/:projectId` - Get project conversations
- `POST /api/conversations/:id/messages` - Add message to conversation
- `GET /api/conversations/:id/messages` - Get conversation messages

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/mark-all-read` - Mark all as read

### Artifacts
- `GET /api/artifacts/projects/:projectId` - Get project artifacts
- `GET /api/artifacts/:id` - Get artifact details

### Health Check
- `GET /api/health` - Check backend health status

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Tokens are obtained by:
1. Registering a new user: `POST /api/auth/register`
2. Logging in: `POST /api/auth/login`

Tokens expire after 24 hours.

## 📦 Database Schema

The database includes the following main entities:

- **User** - System users with roles (ADMIN, PROJECT_MANAGER, DEVELOPER, QA, USER)
- **Project** - Development projects with status tracking
- **ProjectMember** - Project membership with roles
- **ProjectDocument** - Uploaded SRS documents
- **Requirement** - Extracted requirements from SRS
- **UserStory** - User stories derived from requirements
- **AcceptanceCriteria** - Acceptance criteria for user stories
- **Task** - Development tasks with assignments
- **Milestone** - Project milestones for tracking
- **Agent** - AI agents (Requirement Analyst, PM, Developer, QA)
- **AgentRun** - Execution records of AI agents
- **Conversation** - Conversations with AI or between users
- **Message** - Messages in conversations
- **GeneratedArtifact** - AI-generated outputs
- **Notification** - User notifications
- **Activity** - Audit log for tracking changes

See `prisma/schema.prisma` for detailed schema definition.

## 🔗 Frontend Integration

The backend is designed to work with the frontend located in `../frontend/`. 

Frontend API calls should be made to:
- Development: `http://localhost:5000/api`
- Production: Configure via `CLIENT_URL` environment variable

The frontend is expected to:
1. Call `/api/auth/register` or `/api/auth/login` to get JWT token
2. Include JWT token in Authorization header for all subsequent requests
3. Handle 401/403 responses for authentication/authorization errors

## 🤖 AI Integration Boundary

The backend provides clean interfaces for future AI integration:

### For AI Teams:
The AI layer can integrate by:
1. **Creating Agent Runs**: Store AI execution requests/results
2. **Generating Artifacts**: Store AI-generated requirements, user stories, tasks, etc.
3. **Processing Documents**: Implement SRS document processing
4. **Managing Conversations**: Handle multi-turn AI conversations

### Current Status:
- ✅ Generic Agent model (supports REQUIREMENT_ANALYST, PROJECT_MANAGER, DEVELOPER, QA_ENGINEER, GENERIC)
- ✅ AgentRun model for storing execution records
- ✅ Conversation & Message models for AI interactions
- ✅ GeneratedArtifact model for storing outputs
- ⏳ Actual LLM integration (pending AI team implementation)
- ⏳ RAG/Vector database integration (pending AI team implementation)
- ⏳ n8n workflow orchestration (pending orchestration team implementation)

### Integration Points:
- Store LLM API keys/config in Agent.configuration (JSON field)
- Use AgentRun to log AI execution (input, output, status, errors)
- Create GeneratedArtifact records for all AI-generated content
- Post messages to Conversation for multi-turn interactions
- Create tasks/requirements from AI analysis

## 🧪 Testing

Basic functionality tests are included:

```bash
npm run test
```

For comprehensive testing, additional test files should be created in the `tests/` directory.

## 📝 Environment Variables

Key environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | ✅ | PostgreSQL connection string |
| JWT_SECRET | ✅ | Secret key for JWT signing |
| PORT | ❌ | Server port (default: 5000) |
| NODE_ENV | ❌ | Environment (development/production) |
| CLIENT_URL | ❌ | Frontend URL for CORS (default: http://localhost:3000) |
| AI_SERVICE_URL | ❌ | AI service URL (for future integration) |
| N8N_WEBHOOK_URL | ❌ | n8n webhook URL (for orchestration) |

## 🔒 Security Considerations

The backend implements:
- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ CORS protection
- ✅ Helmet.js for HTTP header security
- ✅ Input validation with Zod
- ✅ Protected routes with middleware
- ✅ Role-based authorization

**Production Recommendations:**
- Use strong JWT_SECRET (min 32 characters)
- Enable HTTPS
- Set appropriate CORS origins
- Use environment-specific .env files
- Enable database encryption
- Set up database backups
- Monitor logs for security events

## 📊 Database Backup & Reset

```bash
# Reset database (WARNING: deletes all data)
npm run db:reset

# Run migrations only
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate
```

## 🐛 Troubleshooting

### Database Connection Error
```
Error: Can't reach database server
```
- Verify PostgreSQL is running on localhost:5432
- Check DATABASE_URL in .env
- Ensure database `ai_workforce` exists

### Port Already in Use
```
Error: listen EADDRINUSE
```
- Change PORT in .env
- Or kill process using the port

### JWT Errors
```
Error: Invalid token / Token expired
```
- Tokens expire after 24 hours
- Users need to re-login to get new token
- Verify JWT_SECRET hasn't changed

### File Upload Issues
```
Error: File too large
```
- Check MAX_FILE_SIZE in .env (default 100MB)
- Ensure uploads/ directory is writable
- Check disk space

## 📖 API Documentation

Detailed API documentation with examples:

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Project",
    "description": "Project description",
    "domain": "Banking"
  }'
```

## 🚢 Deployment

The backend can be deployed to any Node.js hosting platform:
- **Vercel** - Serverless deployment
- **Railway** - Simple platform
- **Render** - Platform-as-a-service
- **AWS EC2/ECS** - Infrastructure
- **Docker** - Containerized deployment

### Docker Deployment Example
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
CMD ["npm", "start"]
```

## 📞 Support & Documentation

- **Prisma**: https://www.prisma.io/docs/
- **Express.js**: https://expressjs.com/
- **Zod Validation**: https://zod.dev/
- **JWT**: https://jwt.io/

## 📄 License

MIT License - see LICENSE file for details

## 🎓 Final Notes

This backend is designed to be:
- **Modular**: Easy to add new features
- **Scalable**: Ready for production use
- **Maintainable**: Clean code structure
- **AI-Ready**: Clean integration points for AI services
- **Extensible**: Easy to add new endpoints and services

The architecture separates concerns into:
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Validators**: Ensure data quality
- **Middleware**: Handle cross-cutting concerns
- **Routes**: Define API endpoints

This separation makes it easy for different team members to work independently on different layers.

**Happy coding! 🚀**
