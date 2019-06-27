/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

module.exports = {
    apps: [{
        name:   'bbcms',
        script: 'npm',
        args:   'start',
        env: {
            'NODE_ENV': 'production'
        }
    }]
};