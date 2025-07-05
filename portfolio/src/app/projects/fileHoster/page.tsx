"use client";
import { useState, useEffect } from "react";
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">fileHoster</h1>
        <p className="text-gray-600 mb-8">
          Upload, view, and manage your files securely with Supabase Storage.
        </p>
        {!user ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="mb-4 text-gray-700">Sign in to upload and manage your files.</p>
            <AuthButton />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-8">
            <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
              <input
                type="file"
                onChange={handleUpload}
                disabled={uploading}
                className="block"
              />
              {uploading && <span className="text-blue-600">Uploading...</span>}
              {success && <span className="text-green-600">{success}</span>}
              {error && <span className="text-red-600">{error}</span>}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Files</h2>
            {files.length === 0 ? (
              <div className="text-gray-500">No files uploaded yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">File Name</th>
                      <th className="px-4 py-2 text-left">Size</th>
                      <th className="px-4 py-2 text-left">Uploaded</th>
                      <th className="px-4 py-2 text-left">Public URL</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr key={file.name} className="border-b">
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
