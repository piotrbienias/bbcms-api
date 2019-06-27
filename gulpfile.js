/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

const   gulp        = require('gulp'),
        nodemon     = require('gulp-nodemon'),
        ts          = require('gulp-typescript');

const   series      = gulp.series,
        task        = gulp.task,
        tsProject   = ts.createProject('tsconfig.json');



function nodemonTask(cb) {
    nodemon({
        script: 'dist/api/index.js',
        watch: 'src/api',
        ext: 'ts',
        tasks: ['compile'],
        delay: '2000'
    }).on('restart', function(){
        console.log('Node.js restarted');
    });

    cb();
}

function compileTask(cb) {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('dist/api'));
}

task('compile',             compileTask);
task('nodemon',             nodemonTask);


exports.default = series( 'compile', 'nodemon' );