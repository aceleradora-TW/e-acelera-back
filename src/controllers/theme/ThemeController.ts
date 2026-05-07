import { plainToInstance } from "class-transformer";
import { ValidationError, validateOrReject } from "class-validator";
import type { Request, Response } from "express";
import { GetThemeByCategoryDTO } from "../../dtos/GetThemeByCategory.dto.js";
import { GetThemeByIdDTO } from "../../dtos/GetThemeById.dto.js";
import { CreateThemeDTO } from "../../dtos/CreateTheme.dto.js";
import { UpdateThemeDTO } from "../../dtos/UpdateTheme.dto.js";
import { ThemeService } from "../../services/theme/ThemeService.js";
import { STATUS_CODE } from "../../utils/constants.js";
import { getPaginationParams } from "../../utils/pagination.js";

export class ThemeController {
  private themeService: ThemeService;

  constructor() {
    this.themeService = new ThemeService();
  }

  async createTheme(req: Request, res: Response) {
    const dto = plainToInstance(CreateThemeDTO, req.body, {
      enableImplicitConversion: true,
    });

    try {
      await validateOrReject(dto);

      const theme = await this.themeService.createTheme(dto);

      return res.status(STATUS_CODE.CREATED).json(theme);
    } catch (error: any) {
      const errorResponse = {
        message: "Error creating theme",
        details: error,
      };
      if (
        Array.isArray(error) &&
        error.every((err) => err instanceof ValidationError)
      ) {
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponse);
      }

      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }

  async getThemes(req: Request, res: Response) {
    const dto = plainToInstance(GetThemeByCategoryDTO, req.query, {
      enableImplicitConversion: true,
    });
    try {
      await validateOrReject(dto);
      const { page, limit } = getPaginationParams(req);
      const result = await this.themeService.getThemes(
        dto.category,
        page,
        limit,
      );
      return res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ message: "Error fetching themes", details: error });
    }
  }

  async getThemeById(req: Request, res: Response) {
    const dto = plainToInstance(GetThemeByIdDTO, req.params, {
      enableImplicitConversion: true,
    });
    try {
      await validateOrReject(dto);
      const theme = await this.themeService.getThemeById(dto.id);

      if (!theme) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ message: "Theme not found" });
      }
      return res.status(STATUS_CODE.OK).json(theme);
    } catch (error) {
      const errorResponse = {
        message: "Error fetching theme",
        details: error,
      };

      if (
        Array.isArray(error) &&
        error.every((err) => err instanceof ValidationError)
      ) {
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponse);
      }
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(errorResponse);
    }
  }

  async updateTheme(req: Request, res: Response) {
    const id = req.params.id.trim();

    const dto = plainToInstance(UpdateThemeDTO, req.body, {
      enableImplicitConversion: true,
    });

    try {
      await validateOrReject(dto);

      const theme = await this.themeService.updateTheme(id, dto);

      return res.status(STATUS_CODE.OK).json(theme);
    } catch (error: any) {
      const errorResponse = {
        message: "Error updating theme",
        details: error,
      };

      if (
        Array.isArray(error) &&
        error.every((err) => err instanceof ValidationError)
      ) {
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponse);
      }

      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }

  async deleteTheme(req: Request, res: Response) {
    const id = req.params.id.trim();

    try {
      const theme = await this.themeService.deleteTheme(id);
      return res.status(STATUS_CODE.OK).json(theme);
    } catch (error: any) {
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ message: "Error deleting theme", details: error });
    }
  }
}
