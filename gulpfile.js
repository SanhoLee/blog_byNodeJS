const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
    src:{
        styles:"./assets/scss/styles.scss",
        js:"./assets/js/main.js",
    },
    dest:{
        styles:"./public/stylesheets",
        js:"./public/js",
    },
    watch:{
        styles:"./assets/scss/**.scss",
        js:"./assets/js/**.js"
    }
}

function clean(cb) {
  // body omitted
  // 일단 덮어씌운다는 개념으로 이건 스킵한다.
  cb();
}

async function styles(cb) {
  await src(paths.src.styles)
  .pipe(sass())
  .pipe(autoprefixer({
    cascade:false
  }))
  .pipe(cleanCSS())
  .pipe(dest(paths.dest.styles));
}


async function js(cb) {
    await src(paths.src.js).pipe(dest(paths.dest.js));
    cb();
  }

  
function watchFiles(cb) {
    watch([paths.watch.styles], styles);
    cb();
  }
// exports.build = build;
exports.default = series(clean, styles, js, watchFiles);