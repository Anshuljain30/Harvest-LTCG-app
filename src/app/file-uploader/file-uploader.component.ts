import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent {
  data: any[][] = [];
  headers: string[] = [];

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

      this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.headers = this.data.shift() || []; // Remove headers from data
      this.headers.unshift('Index');
      this.data = this.data.map((item, index) => [index + 1, ...item]);
    };

    reader.readAsBinaryString(file);
  }
}
