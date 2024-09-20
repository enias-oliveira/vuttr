import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ToolResponseDto } from './dto/tool-response.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tool' })
  @ApiResponse({
    status: 201,
    description: 'The tool has been successfully created.',
    type: ToolResponseDto,
  })
  async createTool(@Body() data: CreateToolDto): Promise<ToolResponseDto> {
    const createdTool = await this.appService.createTool(data);
    return new ToolResponseDto(createdTool);
  }
}
