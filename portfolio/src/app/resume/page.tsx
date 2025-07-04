'use client'

import { useState } from 'react'

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true)

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              My professional experience, skills, and achievements. 
              Feel free to download a copy or view it inline.
            </p>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Download Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Harsh Gupta - Resume</h2>
              <p className="text-gray-600">
                Software Engineer at Amazon | 4+ years of experience in distributed systems and cloud technologies
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="/Harsh-2025-Resume.pdf"
                download
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
              <a
                href="https://linkedin.com/in/harshgupta11"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
          </div>
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading resume...</p>
              </div>
            </div>
          )}

          {/* PDF Viewer */}
          <div className="relative h-screen">
            <iframe
              src="/Harsh-2025-Resume.pdf"
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              title="Harsh Gupta Resume"
            />
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-gray-900">Software Engineer</div>
                <div className="text-sm text-gray-600">Amazon • 2022 - Present</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Software Developer</div>
                <div className="text-sm text-gray-600">Previous Company • 2020 - 2022</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Java</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">AWS</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">React</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Node.js</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Python</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Docker</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-gray-900">Bachelor of Technology</div>
                <div className="text-sm text-gray-600">Computer Science • 2016 - 2020</div>
                <div className="text-sm text-gray-500">University Name</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 