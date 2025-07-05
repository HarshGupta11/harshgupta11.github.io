'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import type { RealtimeChannel } from '@supabase/supabase-js'

interface CommentsProps {
  blog_post_id: string
  titleClassName?: string
}

interface Comment {
  id: string
  blog_post_id: string
  author_email: string
  content: string
  created_at: string
}

export default function Comments({ blog_post_id, titleClassName }: CommentsProps) {
  const { user } = useAuth()
  const isAdmin = useIsAdmin()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState('')

  const fetchComments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('blog_post_id', blog_post_id)
      .order('created_at', { ascending: true })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    setComments(data || [])
    setLoading(false)
  }

  useEffect(() => {
    let subscription: RealtimeChannel | null = null
    if (blog_post_id) fetchComments()
    // Real-time subscription
    subscription = supabase
      .channel('comments_changes_' + blog_post_id)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments', filter: `blog_post_id=eq.${blog_post_id}` }, () => {
        fetchComments()
      })
      .subscribe()
    return () => {
      if (subscription) supabase.removeChannel(subscription)
    }
  }, [blog_post_id, fetchComments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    if (!user?.email) {
      setError('You must be signed in to comment.')
      setSubmitting(false)
      return
    }
    if (!newComment.trim()) {
      setError('Comment cannot be empty.')
      setSubmitting(false)
      return
    }
    const { error: insertError } = await supabase.from('comments').insert([
      {
        blog_post_id,
        author_email: user.email,
        content: newComment.trim(),
      }
    ])
    if (insertError) {
      setError(insertError.message)
      setSubmitting(false)
      return
    }
    setNewComment('')
    setSubmitting(false)
    fetchComments() // Auto-refresh after add
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    setDeleteError('')
    const { error } = await supabase.from('comments').delete().eq('id', id)
    if (error) {
      setDeleteError(error.message)
      setDeletingId(null)
      return
    }
    setDeletingId(null)
    fetchComments() // Auto-refresh after delete
  }

  return (
    <div>
      <h2 className={titleClassName || "text-2xl font-bold mb-4"}>Comments</h2>
      {loading ? (
        <div className="text-gray-500">Loading comments...</div>
      ) : (
        <div className="space-y-4 mb-8">
          {comments.length === 0 && <div className="text-gray-500">No comments yet.</div>}
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-white">{comment.author_email}</span>
                <span className="text-xs text-gray-300">{new Date(comment.created_at).toLocaleString()}</span>
                {(isAdmin || user?.email === comment.author_email) && (
                  <button
                    className="ml-2 text-xs text-red-400 hover:underline disabled:opacity-50"
                    onClick={() => handleDelete(comment.id)}
                    disabled={deletingId === comment.id}
                  >
                    {deletingId === comment.id ? 'Deleting...' : 'Delete'}
                  </button>
                )}
              </div>
              <div className="text-white text-base whitespace-pre-line">{comment.content}</div>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder={user ? 'Add a comment...' : 'Sign in to comment'}
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          disabled={!user || submitting}
        />
        {error && <div className="text-red-600 text-sm mb-1">{error}</div>}
        <button
          type="submit"
          className="self-end bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
          disabled={!user || submitting}
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
      {deleteError && <div className="text-red-600 text-sm mb-2">{deleteError}</div>}
    </div>
  )
} 