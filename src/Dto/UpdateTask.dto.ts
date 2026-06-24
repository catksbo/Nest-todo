import {IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 'My Updated Task' })
  @IsString()
  title!: string;

  @ApiProperty({description: 'Pass id of the user', example: '4635d7e1-79dc-43be-a9ca-5738d30492d0' })
  @IsString()
  id!: string;
}