import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ITemplate,
  SetBulkTemplates,
  IMessage,
  IFRAME_READY,
  IframeReadyMessage,
  COMPILATION_COMPLETE,
  CompilationCompleteMessage
} from 'projects/common/src/public_api';
import { PostMessageService } from 'projects/common/src/lib/post-message.service';

@Component({
  selector: 'app-bulk-compiler-wrapper',
  templateUrl: './bulk-compiler-wrapper.component.html',
  styleUrls: ['./bulk-compiler-wrapper.component.scss']
})
export class BulkCompilerWrapperComponent implements OnInit {
  @Input() templates: ITemplate[] = [];

  @ViewChild('iframe', { read: ElementRef }) iframeRef: ElementRef;

  @Output() ready = new EventEmitter<boolean>();
  @Output() complete = new EventEmitter();

  constructor(private _messageService: PostMessageService) {
    this._messageService.messages$.subscribe(this.onMessage);
  }

  ngOnInit() {}

  private onMessage = (message: IMessage) => {
    if (message.name === IFRAME_READY) {
      const readyMessage = message as IframeReadyMessage;

      if (readyMessage.id === 'bulk') {
        this.ready.emit(true);
      }
    } else if (message.name === COMPILATION_COMPLETE) {
      const completeMessage = message as CompilationCompleteMessage;

      if (completeMessage.id === 'bulk') {
        this.complete.emit();
      }
    }
  };

  public compile() {
    const message = new SetBulkTemplates(this.templates);
    this._messageService.postMessageToIframe(this.iframeRef.nativeElement, message);
  }
}
