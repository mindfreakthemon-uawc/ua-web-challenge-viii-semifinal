var gulp = require('gulp');

require('require-dir')('./tasks');

gulp.task('assets', ['tpl', 'jade', 'compass', 'compress', 'imagemin']);

gulp.task('watch', ['assets'], function () {
	gulp.watch(['./app/tpl/**/*.jade'], ['tpl']);
	gulp.watch(['./app/jade/**/*.jade'], ['jade']);
	gulp.watch(['./app/sass/**/*.{sass,scss}'], ['compass']);
	gulp.watch(['./app/js/**/*.js'], ['compress']);
	gulp.watch(['./app/img/**/*.png'], ['imagemin']);
});

gulp.task('test', ['lint']);
gulp.task('default', ['connect', 'watch']);
