import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ToolResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  link: string;

  @Expose()
  tags: string[];

  constructor(partial: Partial<ToolResponseDto>) {
    Object.assign(this, partial);
  }
}
