import { NgModule } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { RendererComponent } from './renderer/renderer.component';
import { PostMessageService } from './post-message.service';

@NgModule({
  declarations: [BoardComponent, RendererComponent],
  imports: [],
  exports: [BoardComponent, RendererComponent],
  providers: [PostMessageService]
})
export class CommonModule {}
