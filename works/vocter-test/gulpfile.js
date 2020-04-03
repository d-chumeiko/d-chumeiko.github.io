var syntax        = 'sass';

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify'),
		rsync         = require('gulp-rsync'),
		//from "myprojectone"
		cache					= require('gulp-cache'),
		// imagemin 	 		= require('gulp-imagemin'),
		// pngquant	 		= require('imagemin-pngquant'),
		ftp           = require('vinyl-ftp'),
		del 		 			= require('del'),
		//bourbon
		bourbon    		= require('bourbon').includePaths;

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({
		sourcemaps: true,
		includePaths: bourbon
	}))
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/jquery.min.js',
		'app/libs/owl-carousel/js/owl.carousel.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src([
		'app/*.html',
		'app/**/*.php',
		])
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		/*hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',*/
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

	gulp.task('watch', function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
		gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
		gulp.watch(['app/*.html', 'app/**/*.php'], gulp.parallel('code'))
	});
	gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));


//Before building useful tasks
//сжатие изображения
gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img'));
});
//чистка диста
gulp.task('clean', async function() {
	return del.sync('dist');
});

//deploy
gulp.task('deploy', async function() {
	var conn = ftp.create({
		host:      '',
		user:      'dimas_chumeyko',
		password:  'Dimonchu98',
		parallel:  3,
		log: gutil.log
	});

	var globs = [
	'dist/**/*',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest(''));
});

//Building for deploy
 gulp.task('build', gulp.parallel('clean', 'img', async function() {

 	var buildCss = gulp.src([
 		'app/css/main.min.css',
 		])
 	.pipe(gulp.dest('dist/css'));

 	var buildFonts  = gulp.src('app/fonts/**/*')
 	.pipe(gulp.dest('dist/fonts'));

 	var buildJS  = gulp.src('app/js/scripts.min.js')
 	.pipe(gulp.dest('dist/js'));

 	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

 	var buildHtml  = gulp.src('app/**/*.php')
 	.pipe(gulp.dest('dist'));
 }))