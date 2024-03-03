import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { InputPageComponent } from './input-page/input-page.component'; // Import the component

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    InputPageComponent, // Declare the component
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
