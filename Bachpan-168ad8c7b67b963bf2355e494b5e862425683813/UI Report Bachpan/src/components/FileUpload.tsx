import { useState, useCallback } from 'react';
import { Upload, X, FileImage, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxSize?: number; // in MB
}

export const FileUpload = ({ onFilesChange, maxSize = 50 }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;

    setError('');
    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    fileArray.forEach(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File ${file.name} exceeds ${maxSize}MB limit`);
        return;
      }

      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
      if (!validTypes.includes(file.type)) {
        setError(`File ${file.name} is not a valid format (JPEG, PNG, MP4 only)`);
        return;
      }

      validFiles.push(file);
      
      // Create preview
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          setPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      } else {
        newPreviews.push('video');
        setPreviews(prev => [...prev, 'video']);
      }
    });

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  }, [files, maxSize, onFilesChange]);

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onFilesChange(updatedFiles);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-primary bg-card/50' : 'border-border bg-card'
        }`}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-foreground font-medium mb-2">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          JPEG, PNG, or MP4 (max {maxSize}MB)
        </p>
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,video/mp4"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button type="button" variant="default" asChild>
            <span>Select Files</span>
          </Button>
        </label>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              {preview === 'video' ? (
                <div className="aspect-square bg-card rounded-lg flex items-center justify-center border-2 border-border">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
              ) : (
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="aspect-square object-cover rounded-lg border-2 border-border"
                />
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {files[index]?.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
