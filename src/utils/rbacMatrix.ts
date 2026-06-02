import { Role } from '@prisma/client';

 export type rbacAction = 'create' | 'read' | 'update' | 'list';

export type rbacResource = Record<
    'topics' | 'themes' | 'exercises', 
Record<rbacAction, Role[]>>;




export const rbacMatrix: rbacResource = {
    themes: {
        create: [Role.ADMIN, Role.EDITOR],
        read: [Role.ADMIN, Role.EDITOR, Role.VIEWER],
        update: [Role.ADMIN, Role.EDITOR],
        list: [Role.ADMIN, Role.EDITOR, Role.VIEWER],
    },
    topics: {
        create: [Role.ADMIN, Role.EDITOR],
        read: [Role.ADMIN, Role.EDITOR, Role.VIEWER],
        update: [Role.ADMIN, Role.EDITOR],
        list: [Role.ADMIN, Role.EDITOR, Role.VIEWER],
    },
    exercises: {
        create: [Role.ADMIN, Role.EDITOR],
        read: [Role.ADMIN, Role.EDITOR, Role.VIEWER],
        update: [Role.ADMIN, Role.EDITOR],
        list: [Role.ADMIN, Role.EDITOR, Role.VIEWER],
    },
};

export function canPerformAction(
    role: Role,
    resource: keyof rbacResource,
    action: rbacAction
): boolean {
    const allowedRoles = rbacMatrix[resource]?.[action];
    return allowedRoles.includes(role);
}