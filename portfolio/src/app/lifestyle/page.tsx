'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

// BlogPost type for postsBySubcategory
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured: boolean;
  created_at: string;
  author_email: string;
  thumbnail?: string;
  subcategory_id?: string;
}

export default function LifestylePage() {
  const [activeTab, setActiveTab] = useState('')
  const [subcategories, setSubcategories] = useState<{ id: string, name: string }[]>([])
  const [postsBySubcategory, setPostsBySubcategory] = useState<{ [subId: string]: BlogPost[] }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLifestyleData = async () => {
      setLoading(true)
      // Get LifeStyle category id
      const { data: catData } = await supabase.from('categories').select('id').eq('name', 'LifeStyle').single()
      if (!catData) return
      // Get subcategories for LifeStyle
      const { data: subs } = await supabase.from('subcategories').select('id, name').eq('category_id', catData.id).order('name')
      setSubcategories(subs || [])
      // Get all LifeStyle posts with subcategory info
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('*, subcategory:subcategory_id(id, name)')
        .eq('category_id', catData.id)
        .order('created_at', { ascending: false })
      // Group posts by subcategory id
      const grouped: { [subId: string]: BlogPost[] } = {}
      for (const sub of subs || []) {
        grouped[sub.id] = (posts || []).filter((p: BlogPost) => p.subcategory_id === sub.id)
      }
      setPostsBySubcategory(grouped)
      // Set first tab with posts as active, or Social Media if none
      const firstWithPosts = (subs || []).find(sub => grouped[sub.id]?.length)
      setActiveTab(firstWithPosts ? firstWithPosts.id : 'social')
      setLoading(false)
    }
    fetchLifestyleData()
  }, [])

  // Social Media tab always last
  const tabs = [
    ...subcategories.filter(sub => (postsBySubcategory[sub.id] || []).length),
    { id: 'social', name: 'Social Media' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Lifestyle</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              My travel adventures, personal experiences, and life beyond technology. 
              Exploring the world one destination at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : activeTab === 'social' ? (
          <div className="space-y-8">
            {/* Social Media Content (custom content here) */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Social Media Content</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Instagram */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center">
                  <span className="text-4xl mb-3">📸</span>
                  <span className="text-lg font-semibold text-gray-900 mb-1">Instagram</span>
                  <span className="text-gray-600 mb-4">@harshprriyaofficial</span>
                  <a href="https://www.instagram.com/harshprriyaofficial/" target="_blank" rel="noopener noreferrer" className="inline-block bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600">Follow on Instagram</a>
                </div>
                {/* YouTube */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center">
                  <span className="text-4xl mb-3">🎥</span>
                  <span className="text-lg font-semibold text-gray-900 mb-1">YouTube</span>
                  <span className="text-gray-600 mb-4">@HarshPrriyaOfficial</span>
                  <a href="https://www.youtube.com/@HarshPrriyaOfficial" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700">Subscribe on YouTube</a>
                </div>
                {/* LinkedIn */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center">
                  <span className="text-4xl mb-3">💼</span>
                  <span className="text-lg font-semibold text-gray-900 mb-1">LinkedIn</span>
                  <span className="text-gray-600 mb-4">harshgupta11</span>
                  <a href="https://www.linkedin.com/in/harshgupta11/" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">Connect on LinkedIn</a>
                </div>
                {/* GitHub */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center">
                  <span className="text-4xl mb-3">🐙</span>
                  <span className="text-lg font-semibold text-gray-900 mb-1">GitHub</span>
                  <span className="text-gray-600 mb-4">harshgupta11</span>
                  <a href="https://github.com/harshgupta11" target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900">View on GitHub</a>
                </div>
                {/* Facebook */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center">
                  <span className="text-4xl mb-3">📘</span>
                  <span className="text-lg font-semibold text-gray-900 mb-1">Facebook</span>
                  <span className="text-gray-600 mb-4">harshgupta.11dec</span>
                  <a href="https://www.facebook.com/harshgupta.11dec" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800">Follow on Facebook</a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {postsBySubcategory[activeTab]?.length ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {postsBySubcategory[activeTab].map(post => (
                  <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                      {post.thumbnail && (
                        <Image
                          src={post.thumbnail}
                          alt={post.title + ' thumbnail'}
                          fill
                          className="object-cover w-full h-full absolute top-0 left-0 rounded-t-xl border border-gray-200 bg-white"
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
                          {post.tags?.slice(0, 2).map((tag: string) => (
                            <span
                              key={tag}
                              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={`/blog/${post.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Read More →
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No posts in this subcategory.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 