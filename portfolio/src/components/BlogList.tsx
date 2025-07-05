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
  category_id?: string
  subcategory_id?: string
  category?: { id: string, name: string }
  subcategory?: { id: string, name: string }
}

export default function BlogList({ refreshFlag }: { refreshFlag?: number }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let subscription: RealtimeChannel | null = null
    const fetchPosts = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, category:category_id(id, name), subcategory:subcategory_id(id, name)')
        .order('created_at', { ascending: false })
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
      // Exclude LifeStyle posts
      const filtered = (data || []).filter(post => post.category?.name !== 'LifeStyle')
      setPosts(filtered)
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

  // Group posts by category
  const postsByCategory: { [cat: string]: BlogPost[] } = {}
  filteredPosts.forEach(post => {
    const cat = post.category?.name || 'Other'
    if (!postsByCategory[cat]) postsByCategory[cat] = []
    postsByCategory[cat].push(post)
  })

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
      {/* Grouped by Category */}
      {Object.entries(postsByCategory).map(([cat, catPosts]) => (
        <div key={cat} className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{cat}</h2>
          {/* Featured Post */}
          {catPosts.filter(p => p.featured).map((post) => (
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
            {catPosts.filter(p => !p.featured).map((post) => (
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
          {catPosts.length === 0 && (
            <div className="text-center py-8 text-gray-500">No posts in this category.</div>
          )}
        </div>
      ))}
      {/* Pagination (disabled for grouped view) */}
    </>
  )
} 