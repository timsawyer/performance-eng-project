import { Component } from '@angular/core';
import {
  ITemplate,
  IframeReadyMessage,
  IMessage,
  SET_BULK_TEMPLATES,
  SetBulkTemplates,
  CompilationCompleteMessage
} from 'projects/common/src/public_api';
import { PostMessageService } from 'projects/common/src/lib/post-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public templates: ITemplate[] = [];
  private _id: string;

  public templatesCompiled: { [templateName: string]: boolean };

  constructor(private _messageService: PostMessageService) {
    console.log('Bulk compiler iframe: instantiated');

    // get id from hash string
    this._id = window.location.hash.substring(1);

    this._messageService.messages$.subscribe(this.onMessage);

    this._messageService.postMessageToParent(new IframeReadyMessage(this._id));
  }

  public onCompilationComplete(template: ITemplate) {
    this.templatesCompiled[template.name] = true;

    const notCompiled = Object.values(this.templatesCompiled).filter(value => !value);
    if (notCompiled.length === 0) {
      const timestamp = performance.now();
      this._messageService.postMessageToParent(new CompilationCompleteMessage(this._id));
    }
  }

  private onMessage = (message: IMessage) => {
    if (message.name === SET_BULK_TEMPLATES) {
      const bulkTemplateMessage = message as SetBulkTemplates;
      const { templates } = bulkTemplateMessage;

      // set compiled status of each to false
      this.templatesCompiled = {};
      templates.forEach(t => {
        this.templatesCompiled[t.name] = false;
      });

      this.templates = templates;
    }
  };
}
