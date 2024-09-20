import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ToolDto {
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

  constructor(partial: Partial<ToolDto>) {
    Object.assign(this, partial);
  }
}
