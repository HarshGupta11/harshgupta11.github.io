import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import BlogAdminActions from '@/components/BlogAdminActions'
import BlogList from '@/components/BlogList'

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
            <BlogAdminActions />
          </div>
        </div>
      </div>

      {/* Blog Posts Grid (Client Component) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogList />
        {/* Sign In Button */}
        <div className="text-center mt-12">
          <AuthButton />
        </div>
      </div>
    </div>
  )
} 