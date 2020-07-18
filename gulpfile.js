const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
/*const autoprefixer = require('gulp-autoprefixer');*/
const browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src("./assets/scss/*.scss")
        .pipe(sass())
/*        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))*/
        .pipe(gulp.dest("./assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./assets/scss/*.scss", gulp.series('sass'));
    gulp.watch("./assets/js/*.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));
