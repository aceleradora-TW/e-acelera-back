import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTopicDTO {
	@IsString()
	@IsNotEmpty({ message: "Title is required" })
	title!: string;

	@IsString()
	@IsNotEmpty({ message: "Description is required" })
	description!: string;

	@IsString()
	@IsNotEmpty({ message: "Short description is required" })
	shortDescription!: string;

	@IsString()
	references!: string;
	
	@IsString()
	@IsNotEmpty({ message: "Theme ID is required" })
	themeId!: string;

	@IsNumber()
	@IsNotEmpty({ message: "Sequence is required" })
	sequence!: number;

	@IsString()
	@IsNotEmpty({ message: "Video URL is required" })
	videoUrl!: string;
}
