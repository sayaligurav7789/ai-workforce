import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter } from 'lucide-react'
import Modal from '../components/common/Modal'
import StatusBadge from '../components/common/StatusBadge'
import ProgressBar from '../components/common/ProgressBar'
import { projects as initialProjects } from '../data/projects'

function Projects() {
  const [projectList, setProjectList] = useState(initialProjects)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manager: '',
    startDate: '',
    dueDate: '',
    status: 'Planning',
  })

  const filteredProjects = projectList.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateProject = () => {
    if (formData.name && formData.manager) {
      const newProject = {
        id: projectList.length + 1,
        ...formData,
        progress: 0,
        createdOn: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      }
      setProjectList([...projectList, newProject])
      setFormData({
        name: '',
        description: '',
        manager: '',
        startDate: '',
        dueDate: '',
        status: 'Planning',
      })
      setIsModalOpen(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Projects</h1>
          <p className="text-text-secondary">Manage and track all your projects</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2 px-4">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-6 py-3 text-left">Project Name</th>
                <th className="px-6 py-3 text-left">Manager</th>
                <th className="px-6 py-3 text-left">Progress</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Created On</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-border-light hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      to={`/projects/${project.id}`}
                      className="font-medium text-primary hover:text-primary-dark"
                    >
                      {project.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-text-primary">{project.manager}</td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      <ProgressBar progress={project.progress} showLabel={true} size="sm" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-sm">{project.createdOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-border-light">
          <p className="text-sm text-text-secondary">Showing 1 to {filteredProjects.length} of {projectList.length} projects</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border-light rounded-lg text-text-secondary hover:bg-gray-50">1</button>
            <button className="px-3 py-1 border border-border-light rounded-lg text-text-secondary hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-border-light rounded-lg text-text-secondary hover:bg-gray-50">3</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Create New Project"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
        submitText="Create Project"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Project Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field w-full"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field w-full"
              placeholder="Enter project description"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Manager</label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              className="input-field w-full"
              placeholder="Enter manager name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="input-field w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="input-field w-full"
            >
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Projects
