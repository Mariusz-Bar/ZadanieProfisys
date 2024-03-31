import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentsService } from './Services/documents.service';
import { Document } from './Interfaces/document';
import { DocumentItem } from './Interfaces/document-item';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'ZadanieProfisysFrontend';
  //documents: Document[] = [];
  documentItems: DocumentItem[] = [];

  //dataSource = new MatTableDataSource<Document>();
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
    'documentId',
    'ordinal',
    'product',
    'quantity',
    'price',
    'taxRate',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private documentsService: DocumentsService) {
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
  }

  loadAllDocuments() {
    this.documentsService.getAllDocuments().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
}
