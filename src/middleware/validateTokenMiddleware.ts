import type { NextFunction, Request, Response } from 'express';
import prisma from '../../client.js';
import { TokenService } from '../services/TokenService.js';
import { STATUS_CODE } from '../utils/constants.js';
import { Role } from '@prisma/client';

export async function validateTokenMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const tokenService = new TokenService();
	const token = req.headers.authorization?.split(' ')[1];

	
	if (!token) {
		return res
			.status(STATUS_CODE.UNAUTHORIZED)
			.json({ message: 'Token was not provided' });
	}

	const extractToken = await tokenService.extractToken(token);
	const email = extractToken?.email;

	try {
		if (!email) {
			return res
				.status(STATUS_CODE.TOKEN_EXPIRED)
				.json({ message: 'Token invalid' });
		}

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return res
				.status(STATUS_CODE.NOT_FOUND)
				.json({ message: 'Authentication failled' });
		}

		

		// TODO: A role agora vem do banco, mas ainda precisamos estudar como passar essa propriedade corretamente via OAUTH.
		req.user = { email: user.email, id: +user.id, role: user.role };
		
		next();
	} catch (_error) {
		return res
			.status(STATUS_CODE.UNAUTHORIZED)
			.json({ message: 'Authentication failed' });
	}
}
