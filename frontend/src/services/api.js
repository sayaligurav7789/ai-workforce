const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

export const apiService = {
  projects: {
    getAll: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`)
        return await response.json()
      } catch (error) {
        console.error('Error fetching projects:', error)
        return []
      }
    },

    getById: async (id) => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`)
        return await response.json()
      } catch (error) {
        console.error('Error fetching project:', error)
        return null
      }
    },

    create: async (data) => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        return await response.json()
      } catch (error) {
        console.error('Error creating project:', error)
        return null
      }
    },

    update: async (id, data) => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        return await response.json()
      } catch (error) {
        console.error('Error updating project:', error)
        return null
      }
    },

    delete: async (id) => {
      try {
        await fetch(`${API_BASE_URL}/projects/${id}`, { method: 'DELETE' })
        return true
      } catch (error) {
        console.error('Error deleting project:', error)
        return false
      }
    },
  },

  tasks: {
    getAll: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks`)
        return await response.json()
      } catch (error) {
        console.error('Error fetching tasks:', error)
        return []
      }
    },

    create: async (data) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        return await response.json()
      } catch (error) {
        console.error('Error creating task:', error)
        return null
      }
    },

    update: async (id, data) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        return await response.json()
      } catch (error) {
        console.error('Error updating task:', error)
        return null
      }
    },
  },

  agents: {
    getAll: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/agents`)
        return await response.json()
      } catch (error) {
        console.error('Error fetching agents:', error)
        return []
      }
    },

    chat: async (agentId, message) => {
      try {
        const response = await fetch(`${API_BASE_URL}/agents/${agentId}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        })
        return await response.json()
      } catch (error) {
        console.error('Error sending message:', error)
        return null
      }
    },
  },

  documents: {
    getAll: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/documents`)
        return await response.json()
      } catch (error) {
        console.error('Error fetching documents:', error)
        return []
      }
    },

    upload: async (file, projectId) => {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('projectId', projectId)

        const response = await fetch(`${API_BASE_URL}/documents/upload`, {
          method: 'POST',
          body: formData,
        })
        return await response.json()
      } catch (error) {
        console.error('Error uploading document:', error)
        return null
      }
    },
  },

  reports: {
    getAnalytics: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reports/analytics`)
        return await response.json()
      } catch (error) {
        console.error('Error fetching analytics:', error)
        return null
      }
    },

    getProjectReport: async (projectId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/reports/projects/${projectId}`)
        return await response.json()
      } catch (error) {
        console.error('Error fetching project report:', error)
        return null
      }
    },
  },
}

export default apiService
