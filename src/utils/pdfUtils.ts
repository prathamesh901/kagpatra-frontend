
import * as pdfjsLib from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';

// Manually set workerSrc to CDN version (safe in Vite)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export const countPdfPages = async (file: File): Promise<number> => {
  try {
    if (file.type !== 'application/pdf') return 1;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    return pdf.numPages;
  } catch (error) {
    console.error('Error counting PDF pages:', error);
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
