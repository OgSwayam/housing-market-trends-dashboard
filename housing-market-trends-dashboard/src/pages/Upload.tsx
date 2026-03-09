import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setStatus('idle');
    if (!selectedFile.name.endsWith('.csv')) {
      setStatus('error');
      setMessage('Please upload a valid CSV file.');
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setStatus('uploading');
    try {
      const result = await api.uploadDataset(file);
      setStatus('success');
      setMessage(`Successfully processed ${result.rowsProcessed.toLocaleString()} records.`);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An error occurred during upload.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Dataset Upload</h1>
        <p className="text-slate-500">Upload new housing market data (CSV format). The system will automatically clean the data and retrain the models.</p>
      </div>

      <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Dropzone */}
        <div 
          className={`
            border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-200
            ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}
            ${status === 'uploading' ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".csv" 
            className="hidden" 
          />
          
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <UploadIcon className="w-8 h-8" />
          </div>
          
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Click to upload or drag and drop
          </h3>
          <p className="text-slate-500 mb-6">
            CSV files only (max 50MB)
          </p>

          {file && (
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white px-4 py-3 sm:py-2 rounded-lg border border-slate-200 shadow-sm" onClick={(e) => e.stopPropagation()}>
              <FileText className="w-5 h-5 text-indigo-500" />
              <span className="font-medium text-slate-700 text-center break-all">{file.name}</span>
              <span className="text-slate-400 text-sm whitespace-nowrap">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {status === 'error' && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3 border border-red-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="mt-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-3 border border-emerald-200">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p className="font-medium">{message}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end">
          <button 
            onClick={handleUpload}
            disabled={!file || status === 'uploading'}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'uploading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Dataset...
              </>
            ) : (
              'Upload and Process'
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
