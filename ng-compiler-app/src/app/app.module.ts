import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import { CommonModule } from '../../projects/common/src/public_api';
import { CompilerWrapperComponent } from './compiler-wrapper/compiler-wrapper.component';
import { BulkCompilerWrapperComponent } from './bulk-compiler-wrapper/bulk-compiler-wrapper.component';

@NgModule({
  declarations: [AppComponent, CompilerWrapperComponent, BulkCompilerWrapperComponent],
  imports: [
    BrowserModule,
    NgCommonModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
