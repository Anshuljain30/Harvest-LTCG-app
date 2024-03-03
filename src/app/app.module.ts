import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { InputPageComponent } from './input-page/input-page.component';
import { SharedDataService } from './shared-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: FileUploaderComponent, pathMatch: 'full' },
  { path: 'file-uploader', component: FileUploaderComponent },
  { path: 'input-page', component: InputPageComponent },
  // Add more routes as needed
];

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    InputPageComponent, // Declare the component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
