import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component'; // Import the component

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent, // Declare the component
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
