import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateFavoriteDto {
    @ApiProperty({
        description: "Name of the favorite city",
        example: "London",
        required: true,
        type: String,
        nullable: false,
    })
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Region of the favorite city",
        example: "England",
        required: true,
        type: String,
        nullable: false,
    })
    @MinLength(1)
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    region: string;

    @ApiProperty({
        description: "Country of the favorite city",
        example: "United Kingdom",
        required: true,
        type: String,
        nullable: false,
    })
    @MinLength(1)
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty({
        description: "latitude of the favorite city",
        example: 51.5074,
        required: true,
        type: Number,
        nullable: false,
    })
    @Type(() => Number)
    @IsLatitude()
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @ApiProperty({
        description: "Longitude of the favorite city",
        example: -0.1278,
        required: true,
        type: Number,
        nullable: false,
    })
    @Type(() => Number)
    @IsLongitude()
    @IsNumber()
    @IsNotEmpty()
    longitude: number;
}