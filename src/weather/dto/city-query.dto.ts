import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CityQueryDto {
    @ApiProperty({
        description: 'City name to search for weather information',
        example: 'New York',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    city: string;
}