import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Compiler,
  ViewChild,
  ViewContainerRef,
  NgModule,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule } from '@angular/material';

@Component({
  selector: 'lib-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.css']
})
export class RendererComponent implements OnChanges, AfterViewInit {
  private viewInitialized = false;
  @Input() template: string;
  @Output() complete = new EventEmitter();

  @ViewChild('insertLoc', { read: ViewContainerRef })
  insertLocation: ViewContainerRef;

  constructor(private ngCompiler: Compiler) {}

  ngOnChanges() {
    if (this.viewInitialized) {
      this.compile();
    }
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.compile();
  }

  public async compile() {
    if (this.template) {
      const newComponent = Component({ template: this.template })(class {});
      const tmpModule = NgModule({
        declarations: [newComponent],
        imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule]
      })(class {});

      this.insertLocation.clear();
      const factories = await this.ngCompiler.compileModuleAndAllComponentsAsync(tmpModule);
      const f = factories.componentFactories[0];
      const cmpRef = this.insertLocation.createComponent(f);
      this.complete.emit();
    } else {
      this.insertLocation.clear();
    }
  }
}
