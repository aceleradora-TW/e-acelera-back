import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTopicDTO {
	@IsString()
	@IsNotEmpty()
	title!: string;

	@IsString()
	description!: string;

	@IsString()
	shortDescription!: string;

	@IsString()
	references!: string;
	
	@IsString()
	@IsNotEmpty()
	themeId!: string;

	@IsNumber()
	sequence!: number;

	@IsString()
	videoUrl!: string;
}
