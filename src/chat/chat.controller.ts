import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { FlowiseChatDto } from './dto/flowise-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('flowise')
  flowise(@Body() body: FlowiseChatDto) {
    return this.chatService.flowiseChat(body);
  }
}
