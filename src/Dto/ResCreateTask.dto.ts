import { ApiProperty } from '@nestjs/swagger';

export class ResCreateTaskDto { 
    @ApiProperty({ example: "f3b8e495-a56c-4497-8a8e-db076eccf294"} )
  id!: string;
    @ApiProperty({ example: "Task 1"} )
  title!: string;
    @ApiProperty({ example: "2022-01-01T00:00:00.000Z"} )
  createdAt!: string; 
    @ApiProperty({ example: "2022-01-01T00:00:00.000Z"} )
  updatedAt!: string; 
    @ApiProperty({ example: "f3b8e495-a56c-4497-8a8e-db076eccf294"} )
  userId!: string;
}