var gulp = require('gulp'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect');

gulp.task('compass', function () {
	gulp.src('./app/sass/**/*.{scss,sass}')
		.pipe(compass({
			config_file: './app/config.rb',
			css: './public/css',
			sass: './app/sass',
			scss: './app/sass',
			image: './app/img'
		}))
		.pipe(gulp.dest('./public/css'))
		.pipe(connect.reload());
});
