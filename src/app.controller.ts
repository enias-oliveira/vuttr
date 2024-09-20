import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateToolDto } from './dto/create-tool.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createTool(@Body() data: CreateToolDto) {
    return this.appService.createTool(data);
  }
}
