'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import type { RealtimeChannel } from '@supabase/supabase-js'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  featured: boolean
  created_at: string
  author_email: string
  thumbnail?: string
}

const POSTS_PER_PAGE = 6

export default function BlogList({ refreshFlag }: { refreshFlag?: number }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    let subscription: RealtimeChannel | null = null
    const fetchPosts = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()

    // Real-time subscription
    subscription = supabase
      .channel('blog_posts_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, () => {
        fetchPosts()
      })
      .subscribe()

    return () => {
      if (subscription) supabase.removeChannel(subscription)
    }
  }, [refreshFlag])

  // Filter by search
  const filteredPosts = posts.filter(post => {
    const q = search.toLowerCase()
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(q)))
    )
  })

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  const featuredPosts = paginatedPosts.filter(post => post.featured)
  const regularPosts = paginatedPosts.filter(post => !post.featured)

  const handlePrev = () => setPage(p => Math.max(1, p - 1))
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1))

  useEffect(() => {
    setPage(1)
  }, [search])

  if (loading) return <div className="text-center py-12">Loading blog posts...</div>
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>
  if (!posts.length) return <div className="text-center py-12 text-gray-500">No blog posts found.</div>

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search blog posts..."
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Featured Post */}
      {featuredPosts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🗾</div>
                <h3 className="text-2xl font-bold mb-2">Featured Post</h3>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Featured
                </span>
                <span className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-6">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              {post.thumbnail && (
                <Image
                  src={post.thumbnail}
                  alt={post.title + ' thumbnail'}
                  width={120}
                  height={80}
                  className="object-contain rounded-md border border-gray-200 bg-white"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {post.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold">Page {page} of {totalPages}</span>
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
} 