export interface ITemplate {
  name: string;
  contents: string;
  selected?: boolean;
}

export interface IMessage {
  name: string;
  iframeMessage: boolean;
}

// Messages
export const IFRAME_READY = 'Iframe Ready';
export const SET_TEMPLATE = 'Set Template';
export const SET_BULK_TEMPLATES = 'Set Bulk Templates';
export const COMPILATION_COMPLETE = 'Compilation complete';

export class IframeReadyMessage implements IMessage {
  public readonly name = IFRAME_READY;
  public readonly iframeMessage = true;
  constructor(public id: string) {}
}

export class SetTemplateMessage implements IMessage {
  public readonly name = SET_TEMPLATE;
  public readonly iframeMessage = true;
  constructor(public template: ITemplate) {}
}

export class SetBulkTemplates implements IMessage {
  public readonly name = SET_BULK_TEMPLATES;
  public readonly iframeMessage = true;
  constructor(public templates: ITemplate[]) {}
}

export class CompilationCompleteMessage implements IMessage {
  public readonly name = COMPILATION_COMPLETE;
  public readonly iframeMessage = true;
  constructor(public id: string) {}
}
