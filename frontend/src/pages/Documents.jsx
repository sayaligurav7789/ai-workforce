import { useState } from 'react'
import { Upload, Search, Filter } from 'lucide-react'
import { documents as initialDocuments } from '../data/documents'

function Documents() {
  const [documentList, setDocumentList] = useState(initialDocuments)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All Types')

  const documentTypes = ['All Types', ...new Set(documentList.map(d => d.type))]

  const filteredDocuments = documentList.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'All Types' || doc.type === filterType
    return matchesSearch && matchesType
  })

  const handleFileUpload = (e) => {
    const files = e.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const newDoc = {
          id: documentList.length + i + 1,
          name: file.name,
          project: 'New Project',
          type: 'Documentation',
          uploadedOn: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        }
        setDocumentList(prev => [...prev, newDoc])
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Documents</h1>
          <p className="text-text-secondary">Upload and manage project documents</p>
        </div>
        <label className="btn-primary flex items-center gap-2 cursor-pointer">
          <Upload className="w-5 h-5" />
          Upload Document
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          />
        </label>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-field"
          >
            {documentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-6 py-3 text-left">Document Name</th>
                <th className="px-6 py-3 text-left">Project</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Uploaded On</th>
                <th className="px-6 py-3 text-left">Size</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-border-light hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-primary hover:text-primary-dark">
                      {doc.name}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-sm">{doc.project}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-sm">{doc.uploadedOn}</td>
                  <td className="px-6 py-4 text-text-secondary text-sm">{doc.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-border-light">
          <p className="text-sm text-text-secondary">Showing 1 to {filteredDocuments.length} of {documentList.length} documents</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border-light rounded-lg text-text-secondary hover:bg-gray-50">1</button>
            <button className="px-3 py-1 border border-border-light rounded-lg text-text-secondary hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-border-light rounded-lg text-text-secondary hover:bg-gray-50">3</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documents
