import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.css'],
})
export class InputPageComponent implements OnInit {
  fundNames: string[] = [];
  formData: any = {};
  formErrors: any = {};

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000; // Duration in milliseconds
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    config.panelClass = ['custom-snackbar']; // Add custom CSS class
    this.snackBar.open(message, 'Close', config);
  }
  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    // Retrieve headers from shared data service
    this.fundNames = this.sharedDataService.fundNames;
    if (this.fundNames.length === 0) {
      this.router.navigate(['/']); // Navigate to the home page
    }
    this.fundNames.forEach((fund) => {
      this.formData[fund] = '';
    });
  }

  submitForm() {
    // Log form data to console
    // Reset form errors
    this.formErrors = {};

    // Validate each form field
    Object.keys(this.formData).forEach((key) => {
      const value = this.formData[key];
      if (!isValidPositiveNumber(value)) {
        this.openSnackBar(`Please enter a valid positive number for ${key}.`);
      }
    });

    // Check if there are any errors
    if (Object.keys(this.formErrors).length === 0) {
      this.sharedDataService.currentNav = this.formData;
      console.log(
        'this.sharedDataService.currentNav',
        this.sharedDataService.currentNav
      );
    }

    function isValidPositiveNumber(value: any): boolean {
      // Regular expression to match positive numbers
      const positiveNumberPattern = /^\d+(\.\d+)?$/;
      return positiveNumberPattern.test(value);
    }
  }
}
