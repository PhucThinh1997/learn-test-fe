const path = require("path");

const {
	override,
	fixBabelImports,
	addLessLoader,
	addWebpackPlugin,
	addWebpackModuleRule,
} = require("customize-cra");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const { getLessVars } = require("antd-theme-generator");

// const defaultVars = getLessVars('./node_modules/antd/lib/style/themes/default.less');
const themeVariables = getLessVars(
	path.join(__dirname, "./src/styles/vars.less")
);
// const darkVars = {
//   ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'),
//   '@primary-color': defaultVars['@primary-color'],
// };
// const lightVars = {
//   ...getLessVars('./node_modules/antd/lib/style/themes/default.less'),
//   '@primary-color': defaultVars['@primary-color'],
// };
// fs.writeFileSync('./src/themes/dark.json', JSON.stringify(darkVars));
// fs.writeFileSync('./src/themes/light.json', JSON.stringify(lightVars));
// fs.writeFileSync('./src/themes/theme.json', JSON.stringify(themeVariables));

const options = {
	stylesDir: path.join(__dirname, "./src"),
	// antDir: path.join(__dirname, './node_modules/antd'),
	// varFile: path.join(__dirname, './src/styles/vars.less'),
	themeVariables: Array.from(new Set([...Object.keys(themeVariables)])),
	generateOnce: false, // generate color.less on each compilation
};

module.exports = override(
	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: true,
	}),
	addLessLoader({
		lessOptions: {
			javascriptEnabled: true,
			modifyVars: themeVariables,
		},
	}),
	addWebpackPlugin(
		new AntdDayjsWebpackPlugin(),
		new AntDesignThemePlugin(options)
	),
	addWebpackModuleRule(
		{
			test: /\.(png|jpe?g|gif)$/i,
			loader: "file-loader",
			options: {
				outputPath: "images",
			},
		},
		{
			test: /\.svg$/,
			loader: "@svgr/webpack",
		}
	)
);
