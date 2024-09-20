import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { ToolDto } from './dto/tool.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTool({ tags, ...data }: CreateToolDto): Promise<ToolDto> {
    const tool = await this.prismaService.tool.create({
      data: {
        ...data,
        tags: {
          connectOrCreate: tags.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      },
      include: { tags: true },
    });
    return { ...tool, tags: tool.tags.map((tag) => tag.name) };
  }

  async getTools(tag: string): Promise<ToolDto[]> {
    const tools = await this.prismaService.tool.findMany({
      where: {
        tags: {
          some: {
            name: tag,
          },
        },
      },
      include: { tags: true },
    });
    return tools.map((tool) => ({
      ...tool,
      tags: tool.tags.map((tag) => tag.name),
    }));
  }
}
