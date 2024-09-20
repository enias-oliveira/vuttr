import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateToolDto } from './dto/create-tool.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTool({ tags, ...data }: CreateToolDto) {
    return this.prismaService.tool.create({
      data: {
        ...data,
        tags: {
          create: tags.map((tag) => ({ name: tag })),
        },
      },
    });
  }
}
