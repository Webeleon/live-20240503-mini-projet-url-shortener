import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Response,
} from '@nestjs/common';
import { UrlService } from './url/url.service';

@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

  @Get('/health')
  getHello(): string {
    return 'ok';
  }

  @Get('/r/:shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Response() response) {
    const url = await this.urlService.findOne(shortCode);
    if (!url) {
      throw new NotFoundException();
    }

    response.redirect(301, url.url);
  }
}
