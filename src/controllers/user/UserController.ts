import type { Request, Response } from 'express';
import { UserService } from '../../services/UserService.js';


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

        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ role: user.role });
    }
}

export default UserController;
