// src/utils/pdfUtils.ts
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker?url';

// Tell PDF.js to use the locally built worker
GlobalWorkerOptions.workerSrc = workerUrl;

export const countPdfPages = async (file: File): Promise<number> => {
  try {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) return 1;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    return pdf.numPages;
  } catch (error) {
    console.error('Error counting PDF pages:', error, file);
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
