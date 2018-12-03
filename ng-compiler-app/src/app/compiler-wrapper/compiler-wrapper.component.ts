import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import {
  ITemplate,
  IFRAME_READY,
  IframeReadyMessage,
  IMessage,
  SetTemplateMessage,
  COMPILATION_COMPLETE,
  CompilationCompleteMessage
} from 'projects/common/src/public_api';
import { PostMessageService } from 'projects/common/src/lib/post-message.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-compiler-wrapper',
  templateUrl: './compiler-wrapper.component.html',
  styleUrls: ['./compiler-wrapper.component.scss']
})
export class CompilerWrapperComponent implements OnChanges {
  @Input() template: ITemplate;
  @Input() templateNumber = 1;

  @ViewChild('iframe', { read: ElementRef }) iframeRef: ElementRef;

  @Output() ready = new EventEmitter<boolean>();
  @Output() complete = new EventEmitter();

  public src: SafeResourceUrl;
  private _sentTemplatesTimestamp = 0;

  constructor(private _messageService: PostMessageService, private _sanitizer: DomSanitizer) {
    this._messageService.messages$.subscribe(this.onMessage);
  }

  private onMessage = (message: IMessage) => {
    if (message.name === IFRAME_READY) {
      const readyMessage = message as IframeReadyMessage;

      if (readyMessage.id === this.template.name) {
        this.ready.emit(true);
      }
    } else if (message.name === COMPILATION_COMPLETE) {
      const completeMessage = message as CompilationCompleteMessage;

      if (completeMessage.id === this.template.name) {
        this.complete.emit();
      }
    }
  };

  ngOnChanges() {
    this.src = this._sanitizer.bypassSecurityTrustResourceUrl(
      `//localhost${this.templateNumber + 1}:4200/assets/compiler-iframe/index.html#${
        this.template.name
      }`
    );
  }

  public compile() {
    this._sentTemplatesTimestamp = performance.now();
    const message = new SetTemplateMessage(this.template);
    this._messageService.postMessageToIframe(this.iframeRef.nativeElement, message);
  }
}
