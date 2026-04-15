import { IsString, IsInt, Min } from 'class-validator';

export class CreateMachineDto {
  @IsString()
  hostname: string;

  @IsString()
  password: string;

  @IsInt()
  @Min(1)
  cpuCores: number;

  @IsInt()
  @Min(1)
  memorySize: number;

  @IsInt()
  @Min(1)
  diskSize: number;

  @IsString()
  os: string;
}