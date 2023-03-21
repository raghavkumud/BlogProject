
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditBlogDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title?: string;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content?: string;

}