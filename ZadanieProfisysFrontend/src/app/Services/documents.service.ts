import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentItem } from '../Interfaces/document-item';
import { Document } from '../Interfaces/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://localhost:7076/api/Data/';

  getAllDocuments() {
    return this.http.get<Document[]>(`${this.baseUrl}GetAllDocuments`);
  }

  getAllDocumentItems() {
    return this.http.get<DocumentItem[]>(`${this.baseUrl}GetAllDocumentItems`);
  }

  getItemsOfDocument(documentId: number) {
    return this.http.get<DocumentItem[]>(
      `${this.baseUrl}GetDocumentItems/${documentId}`
    );
  }

  sendDocumentItemsCsv(formData: FormData) {
    return this.http.post<DocumentItem[]>(
      `${this.baseUrl}UploadDocumentItemsCsv`,
      formData
    );
  }

  sendDocumentsCsv(formData: FormData) {
    return this.http.post<Document[]>(
      `${this.baseUrl}UploadDocumentsCsv`,
      formData
    );
  }

  processCsvFilesFromDirectory() {
    return this.http.get<any>(`${this.baseUrl}ProcessCsvFilesFromDirectory`);
  }

  truncateData() {
    return this.http.delete<any>(`${this.baseUrl}TruncateData`);
  }
}
