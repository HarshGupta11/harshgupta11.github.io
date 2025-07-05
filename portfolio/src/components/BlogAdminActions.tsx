'use client'

import { useIsAdmin } from '@/hooks/useIsAdmin'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const MarkdownEditor = dynamic(() => import('./MarkdownEditor'), { ssr: false })

const THUMBNAILS = [
  '/thumbnails/tech.svg',
  '/thumbnails/travel.svg',
  '/thumbnails/lifestyle.svg',
];
const DEFAULT_THUMBNAIL = '/thumbnails/default.svg';

export default function BlogAdminActions({ onBlogCreated }: { onBlogCreated?: () => void }) {
  const isAdmin = useIsAdmin()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editorKey, setEditorKey] = useState(0)
  const [thumbnail, setThumbnail] = useState('');
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [thumbError, setThumbError] = useState('');

  if (!isAdmin) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    if (!user?.email) {
      setError('User email not found.')
      setLoading(false)
      return
    }
    const { error: insertError } = await supabase.from('blog_posts').insert([
      {
        title,
        excerpt,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        featured,
        author_email: user.email,
        thumbnail: thumbnail || DEFAULT_THUMBNAIL,
      }
    ])
    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }
    setLoading(false)
    setSuccess('Blog post created!')
    setTitle('')
    setExcerpt('')
    setContent('')
    setTags('')
    setFeatured(false)
    setIsOpen(false)
    setThumbnail('');
    if (onBlogCreated) onBlogCreated();
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingThumb(true);
    setThumbError('');
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `blog-thumb-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      if (!urlData?.publicUrl) throw new Error('Failed to get image URL');
      setThumbnail(urlData.publicUrl);
    } catch (err: any) {
      setThumbError(err.message || 'Image upload failed');
    } finally {
      setUploadingThumb(false);
    }
  };

  return (
    <>
      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
        onClick={() => { 
          setEditorKey(Date.now()); 
          setSuccess(''); 
          setError(''); 
          setIsOpen(true); 
        }}
      >
        + Create New Blog
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Create New Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500"
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  rows={2}
                  required
                  placeholder="Enter a short excerpt"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <MarkdownEditor key={editorKey} value={content} onChange={setContent} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="e.g. tech, travel, life"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={e => setFeatured(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">Featured</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail (optional)</label>
                <div className="flex flex-wrap gap-4 mb-2">
                  {THUMBNAILS.map((url) => (
                    <button
                      type="button"
                      key={url}
                      className={`border rounded-lg p-1 bg-white ${thumbnail === url ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-300'}`}
                      onClick={() => setThumbnail(url)}
                      aria-label="Select thumbnail"
                    >
                      <Image src={url} alt="thumbnail" width={60} height={40} className="object-contain" />
                    </button>
                  ))}
                  {/* Custom uploaded thumbnail preview */}
                  {thumbnail && !THUMBNAILS.includes(thumbnail) && (
                    <div className="border rounded-lg p-1 bg-white ring-2 ring-green-500">
                      <Image src={thumbnail} alt="Custom thumbnail" width={60} height={40} className="object-contain" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <label htmlFor="thumb-upload" className="text-sm text-blue-600 cursor-pointer hover:underline">Upload Image</label>
                  <input
                    id="thumb-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailUpload}
                    disabled={uploadingThumb}
                  />
                  {uploadingThumb && <span className="text-xs text-blue-600">Uploading...</span>}
                  {thumbError && <span className="text-xs text-red-600">{thumbError}</span>}
                </div>
                <div className="text-xs text-gray-500">PNG, JPG, SVG. Max 2MB.</div>
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Blog Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
} 