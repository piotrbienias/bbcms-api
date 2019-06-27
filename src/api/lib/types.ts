/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { Router, Request, Response, NextFunction } from 'express';


/**
 * Module defined User Role
 */
export type ModuleUserRole = {
    name: string;
    label: string;
}


/**
 * Module single middleware function with priority
 */
export type ModuleMiddleware = {
    priority: number;
    middleware(req: Request, res: Response, next: NextFunction): Promise<void>;
}


/**
 * Module export file structure
 */
export type ModuleFile = {
    router: Router;
    path: string;
    middlewares?: ModuleMiddleware[];
    userRoles?: ModuleUserRole[];
}