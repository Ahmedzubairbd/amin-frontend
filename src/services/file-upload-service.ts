import axios from 'axios';

// ----------------------------------------------------------------------

interface UploadConfig {
  maxSize: number;
  allowedTypes: string[];
  uploadPath: string;
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
}

interface UploadResult {
  success: boolean;
  fileId?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  error?: string;
}

interface FileInfo {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
  uploadedBy: string;
}

class FileUploadService {
  private config: UploadConfig;

  constructor() {
    this.config = {
      maxSize: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760'), // 10MB default
      allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,application/pdf,text/plain').split(','),
      uploadPath: process.env.UPLOAD_PATH || './uploads',
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
        apiKey: process.env.CLOUDINARY_API_KEY || '',
        apiSecret: process.env.CLOUDINARY_API_SECRET || '',
      },
    };
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > this.config.maxSize) {
      return {
        valid: false,
        error: `File size exceeds maximum limit of ${this.formatFileSize(this.config.maxSize)}`,
      };
    }

    // Check file type
    if (!this.config.allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed. Allowed types: ${this.config.allowedTypes.join(', ')}`,
      };
    }

    return { valid: true };
  }

  /**
   * Format file size for display
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Upload file to server
   */
  async uploadFile(
    file: File,
    type: 'medical-report' | 'patient-document' | 'profile-image' | 'test-result',
    metadata?: Record<string, any>
  ): Promise<UploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
        };
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      if (metadata) {
        formData.append('metadata', JSON.stringify(metadata));
      }

      // Upload to server
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      });

      if (response.data.success) {
        return {
          success: true,
          fileId: response.data.fileId,
          fileUrl: response.data.fileUrl,
          fileName: response.data.fileName,
          fileSize: response.data.fileSize,
        };
      } else {
        return {
          success: false,
          error: response.data.error || 'Upload failed',
        };
      }
    } catch (error: any) {
      console.error('File upload failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Upload failed',
      };
    }
  }

  /**
   * Upload file to Cloudinary
   */
  async uploadToCloudinary(
    file: File,
    folder: string = 'amin-diagnostics'
  ): Promise<UploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
        };
      }

      // Create form data for Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'amin_diagnostics'); // You'll need to create this preset
      formData.append('folder', folder);

      // Upload to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${this.config.cloudinary.cloudName}/auto/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.secure_url) {
        return {
          success: true,
          fileId: response.data.public_id,
          fileUrl: response.data.secure_url,
          fileName: response.data.original_filename,
          fileSize: response.data.bytes,
        };
      } else {
        return {
          success: false,
          error: 'Cloudinary upload failed',
        };
      }
    } catch (error: any) {
      console.error('Cloudinary upload failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Cloudinary upload failed',
      };
    }
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(
    files: File[],
    type: 'medical-report' | 'patient-document' | 'profile-image' | 'test-result',
    metadata?: Record<string, any>
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, type, metadata));
    return Promise.all(uploadPromises);
  }

  /**
   * Get file information
   */
  async getFileInfo(fileId: string): Promise<FileInfo | null> {
    try {
      const response = await axios.get(`/api/files/${fileId}`);
      
      if (response.data.success) {
        return response.data.file;
      }
      
      return null;
    } catch (error: any) {
      console.error('Failed to get file info:', error);
      return null;
    }
  }

  /**
   * Delete file
   */
  async deleteFile(fileId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await axios.delete(`/api/files/${fileId}`);
      
      if (response.data.success) {
        return { success: true };
      } else {
        return {
          success: false,
          error: response.data.error || 'Delete failed',
        };
      }
    } catch (error: any) {
      console.error('Failed to delete file:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Delete failed',
      };
    }
  }

  /**
   * Get file download URL
   */
  async getDownloadUrl(fileId: string): Promise<string | null> {
    try {
      const response = await axios.get(`/api/files/${fileId}/download`);
      
      if (response.data.success) {
        return response.data.downloadUrl;
      }
      
      return null;
    } catch (error: any) {
      console.error('Failed to get download URL:', error);
      return null;
    }
  }

  /**
   * Get files by type
   */
  async getFilesByType(
    type: 'medical-report' | 'patient-document' | 'profile-image' | 'test-result',
    userId?: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<FileInfo[]> {
    try {
      const params = new URLSearchParams({
        type,
        limit: limit.toString(),
        offset: offset.toString(),
      });

      if (userId) {
        params.append('userId', userId);
      }

      const response = await axios.get(`/api/files?${params}`);
      
      if (response.data.success) {
        return response.data.files;
      }
      
      return [];
    } catch (error: any) {
      console.error('Failed to get files by type:', error);
      return [];
    }
  }

  /**
   * Generate thumbnail for image files
   */
  async generateThumbnail(fileId: string, width: number = 200, height: number = 200): Promise<string | null> {
    try {
      const response = await axios.get(`/api/files/${fileId}/thumbnail`, {
        params: { width, height },
      });
      
      if (response.data.success) {
        return response.data.thumbnailUrl;
      }
      
      return null;
    } catch (error: any) {
      console.error('Failed to generate thumbnail:', error);
      return null;
    }
  }

  /**
   * Check if file is image
   */
  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * Check if file is PDF
   */
  isPdfFile(file: File): boolean {
    return file.type === 'application/pdf';
  }

  /**
   * Get file extension
   */
  getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }

  /**
   * Get file type category
   */
  getFileTypeCategory(file: File): 'image' | 'document' | 'other' {
    if (this.isImageFile(file)) return 'image';
    if (this.isPdfFile(file) || file.type.includes('text')) return 'document';
    return 'other';
  }

  /**
   * Get file icon based on type
   */
  getFileIcon(file: File): string {
    const category = this.getFileTypeCategory(file);
    
    switch (category) {
      case 'image':
        return 'image';
      case 'document':
        if (this.isPdfFile(file)) return 'picture_as_pdf';
        return 'description';
      default:
        return 'insert_drive_file';
    }
  }

  /**
   * Validate file name
   */
  validateFileName(fileName: string): { valid: boolean; error?: string } {
    // Check for invalid characters
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(fileName)) {
      return {
        valid: false,
        error: 'File name contains invalid characters',
      };
    }

    // Check length
    if (fileName.length > 255) {
      return {
        valid: false,
        error: 'File name is too long (max 255 characters)',
      };
    }

    return { valid: true };
  }

  /**
   * Sanitize file name
   */
  sanitizeFileName(fileName: string): string {
    // Remove invalid characters
    let sanitized = fileName.replace(/[<>:"/\\|?*]/g, '_');
    
    // Remove leading/trailing spaces and dots
    sanitized = sanitized.trim().replace(/^\.+|\.+$/g, '');
    
    // Limit length
    if (sanitized.length > 255) {
      const extension = this.getFileExtension(sanitized);
      const nameWithoutExt = sanitized.substring(0, sanitized.lastIndexOf('.'));
      sanitized = nameWithoutExt.substring(0, 255 - extension.length - 1) + '.' + extension;
    }
    
    return sanitized || 'untitled';
  }
}

// Export singleton instance
export const fileUploadService = new FileUploadService();
export default fileUploadService; 