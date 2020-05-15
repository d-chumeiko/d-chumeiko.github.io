var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify-es').default,
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function () {
	return gulp.src([
		'app/sass/_mixins/_font-face.sass',
		'app/sass/_fonts.sass',
		'app/sass/_vars.sass',
		'app/sass/main.sass',
		'app/sass/_media.sass'
]) // Берем источник и кроме 
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
			cascade: true
		})) // Создаем префиксы
		// .pipe(cssnano()) // Сжимаем
		.pipe(concat('main.min.css')) // Собираем все .sass в один файл
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({
			stream: true
		})); // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function () {
	browserSync({
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false, // Отключаем уведомления
	});
});

// Минификация пользовательских скриптов проекта и JS библиотек в один файл
gulp.task('js', function () {
	return gulp.src([
			'app/js/countries-rus.js',
			'app/js/common.js'
		])
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest('app/js'))
});

gulp.task('scripts', function () {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/fontawesome/kit.js',
			'app/libs/bootstrap/js/bootstrap.min.js',
			'app/libs/datatables/jquery.dataTables.min.js',
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify()) // Минимизировать весь js (на выбор)
		.pipe(gulp.dest('app/js'))
});

gulp.task('code', function () {
	return gulp.src('app/**/*.html')
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('css-libs', function () {
	return gulp.src('app/sass/libs.sass') // Выбираем файл для минификации
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({
			suffix: '.min'
		})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('clean', async function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('prebuild', async function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/main.min.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src(['app/js/libs.min.js', 'app/js/scripts.min.js']) // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('app/*.php') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist/'));
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('watch', function () {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('css-libs', 'sass', 'scripts', 'js', 'browser-sync', 'watch'));

gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts', 'js'));