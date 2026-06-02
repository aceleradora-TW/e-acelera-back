import type { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '../utils/constants.js';
import { canPerformAction, rbacAction, rbacMatrix } from '../utils/rbacMatrix.js';

export const authorizeRoleMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.user;
	const resource = req.baseUrl.split('/')[1] as keyof typeof rbacMatrix;
	const action = req.method.toLowerCase() as rbacAction;

	if (!user) {
		return res.status(STATUS_CODE.UNAUTHORIZED).json({
			message: 'user not found',
		});
	}

	const hasAccess = canPerformAction(user.role, resource, action);

	if (!hasAccess) {
		return res.status(STATUS_CODE.FORBIDDEN).json({
			message: 'You do not have permission to perform this action',
		});
	}

	next();
};


