import { useState } from 'react'
import {
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

const MyNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'System Design Interview Prep',
      content: 'Key concepts: Scalability, Load Balancing, Caching, Database Sharding...',
      category: 'Technical',
      lastModified: '2024-01-15',
      tags: ['system-design', 'interview']
    },
    {
      id: 2,
      title: 'Behavioral Questions - STAR Method',
      content: 'Situation, Task, Action, Result framework for answering behavioral questions...',
      category: 'Behavioral',
      lastModified: '2024-01-14',
      tags: ['behavioral', 'star-method']
    },
    {
      id: 3,
      title: 'JavaScript Advanced Concepts',
      content: 'Closures, Prototypes, Async/Await, Event Loop...',
      category: 'Technical',
      lastModified: '2024-01-13',
      tags: ['javascript', 'frontend']
    },
    {
      id: 4,
      title: 'Company Research - Google',
      content: 'Mission: Organize world\'s information. Products: Search, Cloud, Android...',
      category: 'Research',
      lastModified: '2024-01-12',
      tags: ['google', 'company-research']
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddNote, setShowAddNote] = useState(false)

  const categories = ['All', 'Technical', 'Behavioral', 'Research']

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">My Notes</h1>
        <button
          onClick={() => setShowAddNote(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Note</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <div key={note.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  note.category === 'Technical' ? 'bg-green-600 text-green-100' :
                  note.category === 'Behavioral' ? 'bg-blue-600 text-blue-100' :
                  'bg-purple-600 text-purple-100'
                }`}>
                  {note.category}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
              {note.title}
            </h3>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {note.content}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            <p className="text-xs text-gray-500">
              Last modified: {note.lastModified}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No notes found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Start by creating your first note'}
          </p>
          <button
            onClick={() => setShowAddNote(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Create Note
          </button>
        </div>
      )}

      {/* Add Note Modal (placeholder) */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4">
            <h2 className="text-xl font-bold text-white mb-4">Add New Note</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Note title..."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Technical">Technical</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Research">Research</option>
              </select>
              <textarea
                placeholder="Write your note..."
                rows={6}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddNote(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddNote(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyNotes