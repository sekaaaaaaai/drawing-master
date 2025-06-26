export interface FileInfo {
  url: string;
  name: string;
}

export interface DrawingRevisionRecord {
  id: number;
  symbol: string;
  remarks: string;
  cad_files: FileInfo[];
  pdf_files: FileInfo[];
  created_at: string;
  updated_at: string;
}