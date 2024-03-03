import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  data: any[] = []; // Define a property to hold the shared data

  constructor() {}
}
