var gulp = require('gulp'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify');

gulp.task('compress', function() {
	return gulp.src('./app/js/**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/js'))
		.pipe(connect.reload());
});
