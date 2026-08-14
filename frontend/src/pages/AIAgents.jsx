import { useNavigate } from 'react-router-dom'
import { MessageCircle, Zap, BookOpen, CheckCircle } from 'lucide-react'
import { agents, agentActivities } from '../data/agents'

function AIAgents() {
  const navigate = useNavigate()

  const getAgentIcon = (iconName) => {
    const iconMap = {
      requirement: <BookOpen className="w-8 h-8" />,
      project: <Zap className="w-8 h-8" />,
      developer: <CheckCircle className="w-8 h-8" />,
      qa: <CheckCircle className="w-8 h-8" />,
    }
    return iconMap[iconName] || <MessageCircle className="w-8 h-8" />
  }

  const handleOpenChat = (agentId) => {
    navigate('/chat')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">AI Agents Hub</h1>
        <p className="text-text-secondary">Collaborative AI agents working on your project</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {agents.map((agent) => (
          <div key={agent.id} className="card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary-light p-3 rounded-lg text-primary">
                {getAgentIcon(agent.icon)}
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            <h3 className="font-bold text-text-primary mb-2">{agent.name}</h3>
            <p className="text-text-secondary text-sm mb-4 flex-1">{agent.description}</p>

            <button
              onClick={() => handleOpenChat(agent.id)}
              className="btn-primary w-full"
            >
              Open Chat
            </button>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-bold text-text-primary mb-6">Agent Activity</h2>
        <div className="space-y-4">
          {agentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border-light last:border-b-0">
              <div className="flex-1">
                <p className="font-medium text-text-primary text-sm">{activity.agent}</p>
                <p className="text-text-secondary text-sm mt-1">{activity.activity}</p>
              </div>
              <p className="text-xs text-text-secondary whitespace-nowrap">{activity.timestamp}</p>
            </div>
          ))}
        </div>
        <a href="#" className="text-primary hover:text-primary-dark text-sm font-medium mt-6 inline-block">
          View all agent activity
        </a>
      </div>
    </div>
  )
}

export default AIAgents
