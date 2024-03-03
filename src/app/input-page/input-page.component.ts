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
        this.formErrors[key] = 'Please enter a valid positive number.';
        this.openSnackBar(`Please enter a valid positive number for ${key}.`);
      }
    });

    // Check if there are any errors
    if (Object.keys(this.formErrors).length === 0) {
      this.sharedDataService.currentNav = this.formData;
      this.sharedDataService.jsonData = this.sharedDataService.data.map(
        (item) => {
          const [id, schemeName, transactionType, units, nav, amount, date] =
            item;
          return {
            'Scheme Name': schemeName,
            'Transaction Type': transactionType,
            Units: units,
            NAV: nav,
            Amount: amount,
            Date: date,
          };
        }
      );
      this.sharedDataService.jsonData = this.sharedDataService.jsonData.map(
        (obj: any) => {
          if (obj.Date) {
            // Convert the date string to a JavaScript Date object
            const date = new Date(obj.Date);

            // Add +5 hours and 30 minutes
            const newDate = new Date(
              date.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000
            );

            // Format the date string in ISO 8601 format
            obj.Date = newDate.toISOString();
          }
          return obj;
        }
      );
      const cutoffDate = new Date('2023-04-01T00:00:00.000Z');
      this.sharedDataService.jsonData = this.sharedDataService.jsonData.filter(
        (record: any) => {
          const recordDate = new Date(record.Date);
          return recordDate < cutoffDate;
        }
      );
      const { profits, units } = calculateProfit(
        this.sharedDataService.currentNav,
        this.sharedDataService.jsonData
      );
      this.sharedDataService.output = Object.keys(profits).map(
        (schemeName) => ({
          Scheme: schemeName,
          Units: units[schemeName].toFixed(2),
          Profit: profits[schemeName].toFixed(2),
        })
      );
      this.router.navigate(['/result']);
    }

    function calculateProfit(currentNavs: any, purchaseData: any) {
      const profitMap: any = {};
      const unitMap: any = {};
      let i = 0;

      purchaseData.forEach((purchase: any) => {
        let schemeName = purchase['Scheme Name'];
        const units = parseFloat(purchase['Units']);
        const purchaseAmount = parseFloat(purchase['Amount'].replace(/,/g, ''));

        // Retrieve the current NAV for the scheme
        const currentNav = currentNavs[schemeName];

        unitMap[schemeName] =
          Math.round((units + unitMap[schemeName] || 0) * 100) / 100;

        profitMap[schemeName] =
          Math.round(
            (units * currentNav - purchaseAmount + profitMap[schemeName] || 0) *
              100
          ) / 100;
      });

      return { profits: profitMap, units: unitMap };
    }

    function isValidPositiveNumber(value: any): boolean {
      // Regular expression to match positive numbers
      const positiveNumberPattern = /^\d+(\.\d+)?$/;
      return positiveNumberPattern.test(value);
    }
  }
}
