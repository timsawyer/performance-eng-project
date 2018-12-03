import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ITemplate } from 'projects/common/src/public_api';
import { BulkCompilerWrapperComponent } from './bulk-compiler-wrapper/bulk-compiler-wrapper.component';
import { CompilerWrapperComponent } from './compiler-wrapper/compiler-wrapper.component';
import { DEFAULT_TEMPLATE } from './default_template';
import { DEFAULT_MATERIAL_TEMPLATE } from './default_material_template';

enum ThreadOptions {
  single = 'single',
  multiple = 'multiple'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('bulkCompiler') bulkCompilerWrapper: BulkCompilerWrapperComponent;
  @ViewChildren(CompilerWrapperComponent) compilerWrappers!: QueryList<CompilerWrapperComponent>;

  public logMessages: string[] = [];

  public templates: ITemplate[] = [
    { name: 'Template1.html', contents: DEFAULT_MATERIAL_TEMPLATE, selected: true },
    { name: 'Template2.html', contents: DEFAULT_TEMPLATE, selected: false }
  ];

  // only for when thread option = multiple
  public templateCompilersReady: { [templateName: string]: boolean };
  public templateCompilersComplete: { [templateName: string]: boolean };

  public selectedTemplate: ITemplate = this.templates[0];
  public editorOptions = {
    theme: 'vs-dark',
    language: 'html',
    minimap: {
      enabled: false
    }
  };
  public threadOptions = ThreadOptions;
  public selectedThreadOption: ThreadOptions = this.threadOptions.single;
  private _threadOptionChangeTimestamp = 0;

  public compilerReady = false;
  public compileClicked = false;
  private _compileRequestTimestamp = 0;

  constructor() {
    this.resetCompilerReadyStatuses();
    this.resetCompilerCompleteStatuses();
  }

  ngAfterViewInit() {
    this._threadOptionChangeTimestamp = performance.now();
  }

  public clearLogs() {
    this.logMessages = [];
  }

  private resetCompilerReadyStatuses() {
    this.templateCompilersReady = {};
    this.templates.forEach(t => {
      this.templateCompilersReady[t.name] = false;
    });
  }

  private resetCompilerCompleteStatuses() {
    this.templateCompilersComplete = {};
    this.templates.forEach(t => {
      this.templateCompilersComplete[t.name] = false;
    });
  }

  private areAllCompilersReady() {
    const notReadyCompilers = Object.values(this.templateCompilersReady).filter(value => !value);
    return notReadyCompilers.length === 0;
  }

  private areAllCompilersComplete() {
    const notReadyCompilers = Object.values(this.templateCompilersComplete).filter(value => !value);
    return notReadyCompilers.length === 0;
  }

  public compileTemplates() {
    this.compileClicked = true;
    this._compileRequestTimestamp = performance.now();

    if (this.selectedThreadOption === ThreadOptions.single) {
      this.bulkCompilerWrapper.compile();
    } else {
      this.resetCompilerCompleteStatuses();
      this.compilerWrappers.forEach((cw: CompilerWrapperComponent) => {
        cw.compile();
      });
    }
  }

  public onThreadOptionChange() {
    this.resetCompilerReadyStatuses();
    this.compilerReady = false;
    this.compileClicked = false;
    this._threadOptionChangeTimestamp = performance.now();
  }

  public openTemplate(template: ITemplate) {
    if (this.selectedTemplate) {
      this.selectedTemplate.selected = false;
    }
    this.selectedTemplate = template;
    this.selectedTemplate.selected = true;
  }

  public updateTemplate(updatedTemplate: string) {
    if (this.selectedTemplate) {
      this.selectedTemplate.contents = updatedTemplate;
    }
  }

  public addTemplate() {
    const name = `Template${this.templates.length + 1}.html`;
    const newTemplate = { name, contents: DEFAULT_TEMPLATE };
    this.templates.push(newTemplate);

    this.templateCompilersReady[name] = false;
    this._threadOptionChangeTimestamp = performance.now();
  }

  public onBulkCompilerReady(ready: boolean) {
    if (this.selectedThreadOption === this.threadOptions.single) {
      this.compilerReady = ready;

      const setupTime = Math.round(performance.now() - this._threadOptionChangeTimestamp);
      this.addLogMessage(`Single thread compiler setup time: ${setupTime}ms`);
    }
  }

  public onBulkCompilerComplete() {
    if (this.selectedThreadOption === this.threadOptions.single) {
      const compileTime = Math.round(performance.now() - this._compileRequestTimestamp);
      this.addLogMessage(`Single thread compilation time: ${compileTime}ms`);
    }
  }

  public onCompilerReady(ready: boolean, template: ITemplate) {
    if (this.selectedThreadOption === this.threadOptions.multiple) {
      this.templateCompilersReady[template.name] = ready;
      this.compilerReady = this.areAllCompilersReady();

      if (this.compilerReady) {
        const setupTime = Math.round(performance.now() - this._threadOptionChangeTimestamp);
        this.addLogMessage(`Multi-thread compiler setup time: ${setupTime}ms`);
      }
    }
  }

  public onCompilerComplete(template: ITemplate) {
    if (this.selectedThreadOption === this.threadOptions.multiple) {
      this.templateCompilersComplete[template.name] = true;
      const compilationComplete = this.areAllCompilersComplete();

      if (compilationComplete) {
        const compileTime = Math.round(performance.now() - this._compileRequestTimestamp);
        this.addLogMessage(`Multi-thread compilation time: ${compileTime}ms`);
      }
    }
  }

  public addLogMessage(message: string) {
    this.logMessages.push(message);

    // scroll to bottom
    const logScroller = document.getElementById('logScroller');
    logScroller.scrollTop = logScroller.scrollHeight + 44;
  }
}
