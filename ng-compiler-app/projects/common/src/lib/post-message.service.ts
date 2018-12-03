import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { IMessage } from './interfaces';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostMessageService {
  public messages$: Observable<IMessage>;

  constructor() {
    // subscribe to post messages
    this.messages$ = fromEvent(window, 'message').pipe(
      filter(e => (e as MessageEvent).data && (e as MessageEvent).data.iframeMessage),
      map(e => (e as MessageEvent).data)
    );
  }

  public postMessageToParent(message: IMessage) {
    const targetOrigin = '*'; // TODO (timsawyer): pull correction origin's from environments object
    window.parent.postMessage(message, targetOrigin);
  }

  public postMessageToIframe(iframe: HTMLIFrameElement, message: IMessage) {
    const { contentWindow } = iframe;
    const targetOrigin = '*'; // TODO (timsawyer): pull correction origin's from environments object
    if (contentWindow) {
      contentWindow.postMessage(message, targetOrigin);
    }
  }
}
