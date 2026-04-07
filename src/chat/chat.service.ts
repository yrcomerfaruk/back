import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FlowiseChatDto } from './dto/flowise-chat.dto';

@Injectable()
export class ChatService {
  private readonly defaultFlowiseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.defaultFlowiseUrl =
      this.configService.get<string>('FLOWISE_PREDICTION_URL') ??
      'https://derece.up.railway.app/api/v1/prediction/c6f7f163-d503-4922-8557-b4ac4f2e78a7';

    if (!this.defaultFlowiseUrl) {
      throw new Error('FLOWISE_PREDICTION_URL must be defined');
    }
  }

  async flowiseChat(data: FlowiseChatDto) {
    const url = data.flowId ? this.buildFlowiseUrl(data.flowId) : this.defaultFlowiseUrl;
    const payload = data.input ?? data.prompt;

    if (!payload) {
      throw new BadRequestException('prompt or input is required');
    }

    // Flowise API expects JSON with question field (not input)
    const body = { question: payload };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new InternalServerErrorException(result?.message ?? result?.error ?? 'Flowise request failed');
    }

    return result;
  }

  private buildFlowiseUrl(flowId: string) {
    if (flowId.startsWith('http')) {
      return flowId;
    }

    return `https://derece.up.railway.app/api/v1/prediction/${flowId}`;
  }
}
