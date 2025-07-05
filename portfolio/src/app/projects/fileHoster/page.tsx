"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import AuthButton from "@/components/AuthButton";

interface FileMeta {
  name: string;
  size: number;
  lastModified: string;
  url: string;
}

interface SupabaseFile {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: { size?: number };
}

export default function FileHosterPage() {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch files for the authenticated user
  useEffect(() => {
    if (!user) return;
    const fetchFiles = async () => {
      setError("");
      const { data, error } = await supabase.storage
        .from("filehoster-files")
        .list(user.id + "/", { limit: 100, offset: 0 });
      if (error) {
        setError(error.message);
        setFiles([]);
        return;
      }
      const filesWithMeta = await Promise.all(
        (data || []).map(async (file: SupabaseFile) => {
          const { data: urlData } = supabase.storage
            .from("filehoster-files")
            .getPublicUrl(user.id + "/" + file.name);
          return {
            name: file.name,
            size: file.metadata?.size || 0,
            lastModified: file.updated_at || file.created_at || "",
            url: urlData?.publicUrl || "",
          };
        })
      );
      setFiles(filesWithMeta);
    };
    fetchFiles();
  }, [user, refreshFlag]);

  // Handle file upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    setError("");
    setSuccess("");
    const filePath = `${user.id}/${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("filehoster-files")
      .upload(filePath, file, { upsert: false });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    setUploading(false);
    setSuccess("File uploaded!");
    setRefreshFlag((f) => f + 1);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle file delete
  const handleDelete = async (fileName: string) => {
    if (!user) return;
    setError("");
    const { error: deleteError } = await supabase.storage
      .from("filehoster-files")
      .remove([`${user.id}/${fileName}`]);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setSuccess("File deleted.");
    setRefreshFlag((f) => f + 1);
  };

  // Copy public URL
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setSuccess("Copied public URL!");
    setTimeout(() => setSuccess(""), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">File Hoster</h1>
        <p className="text-gray-600 mb-8">
          Upload, view, and manage your files securely with Supabase Storage.
        </p>
        {!user ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="mb-4 text-gray-700">Sign in to upload and manage your files.</p>
            <AuthButton />
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-md mt-8 w-full max-w-none overflow-x-auto px-8">
            <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
              <label htmlFor="file-upload" className="inline-flex items-center cursor-pointer">
                <input
                  type="file"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="hidden"
                  id="file-upload"
                  ref={fileInputRef}
                />
                <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" />
                  </svg>
                  Upload File
                </span>
              </label>
              {uploading && <span className="text-blue-600">Uploading...</span>}
              {success && <span className="text-green-600">{success}</span>}
              {error && <span className="text-red-600">{error}</span>}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Files</h2>
            {files.length === 0 ? (
              <div className="text-gray-500">No files uploaded yet.</div>
            ) : (
              <div className="w-full min-w-0">
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left text-gray-700 font-semibold">File Name</th>
                      <th className="px-4 py-2 text-left text-gray-700 font-semibold">Size</th>
                      <th className="px-4 py-2 text-left text-gray-700 font-semibold">Uploaded</th>
                      <th className="px-4 py-2 text-left text-gray-700 font-semibold">Public URL</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr key={file.name} className="border-b text-gray-900 font-medium">
                        <td className="px-4 py-2 font-mono">{file.name}</td>
                        <td className="px-4 py-2">{(file.size / 1024).toFixed(2)} KB</td>
                        <td className="px-4 py-2">{file.lastModified ? new Date(file.lastModified).toLocaleString() : "-"}</td>
                        <td className="px-4 py-2 max-w-xs truncate">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => handleCopy(file.url)}
                            title="Copy public URL"
                          >
                            {file.url.slice(0, 32)}...copy
                          </button>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDelete(file.name)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
