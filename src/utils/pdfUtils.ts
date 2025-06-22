
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Set up worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const countPdfPages = async (file: File): Promise<number> => {
  try {
    if (file.type !== 'application/pdf') return 1;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
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
