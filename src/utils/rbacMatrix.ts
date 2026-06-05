import { Role } from '@prisma/client';

 export type rbacAction = 'create' | 'read' | 'update';

export type rbacResource = Record<
    'contents' | 'users',
Record<rbacAction, Role[]>>;




export const rbacMatrix: rbacResource = {
    contents: {
        create: [Role.ADMIN, Role.EDITOR],
        read: [Role.ADMIN, Role.EDITOR, Role.VIEWER],
        update: [Role.ADMIN, Role.EDITOR],
    },
    users: {
        create: [],
        read: [Role.ADMIN],
        update: [Role.ADMIN],
    }
};

export function canPerformAction(
    role: Role,
    resource: keyof rbacResource,
    action: rbacAction
): boolean {
    const allowedRoles = rbacMatrix[resource]?.[action];
    return allowedRoles.includes(role);
};