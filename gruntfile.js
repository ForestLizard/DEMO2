/**
 * Created by Administrator on 2017/5/5.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            jade:{
                files:['views/**'],
                options:{
                    livereload: true
                }
            },
            js:{
                files:['public/js/**','models/**/*.js','schemas/**/*.js'],
                /*tasks:['jshint'],*/
                options:{
                    livereload: true
                }
            }
        },

        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args:[],
                    ignoredFiles: ['README.md','node_modules/**','.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],/*要监听的文件夹*/
                    debug: true,
                    delayTime: 1,
                    env:{
                        PORT:3000
                    },
                    cwd: __dirname

                }
            }
        },

        concurrent: {
            tasks: ['nodemon','watch'],
            options: {
                logConcurrentOutput: true
            }
        }




    });

    // 加载任务的插件。
    grunt.loadNpmTasks('grunt-contrib-watch');/*监听js,css等文件增删改，重新执行在它里面注册的任务*/
    grunt.loadNpmTasks('grunt-nodemon');/*监听app.js，如果改动，则自动重启服务 */
    grunt.loadNpmTasks('grunt-concurrent');/*监控慢任务SASS LESS 等*/


    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concurrent']);

    grunt.option('force',true);/*开发时不要因为语法错误，警告等中断grunt服务*/

};