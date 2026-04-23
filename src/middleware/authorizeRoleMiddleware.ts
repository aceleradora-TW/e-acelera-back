import type { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '../utils/constants.js';
import { Role } from '@prisma/client';

export const authorizeRoleMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;

		const allowedRoles: Role[] = [Role.ADMIN, Role.EDITOR];

		if (!user) {
		return res.status(STATUS_CODE.UNAUTHORIZED).json({
				message: 'user not found',
			});
		}
		
		if (!allowedRoles.includes(user.role)) {
			return res.status(STATUS_CODE.FORBIDDEN).json({
				message: 'You do not have permission to perform this action',
			});	
		}

		next();
			
	} catch (error) {
		console.error('Error in authorizeRoleMiddleware:', error);
	}
	
};

