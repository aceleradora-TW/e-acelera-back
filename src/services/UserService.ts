import prisma from "../../client.js";

export class UserService {
	async findUserByEmail(email: string) {
		try {
			const user = await prisma.user.findUnique({ where: { email } });
			return user ?? null;
		} catch (error) {
			throw new Error("Error fetching user from database");
		}
	}
}
