var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var buildPath = 'build/';
var clean = require('gulp-clean');
var zip = require('gulp-zip')
var packageInfo = require('./package.json');

gulp.task('process', function(done) {
    console.log('start build...')
    // todo
    setTimeout(()=>{
        gulp.src('./templates/assets/dist/main.js')
            .pipe(babel())
            .pipe(uglify())
            .pipe(gulp.dest(buildPath + 'templates/assets/dist'))
        done()
    }, 2000)    
})

gulp.task('zip', function() {
    console.log('start compress...')
    return gulp.src(buildPath + '**')
        .pipe(zip(packageInfo.name + '_v' + packageInfo.version + '.zip'))
        .pipe(gulp.dest('release'))
});

gulp.task('copy', function() {
    console.log('start copy...')
    gulp.src(['./settings.yaml', './theme.yaml']).pipe(gulp.dest(buildPath))
    return gulp.src('./templates/**').pipe(gulp.dest(buildPath + 'templates'))
});

gulp.task('clean', function() {
    console.log('start clear...' + buildPath)
    gulp.src('./release/*').pipe(clean())
    return gulp.src('./' + buildPath + '*').pipe(clean())
     
})

gulp.task('build', gulp.series(['clean', 'copy', 'process', 'zip'], (done) => {
    console.log("start release...")
    done();
}));
