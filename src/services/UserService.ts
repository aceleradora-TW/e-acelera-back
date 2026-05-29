import prisma from "../../client.js";
import { NotFoundError } from "../errors/HttpErrors.js";

export class UserService {
    async findUserByEmail(email: string) {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) throw new NotFoundError("User not found.");

            return user;
    }
}
