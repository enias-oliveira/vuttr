import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ToolDto } from './dto/tool.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tool' })
  @ApiResponse({
    status: 201,
    description: 'The tool has been successfully created.',
    type: ToolDto,
  })
  async createTool(@Body() data: CreateToolDto): Promise<ToolDto> {
    const createdTool = await this.appService.createTool(data);
    return new ToolDto(createdTool);
  }

  @Get()
  @ApiOperation({ summary: 'List all tools' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all tools.',
    type: [ToolDto],
  })
  async getTools(): Promise<ToolDto[]> {
    const tools = await this.appService.getTools();
    return tools.map((tool) => new ToolDto(tool));
  }
}
