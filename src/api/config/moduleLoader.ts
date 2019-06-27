/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

// Combine all modules' routers

import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import { ModuleFile, ModuleMiddleware, ModuleUserRole } from '@lib/types';


let middlewares: Array<ModuleMiddleware> = [],
    userRoles: ModuleUserRole[] = [],
    moduleFiles: ModuleFile[] = [];



const modulesPath = path.resolve(__dirname, '..', 'modules');
fs.readdirSync(modulesPath).forEach((module: string) => {

    if ( module && module !== '' && !module.startsWith('.') ) {

        const moduleFilePath = path.resolve(modulesPath, module, 'index.js');
        if ( fs.existsSync(moduleFilePath) ) {
            let moduleFile: ModuleFile = require(path.resolve(modulesPath, module, 'index.js'));
            moduleFile = moduleFile['default'] ? moduleFile['default'] : moduleFile;

            moduleFiles.push(moduleFile); // add every module file to the array
            if ( moduleFile.middlewares ) middlewares = middlewares.concat(moduleFile.middlewares);
            if ( moduleFile.userRoles ) userRoles = userRoles.concat(moduleFile.userRoles);
        }
    }
});

// Sort array of middlewares by their priority
middlewares.sort((a: ModuleMiddleware, b: ModuleMiddleware) => a.priority > b.priority ? 1 : -1);


const moduleLoader = async (): Promise<Router> => {

    const AppRouter: Router = Router();

    // Apply modules' middlewares to the global App Router
    middlewares.forEach((middleware: ModuleMiddleware) => {
        AppRouter.use(<any>middleware.middleware);
    });

    moduleFiles.forEach((moduleFile: ModuleFile) => {

        // Add every module router to the App main router
        if ( moduleFile.router && moduleFile.path ) {
            let path = moduleFile.path.startsWith('/') ? moduleFile.path : `/${moduleFile.path}`;
            AppRouter.use(path, moduleFile.router);
        }

    });

    return AppRouter;
};


export default moduleLoader;