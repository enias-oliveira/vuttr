import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Delete,
  UseInterceptors,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiParam } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'tag', required: false, type: String })
  async getTools(@Query('tag') tag?: string): Promise<ToolDto[]> {
    const tools = await this.appService.getTools(tag);
    return tools.map((tool) => new ToolDto(tool));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tool by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Tool ID' })
  @ApiResponse({
    status: 200,
    description: 'The tool has been successfully deleted.',
    type: ToolDto,
  })
  async deleteTool(@Param('id', ParseIntPipe) id: number): Promise<ToolDto> {
    const deletedTool = await this.appService.deleteTool(id);
    return new ToolDto(deletedTool);
  }
}
