import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent {
  constructor(
    private router: Router,
    public sharedDataService: SharedDataService
  ) {}

  downloadSample() {
    const sampleFilePath = 'assets/sample.xls';
    fetch(sampleFilePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error('Error downloading sample:', error));
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, {
        type: 'binary',
      });
      const worksheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];

      this.sharedDataService.data = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });
      this.sharedDataService.headers =
        this.sharedDataService.data.shift() || []; // Remove headers from data
      this.sharedDataService.headers.unshift('Index');
      this.sharedDataService.data = this.sharedDataService.data.map(
        (item, index) => [index + 1, ...item]
      );
    };

    reader.readAsBinaryString(file);
  }

  navigateToNextPage() {
    if (this.sharedDataService.data.length > 0) {
      // Navigate to the input page and pass the data as a query parameter
      this.router.navigate(['/input-page']);
    } else {
      console.warn('No data to pass.'); // Log a warning if there's no data to pass
    }
  }
}
