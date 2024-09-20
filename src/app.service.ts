import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { ToolResponseDto } from './dto/tool-response.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTool({ tags, ...data }: CreateToolDto): Promise<ToolResponseDto> {
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
}
