import type { Request, Response } from 'express';
import { UserService } from '../../services/UserService.js';
import { NotFoundError } from '../../errors/HttpErrors.js';


export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    async getUserRole(req: Request, res: Response) {
        const email = req.headers.email;

        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: 'Email header is required and must be a string' });
        }

        try {
            const user = await this.userService.findUserByEmail(email);

            return res.status(200).json({ role: user.role });
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(404).json(error);
            }

            return res.status(500).json('Internal server error.')
        }
    }
}

export default UserController;
