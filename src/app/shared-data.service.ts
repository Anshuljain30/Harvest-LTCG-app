import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  data: any[][] = [];
  headers: string[] = [];
  fundNames: string[] = [];
  currentNav: any = {};
  jsonData: any = [];
  output: any = [];

  constructor() {}
}
