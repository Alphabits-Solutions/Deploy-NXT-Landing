/**
 * Utility to convert Google Drive shareable links into direct download links
 * suitable for use in standard HTML <img> and <video> tags.
 * 
 * Standard Share Link: https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P/view?usp=sharing
 * Direct Link Format: https://drive.google.com/uc?export=download&id=1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P
 */
export function convertGoogleDriveLink(url: string): string {
  if (!url) return "";
  
  // If it's already a direct Google Drive link or not a google drive link, return it as is
  if (url.includes("drive.google.com/uc") || url.includes("lh3.googleusercontent.com")) {
    return url;
  }

  // Regex to extract the file ID from various Google Drive link styles
  // e.g. /file/d/FILE_ID/view, open?id=FILE_ID, etc.
  const fileIdRegex = /\/file\/d\/([a-zA-Z0-9_-]{25,50})|id=([a-zA-Z0-9_-]{25,50})/i;
  const match = url.match(fileIdRegex);

  if (match) {
    const fileId = match[1] || match[2];
    if (fileId) {
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
  }

  return url;
}
