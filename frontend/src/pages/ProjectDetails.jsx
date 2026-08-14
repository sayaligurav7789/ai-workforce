import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'
import ProgressBar from '../components/common/ProgressBar'
import { projects } from '../data/projects'

function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const project = projects.find(p => p.id === parseInt(id))

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-4">Project not found</p>
        <button
          onClick={() => navigate('/projects')}
          className="btn-primary"
        >
          Back to Projects
        </button>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'agents', label: 'AI Agents' },
    { id: 'documents', label: 'Documents' },
    { id: 'activity', label: 'Activity' },
  ]

  return (
    <div>
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-primary hover:text-primary-dark mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Projects
      </button>

      <div className="card p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-text-primary mb-2">{project.name}</h1>
            <p className="text-text-secondary mb-4">{project.description}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-sm text-text-secondary mb-1">Manager</p>
            <p className="font-medium text-text-primary">{project.manager}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary mb-1">Progress</p>
            <p className="font-medium text-text-primary">{project.progress}%</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary mb-1">Start Date</p>
            <p className="font-medium text-text-primary">{project.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary mb-1">Due Date</p>
            <p className="font-medium text-text-primary">{project.dueDate}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-text-secondary mb-2">Overall Progress</p>
          <ProgressBar progress={project.progress} showLabel={false} size="lg" />
        </div>
      </div>

      <div className="card">
        <div className="border-b border-border-light flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Project Description</h3>
                <p className="text-text-secondary">{project.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Key Information</h3>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li>Status: <span className="font-medium">{project.status}</span></li>
                  <li>Progress: <span className="font-medium">{project.progress}%</span></li>
                  <li>Manager: <span className="font-medium">{project.manager}</span></li>
                  <li>Duration: <span className="font-medium">{project.startDate} to {project.dueDate}</span></li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="text-text-secondary">
              <p>Requirements section will be populated from the backend.</p>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="text-text-secondary">
              <p>Tasks section will be populated from the backend.</p>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="text-text-secondary">
              <p>AI Agents section will be populated from the backend.</p>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="text-text-secondary">
              <p>Documents section will be populated from the backend.</p>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="text-text-secondary">
              <p>Activity section will be populated from the backend.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
