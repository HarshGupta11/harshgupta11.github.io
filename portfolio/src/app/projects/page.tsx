import Link from 'next/link'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore my software projects. More coming soon!
            </p>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/projects/fileHoster" className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center border border-gray-200">
            <div className="text-5xl mb-4">📁</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">fileHoster</h2>
            <p className="text-gray-600 mb-4">A simple file upload and management utility built using Supabase Storage. Upload, view, and manage your files securely.</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Next.js + Supabase</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 