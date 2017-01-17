const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');
const getIPAddress = () => {
  let interfaces = require('os').networkInterfaces(); //获取网络接口列表
  let ipList = [], iFace;
  for (let devName in interfaces) {
    if (interfaces.hasOwnProperty(devName)) {
      iFace = interfaces[devName];
      for (let i = 0; i < iFace.length; i++) {
        let alias = iFace[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          ipList.push(alias.address);
        }
      }
    }
  }
  return ipList;
};
const localIp = getIPAddress().find(v => v.indexOf('10.') === 0);
const port = process.argv[2] || 3000;
config.setIpAndPort(localIp, port);
new WebpackDevServer(webpack(config), {
	// contentBase: config.output.path,
  publicPath: config.output.publicPath,
  // inline: true,
	hot: true,
	historyApiFallback: true,
	host: '0.0.0.0',
	port,
	// quiet: true,
	headers: { "Access-Control-Allow-Origin": "*" },
	stats: { colors: true }
}).listen(port, localIp, function(err, result) {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at http://${localIp}:${port}/`);
});
