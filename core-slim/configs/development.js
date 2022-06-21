import webpack from 'webpack';
import DevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
import serverConf from './webpack.devServer';


const instance = webpack(webpackConfig);
const server = new DevServer(serverConf, instance);

process.on('exit', () => { server.stop(); });
server.start();
