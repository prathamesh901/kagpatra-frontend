
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export const countPdfPages = async (file: File): Promise<number> => {
  try {
    // Only process PDF files
    if (file.type !== 'application/pdf') {
      return 1; // Default to 1 page for non-PDF files
    }

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    // Return the number of pages
    return pdf.numPages;
  } catch (error) {
    console.error('Error counting PDF pages:', error);
    // Fallback to 1 page if counting fails
    return 1;
  }
};

export const getFileTypeDisplayName = (file: File): string => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'PDF document';
    case 'doc':
    case 'docx':
      return 'Word document';
    case 'txt':
      return 'Text file';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'Image file';
    default:
      return 'Document';
  }
};
