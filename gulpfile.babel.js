import { src, dest, watch, series } from "gulp";
// import gulp from "gulp";
const sass = require("gulp-sass")(require("sass"));
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";

const paths = {
	src: {
		styles: "./assets/scss/styles.scss",
		js: "./assets/js/main.js",
	},
	dest: {
		styles: "./public/stylesheets",
		js: "./public/js",
	},
	watch: {
		styles: "./assets/scss/**.scss",
		js: "./assets/js/**.js",
	},
};

const clean = (cb) => cb(); 

const styles = async () => {
	await src(paths.src.styles)
		.pipe(sass())
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(cleanCSS())
		.pipe(dest(paths.dest.styles));
};

const js = async () => {
	await src(paths.src.js).pipe(dest(paths.dest.js));
};

const watchFiles = () => {
	watch([paths.watch.styles], styles);
};

// const dev = series(clean, styles, js, watchFiles);
const dev = series(styles, js, watchFiles);
const build = series(clean, styles, js);
export default dev;
