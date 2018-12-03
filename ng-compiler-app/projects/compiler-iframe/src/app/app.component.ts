import { Component, ViewChild } from '@angular/core';
import {
  ITemplate,
  IframeReadyMessage,
  SET_TEMPLATE,
  SetTemplateMessage,
  IMessage,
  CompilationCompleteMessage
} from 'projects/common/src/public_api';
import { PostMessageService } from 'projects/common/src/lib/post-message.service';
import { RendererComponent } from 'projects/common/src/lib/renderer/renderer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public contents: string;
  public template: ITemplate;
  private _id: string;

  @ViewChild('renderer') renderer: RendererComponent;

  constructor(private _messageService: PostMessageService) {
    console.log('Single compiler iframe: instantiated');

    // get id from hash string
    this._id = window.location.hash.substring(1);

    this._messageService.messages$.subscribe(this.onMessage);

    this._messageService.postMessageToParent(new IframeReadyMessage(this._id));
  }

  private onMessage = (message: IMessage) => {
    if (message.name === SET_TEMPLATE) {
      const templateMessage = message as SetTemplateMessage;
      this.template = templateMessage.template;
      const newContents = templateMessage.template.contents;

      // if recompiling same contents - force change detection / recompile
      if (newContents === this.contents) {
        this.renderer.ngOnChanges();
      } else {
        this.contents = newContents;
      }
    }
  };

  public onComplete() {
    this._messageService.postMessageToParent(new CompilationCompleteMessage(this._id));
  }
}
