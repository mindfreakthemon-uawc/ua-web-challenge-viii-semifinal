var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	connect = require('gulp-connect');

gulp.task('imagemin', function () {
	gulp.src('./app/img/*')
		//.pipe(imagemin({
		//	progressive: true,
		//	svgoPlugins: [{ removeViewBox: false }],
		//	use: [pngquant()]
		//}))
		.pipe(gulp.dest('./public/img'))
		.pipe(connect.reload());
});