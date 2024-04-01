import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentsService } from './Services/documents.service';
import { Document } from './Interfaces/document';
import { DocumentItem } from './Interfaces/document-item';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'ZadanieProfisysFrontend';
  documentItems: DocumentItem[] = [];

  dataSource: MatTableDataSource<Document>;
  dataSource2: MatTableDataSource<DocumentItem>;
  displayedColumns: string[] = [
    'id',
    'type',
    'date',
    'firstName',
    'lastName',
    'city',
  ];
  displayedColumns2: string[] = [
    'ordinal',
    'product',
    'quantity',
    'price',
    'taxRate',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table1', { read: MatSort, static: true }) sort1!: MatSort;
  @ViewChild('table2', { read: MatSort, static: true }) sort2!: MatSort;

  constructor(
    private documentsService: DocumentsService,
    private http: HttpClient
  ) {
    this.dataSource = new MatTableDataSource<Document>();
    this.dataSource2 = new MatTableDataSource<DocumentItem>();
  }

  ngAfterViewInit() {
    this.loadAllDocuments();
    this.loadAllDocumentItems();
  }

  selectedRow: any;
  onRowClicked(element: Document) {
    console.log(element);
    this.selectedRow = element;

    this.dataSource2.data = this.documentItems.filter(
      (record) => record.documentId === element.id
    );
    this.dataSource2.sort = this.sort2;
  }

  loadAllDocuments() {
    this.documentsService.getAllDocuments().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort1;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  loadAllDocumentItems() {
    this.documentsService.getAllDocumentItems().subscribe({
      next: (res) => {
        this.documentItems = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  loadDocumentItems(documentId: number) {
    this.documentsService.getItemsOfDocument(documentId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.documentsService.sendDocumentsCsv(formData).subscribe(
      (res) => {
        console.log('File upploaded');
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort1;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  onFileChange2(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.documentsService.sendDocumentItemsCsv(formData).subscribe(
      () => {
        console.log('File upploaded');
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
}
