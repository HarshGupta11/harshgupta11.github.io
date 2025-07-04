'use client'

import { useIsAdmin } from '@/hooks/useIsAdmin'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export default function BlogAdminActions() {
  const isAdmin = useIsAdmin()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!isAdmin) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    if (!user?.email) {
      setError('User email not found.')
      setLoading(false)
      return
    }
    const { error: insertError } = await supabase.from('blog_posts').insert([
      {
        title,
        excerpt,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        featured,
        author_email: user.email,
      }
    ])
    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }
    setLoading(false)
    setSuccess('Blog post created!')
    setTitle('')
    setExcerpt('')
    setContent('')
    setTags('')
    setFeatured(false)
    setIsOpen(false)
  }

  return (
    <>
      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        + Create New Blog
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  rows={2}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={6}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={e => setFeatured(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">Featured</label>
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Blog Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
} 