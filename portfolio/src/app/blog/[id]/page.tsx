'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import Comments from '@/components/Comments'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  featured: boolean
  created_at: string
  author_email: string
}

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const isAdmin = useIsAdmin()
  const router = useRouter()
  const [showEdit, setShowEdit] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [refreshFlag, setRefreshFlag] = useState(0)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
      setPost(data)
      setLoading(false)
    }
    if (id) fetchPost()
  }, [id, refreshFlag])

  const handleDelete = async () => {
    if (!post) return
    setDeleting(true)
    setDeleteError('')
    const { error } = await supabase.from('blog_posts').delete().eq('id', post.id)
    if (error) {
      setDeleteError(error.message)
      setDeleting(false)
      return
    }
    setDeleting(false)
    router.push('/blog')
  }

  if (loading) return <div className="text-center py-12">Loading post...</div>
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>
  if (!post) return <div className="text-center py-12 text-gray-500">Post not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{post.title}</h1>
      <p className="text-lg text-gray-500 mb-6 font-medium">{post.excerpt}</p>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-500 text-sm">By {post.author_email}</span>
        {post.featured && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold border border-blue-300">Featured</span>}
      </div>
      <div className="flex gap-2 mb-6">
        {post.tags?.map((tag) => (
          <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <div className="prose prose-lg max-w-none text-gray-900 mb-8 whitespace-pre-line">{post.content}</div>
      {/* Admin actions placeholder */}
      {isAdmin && (
        <div className="mb-8 flex gap-4">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => setShowEdit(true)}>Edit</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
      {deleteError && <div className="text-red-600 mb-4">{deleteError}</div>}
      {/* Edit Modal (UI only) */}
      {showEdit && post && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setShowEdit(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Edit Blog Post</h2>
            <EditBlogForm post={post} onClose={() => { setShowEdit(false); setRefreshFlag(f => f + 1); }} />
          </div>
        </div>
      )}
      {/* Comments section */}
      <div className="mt-12">
        <Comments blog_post_id={post.id} titleClassName="text-2xl font-bold mb-4 text-gray-900" />
      </div>
    </div>
  )
}

function EditBlogForm({ post, onClose }: { post: any, onClose: () => void }) {
  const [title, setTitle] = useState(post.title)
  const [excerpt, setExcerpt] = useState(post.excerpt)
  const [content, setContent] = useState(post.content)
  const [tags, setTags] = useState(post.tags?.join(', ') || '')
  const [featured, setFeatured] = useState(post.featured)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: updateError } = await supabase.from('blog_posts').update({
      title,
      excerpt,
      content,
      tags: tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      featured,
    }).eq('id', post.id)
    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }
    setLoading(false)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900">Title</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Excerpt</label>
        <textarea
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          rows={2}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Content</label>
        <textarea
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={6}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Tags (comma separated)</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured-edit"
          checked={featured}
          onChange={e => setFeatured(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="featured-edit" className="text-sm text-gray-900">Featured</label>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
} 