
const path = require('path');

const config = {
  database: {
    DATABASE: 'shop',
    USERNAME: 'root',
    //PASSWORD: '123456',
    PASSWORD: '759547235',
    PORT: '3306',
    //HOST: 'localhost'
    HOST: '192.168.219.131'
  },
  port: 9000,
  tokenSecret: 'test',//以下为新增的配置
  root: path.normalize(__dirname + '/..'), 
  appPath: 'src',
  isUpdateAdmin: true,
  accessControlAllowOrigin: 'http://localhost:3000',
  adminName: 'admin',
  adminPassword: '123456',
  
}

module.exports = config
