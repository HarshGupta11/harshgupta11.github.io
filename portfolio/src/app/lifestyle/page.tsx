'use client'

import { useState } from 'react'

const travelExperiences = [
  {
    id: '1',
    country: 'Japan',
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Hiroshima', 'Fukuoka'],
    duration: '14 Days',
    year: '2024',
    description: 'Comprehensive journey through the Land of the Rising Sun, from neon-lit Tokyo to serene temples of Kyoto.',
    highlights: ['Shibuya Crossing', 'Fushimi Inari Shrine', 'Hiroshima Peace Memorial', 'Osaka Castle'],
    image: '🗾',
    color: 'from-red-500 to-red-600'
  },
  {
    id: '2',
    country: 'Europe',
    cities: ['Paris', 'Rome', 'Barcelona', 'Amsterdam', 'Venice', 'Athens'],
    duration: '21 Days',
    year: '2023',
    description: 'Backpacking adventure across Europe\'s most iconic cities and cultural landmarks.',
    highlights: ['Eiffel Tower', 'Colosseum', 'Sagrada Familia', 'Canal Cruise', 'Acropolis'],
    image: '🏛️',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: '3',
    country: 'Southeast Asia',
    cities: ['Dubai', 'Singapore', 'Bali', 'Malaysia'],
    duration: '18 Days',
    year: '2023',
    description: 'From modern marvels of Dubai to tropical paradise of Bali, exploring diverse cultures and landscapes.',
    highlights: ['Burj Khalifa', 'Marina Bay Sands', 'Ubud Rice Terraces', 'Petronas Towers'],
    image: '🌏',
    color: 'from-green-500 to-green-600'
  },
  {
    id: '4',
    country: 'United States',
    cities: ['New York', 'Seattle', 'Portland', 'San Francisco'],
    duration: '12 Days',
    year: '2022',
    description: 'Coast-to-coast exploration of America\'s most vibrant cities and tech hubs.',
    highlights: ['Times Square', 'Space Needle', 'Powell\'s Books', 'Golden Gate Bridge'],
    image: '🗽',
    color: 'from-purple-500 to-purple-600'
  }
]

const japanItinerary = [
  { day: 1, city: 'Tokyo', activity: 'Arrival, Shibuya Crossing, Tokyo Tower' },
  { day: 2, city: 'Tokyo (Odaiba)', activity: 'TeamLab Borderless, Rainbow Bridge, Gundam Statue' },
  { day: 3, city: 'Tokyo', activity: 'Senso-ji Temple, Akihabara, Tsukiji Market' },
  { day: 4, city: 'Kamakura', activity: 'Great Buddha, Hase-dera Temple, Enoshima Island' },
  { day: 5, city: 'Hakone', activity: 'Hakone Shrine, Lake Ashi, Open Air Museum' },
  { day: 6, city: 'Osaka', activity: 'Osaka Castle, Dotonbori, Kuromon Market' },
  { day: 7, city: 'Osaka', activity: 'Universal Studios Japan, Osaka Aquarium' },
  { day: 8, city: 'Nara', activity: 'Todai-ji Temple, Nara Park, Kasuga Taisha' },
  { day: 9, city: 'Kyoto', activity: 'Fushimi Inari Shrine, Kinkaku-ji, Arashiyama' },
  { day: 10, city: 'Kobe', activity: 'Kobe Beef, Harborland, Mount Rokko' },
  { day: 11, city: 'Hiroshima', activity: 'Peace Memorial Park, Atomic Bomb Dome' },
  { day: 12, city: 'Miyajima Island', activity: 'Itsukushima Shrine, Mount Misen' },
  { day: 13, city: 'Nanzoin', activity: 'Reclining Buddha, Temple Complex' },
  { day: 14, city: 'Fukuoka', activity: 'Canal City, Ohori Park, Departure' }
]

export default function LifestylePage() {
  const [activeTab, setActiveTab] = useState('travel')

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
            <button
              onClick={() => setActiveTab('travel')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'travel'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Travel Adventures
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'social'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Social Media
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'travel' ? (
          <div className="space-y-12">
            {/* Travel Experiences */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Travel Experiences</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {travelExperiences.map((experience) => (
                  <div key={experience.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className={`h-48 bg-gradient-to-br ${experience.color} flex items-center justify-center`}>
                      <div className="text-6xl">{experience.image}</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{experience.country}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {experience.year}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{experience.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Cities Visited:</h4>
                        <div className="flex flex-wrap gap-1">
                          {experience.cities.map((city) => (
                            <span
                              key={city}
                              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                            >
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {experience.highlights.slice(0, 3).map((highlight) => (
                            <li key={highlight} className="flex items-center">
                              <span className="text-blue-500 mr-2">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-sm text-gray-500">
                        Duration: {experience.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Japan Itinerary */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Japan: 14-Day Detailed Itinerary</h2>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">🗾 Japan Adventure</h3>
                  <p className="opacity-90">A comprehensive journey through the Land of the Rising Sun</p>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {japanItinerary.map((day) => (
                      <div key={day.day} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-blue-600">Day {day.day}</span>
                          <span className="text-sm text-gray-500">{day.city}</span>
                        </div>
                        <p className="text-sm text-gray-600">{day.activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Social Media Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Social Media Content</h2>
              
              {/* Instagram */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Instagram</h3>
                    <p className="text-gray-600">@harshprriyaofficial</p>
                  </div>
                </div>
                
                {/* Instagram Embed Placeholder */}
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-4">📸</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Instagram Feed</h4>
                  <p className="text-gray-600 mb-4">
                    Follow my journey on Instagram for daily travel updates, behind-the-scenes content, and lifestyle posts.
                  </p>
                  <a
                    href="https://instagram.com/harshprriyaofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-medium"
                  >
                    Follow on Instagram
                  </a>
                </div>
              </div>

              {/* YouTube */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">YouTube</h3>
                    <p className="text-gray-600">@HarshPrriyaOfficial</p>
                  </div>
                </div>
                
                {/* YouTube Embed Placeholder */}
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-4">🎥</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">YouTube Channel</h4>
                  <p className="text-gray-600 mb-4">
                    Watch travel vlogs, tech reviews, and lifestyle content on my YouTube channel.
                  </p>
                  <a
                    href="https://youtube.com/@HarshPrriyaOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Subscribe on YouTube
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">LinkedIn</h3>
                    <p className="text-gray-600">Professional updates and tech insights</p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-4">💼</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Professional Network</h4>
                  <p className="text-gray-600 mb-4">
                    Connect with me on LinkedIn for professional updates, tech insights, and career discussions.
                  </p>
                  <a
                    href="https://linkedin.com/in/harshgupta11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 