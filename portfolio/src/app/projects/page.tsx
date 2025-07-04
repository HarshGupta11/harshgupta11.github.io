import Link from 'next/link'

// Sample projects based on software engineering background
const projects = [
  {
    id: '1',
    title: 'Distributed System Architecture',
    description: 'Designed and implemented a scalable microservices architecture handling millions of requests per day. Utilized AWS services including Lambda, DynamoDB, and SQS for optimal performance and cost efficiency.',
    technologies: ['AWS', 'Java', 'Spring Boot', 'DynamoDB', 'SQS', 'Lambda'],
    githubUrl: 'https://github.com/harshgupta11',
    liveUrl: null,
    featured: true,
    image: '🏗️'
  },
  {
    id: '2',
    title: 'Real-time Analytics Dashboard',
    description: 'Built a real-time analytics platform using React and WebSocket connections. Features include live data visualization, custom charts, and real-time alerts for system monitoring.',
    technologies: ['React', 'TypeScript', 'WebSocket', 'Chart.js', 'Node.js'],
    githubUrl: 'https://github.com/harshgupta11',
    liveUrl: 'https://demo.example.com',
    featured: false,
    image: '📊'
  },
  {
    id: '3',
    title: 'API Gateway & Authentication',
    description: 'Developed a secure API gateway with JWT authentication, rate limiting, and request/response transformation. Integrated with multiple backend services and third-party APIs.',
    technologies: ['Node.js', 'Express', 'JWT', 'Redis', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/harshgupta11',
    liveUrl: null,
    featured: false,
    image: '🔐'
  },
  {
    id: '4',
    title: 'Machine Learning Pipeline',
    description: 'Created an end-to-end ML pipeline for recommendation systems. Includes data preprocessing, model training, evaluation, and deployment using AWS SageMaker.',
    technologies: ['Python', 'TensorFlow', 'AWS SageMaker', 'Pandas', 'Scikit-learn'],
    githubUrl: 'https://github.com/harshgupta11',
    liveUrl: null,
    featured: false,
    image: '🤖'
  },
  {
    id: '5',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Built with modern web technologies and responsive design.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Express'],
    githubUrl: 'https://github.com/harshgupta11',
    liveUrl: 'https://shop.example.com',
    featured: false,
    image: '🛒'
  },
  {
    id: '6',
    title: 'Mobile App - Travel Companion',
    description: 'Cross-platform mobile app for travelers with features like itinerary planning, expense tracking, and location-based recommendations. Built with React Native.',
    technologies: ['React Native', 'Firebase', 'Google Maps API', 'Redux', 'TypeScript'],
    githubUrl: 'https://github.com/harshgupta11',
    liveUrl: null,
    featured: false,
    image: '📱'
  }
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A collection of software projects, system designs, and technical solutions 
              I've built throughout my career as a software engineer.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Project */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {projects.filter(project => project.featured).map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-green-500 to-blue-600 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">{project.image}</div>
                  <h3 className="text-2xl font-bold mb-2">Featured Project</h3>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Featured
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h2>
                <p className="text-gray-600 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    View Code
                  </Link>
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Live Demo
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.filter(project => !project.featured).map((project) => (
            <article key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-4xl">{project.image}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                  >
                    Code →
                  </Link>
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Demo →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Interested in collaborating on a project?
          </p>
          <Link
            href="mailto:harsh@example.com"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
} 