import {IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'My Task' })
  @IsString()
  title!: string;
}