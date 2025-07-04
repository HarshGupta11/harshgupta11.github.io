import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import AuthButton as a client component
const AuthButton = dynamic(() => import('@/components/AuthButton'), { ssr: false })

// Sample blog posts based on your travel experiences and tech background
const blogPosts = [
  {
    id: '1',
    title: '14 Days in Japan: A Complete Travel Itinerary',
    excerpt: 'From the neon-lit streets of Tokyo to the serene temples of Kyoto, discover my comprehensive 14-day journey through the Land of the Rising Sun.',
    publishedAt: '2024-06-15',
    readTime: '8 min read',
    tags: ['Travel', 'Japan', 'Itinerary'],
    featured: true,
    slug: 'japan-travel-itinerary'
  },
  {
    id: '2',
    title: 'Building Scalable Systems at Amazon: Lessons Learned',
    excerpt: 'Insights from working on distributed systems and cloud infrastructure at one of the world\'s largest tech companies.',
    publishedAt: '2024-05-20',
    readTime: '6 min read',
    tags: ['Technology', 'Amazon', 'System Design'],
    featured: false,
    slug: 'amazon-systems-lessons'
  },
  {
    id: '3',
    title: 'Europe Backpacking: 6 Countries in 21 Days',
    excerpt: 'From the romantic streets of Paris to the ancient ruins of Rome, explore my adventure across Europe\'s most iconic cities.',
    publishedAt: '2024-04-10',
    readTime: '10 min read',
    tags: ['Travel', 'Europe', 'Backpacking'],
    featured: false,
    slug: 'europe-backpacking-adventure'
  },
  {
    id: '4',
    title: 'Content Creation in the Digital Age: YouTube vs Instagram',
    excerpt: 'My experience building a personal brand through social media and the lessons learned from creating travel and tech content.',
    publishedAt: '2024-03-25',
    readTime: '5 min read',
    tags: ['Content Creation', 'Social Media', 'Personal Brand'],
    featured: false,
    slug: 'content-creation-digital-age'
  },
  {
    id: '5',
    title: 'Dubai to Bali: Southeast Asia Travel Guide',
    excerpt: 'Navigating the diverse cultures and landscapes from the modern marvels of Dubai to the tropical paradise of Bali.',
    publishedAt: '2024-02-18',
    readTime: '7 min read',
    tags: ['Travel', 'Southeast Asia', 'Dubai', 'Bali'],
    featured: false,
    slug: 'dubai-bali-travel-guide'
  },
  {
    id: '6',
    title: 'From College to Amazon: My Software Engineering Journey',
    excerpt: 'The roadmap from computer science student to software engineer at a top tech company, including interview tips and career advice.',
    publishedAt: '2024-01-30',
    readTime: '9 min read',
    tags: ['Career', 'Software Engineering', 'Interviews'],
    featured: false,
    slug: 'college-to-amazon-journey'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thoughts on technology, travel experiences, and life lessons. 
              Sharing insights from my journey as a software engineer and global traveler.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {blogPosts.filter(post => post.featured).map((post) => (
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
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h2>
                <p className="text-gray-600 mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
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
          {blogPosts.filter(post => !post.featured).map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-4xl">
                  {post.tags.includes('Travel') ? '✈️' : 
                   post.tags.includes('Technology') ? '💻' : '📝'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{post.publishedAt}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sign In Button */}
        <div className="text-center mt-12">
          <AuthButton />
        </div>
      </div>
    </div>
  )
} 