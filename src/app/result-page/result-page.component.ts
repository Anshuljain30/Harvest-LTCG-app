import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
})
export class ResultPageComponent implements OnInit {
  outputData: any[] = [];

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.outputData = this.sharedDataService.output;
    console.log(this.outputData);

    if (this.outputData.length === 0) {
      this.router.navigate(['/']); // Navigate to the home page
    }
  }
}
