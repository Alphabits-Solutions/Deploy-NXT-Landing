// Shared file-upload rules and helpers for the contact form (ContactSection)
// and the career application modal (JobApplicationModal). Keeps validation and
// size formatting in one place so both forms stay in sync.

// Accepted attachment types and 10MB size cap.
export const ACCEPTED_FILE_EXTENSIONS = ".pdf,.doc,.docx,.ppt,.pptx";
export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Format a byte count as a short human-readable size (e.g. "2.4 MB").
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Validate a chosen file against the allowed types and size cap. Returns an
// error message when the file is rejected, or null when it is acceptable.
export function validateFile(file: File): string | null {
  const nameOk = ACCEPTED_FILE_EXTENSIONS.split(",").some((ext) =>
    file.name.toLowerCase().endsWith(ext),
  );
  const typeOk = file.type === "" || ACCEPTED_FILE_TYPES.includes(file.type);
  if (!nameOk || !typeOk) {
    return "Unsupported file type. Use PDF, DOC, or PPT.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File is too large. Maximum size is 10MB.";
  }
  return null;
}
