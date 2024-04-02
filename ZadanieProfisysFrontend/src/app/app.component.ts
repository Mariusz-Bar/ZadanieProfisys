import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentsService } from './Services/documents.service';
import { Document } from './Interfaces/document';
import { DocumentItem } from './Interfaces/document-item';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgToastService } from 'ng-angular-popup';

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
    private toast: NgToastService
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
      next: (res) => {},
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
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort1;
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Udało się zaimportować dane',
          duration: 5000,
        });
      },
      (error) => {
        this.toast.error({
          detail: 'ERROR',
          summary:
            'Wystąpił problem przy importowaniu danych. Sprawdź poprawność pliku.',
          duration: 5000,
        });
      }
    );
  }

  onFileChange2(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.documentsService.sendDocumentItemsCsv(formData).subscribe(
      (res) => {
        this.documentItems = res;

        this.dataSource2.data = this.documentItems.filter(
          (record) => record.documentId === this.selectedRow.id
        );
        this.dataSource2.sort = this.sort2;

        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Udało się zaimportować dane',
          duration: 5000,
        });
      },
      (error) => {
        this.toast.error({
          detail: 'ERROR',
          summary:
            'Wystąpił problem przy importowaniu danych. Sprawdź poprawność pliku.',
          duration: 5000,
        });
      }
    );
  }

  loadFromDirectory() {
    this.documentsService.processCsvFilesFromDirectory().subscribe(
      (res) => {
        this.loadAllDocuments();
        this.dataSource2.data = [];
        this.loadAllDocumentItems();

        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Udało się zaimportować dane.',
          duration: 5000,
        });
      },
      (error) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Wystąpił problem przy importowaniu danych',
          duration: 5000,
        });
      }
    );
  }

  clearDatabase() {
    this.documentsService.truncateData().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource<Document>();
        this.dataSource2 = new MatTableDataSource<DocumentItem>();
        this.dataSource.paginator = this.paginator;
        this.documentItems = [];

        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Udało się usunąć dane z bazy.',
          duration: 5000,
        });
      },
      (error) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Wystąpił problem przy usuwaniu danych',
          duration: 5000,
        });
      }
    );
  }
}
