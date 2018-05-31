const moment = require('moment');
const helper = require('./helper');
const dbUtils = require('./db-util');
const config = require('../config/environment');

const account = {
  name: config.adminName,
  password: config.adminPassword
};

exports.saveAdminAccount = async function () {
  try {
    let salt = helper.makeSalt();
    let hashedPassword = helper.encryptPassword(account.password, salt);

   // let selectAdmin = await dbUtils(`SELECT * FROM user WHERE role='ADMIN'`);

    let _sql = `SELECT * FROM user WHERE name='admin' limit 1`;
    let selectAdmin = await dbUtils.query(_sql);

    if (Array.isArray(selectAdmin) && selectAdmin.length > 0) {
        let id = selectAdmin[0].id;
        console.log('id:', id);
        await dbUtils.updateData ('user',hashedPassword, id);
        //await dbUtils(`UPDATE user SET hashedPassword = ? WHERE id = ?`, [hashedPassword, id]);
    } else {
        let newAdmin = {
            userName: account.name,
            hashedPassword: hashedPassword,
            salt: salt,
            role: 'ADMIN',
            createTime: moment().format('YYYY-MM-DD HH:mm:ss')
          };
          await dbUtils(`INSERT INTO user SET ?`, newAdmin);
    }
 
    // if (selectAdmin.length > 0) {
    //   let id = selectAdmin[0].id;
    //   console.log('id:', id);
    //   await dbUtils(`UPDATE user SET hashedPassword = ? WHERE id = ?`, [hashedPassword, id]);
    // } else {
    //   let newAdmin = {
    //     userName: account.name,
    //     hashedPassword: hashedPassword,
    //     salt: salt,
    //     role: 'ADMIN',
    //     createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    //   };
    //   await dbUtils(`INSERT INTO user SET ?`, newAdmin);
    // }


  } catch (error) {
    console.log('saveAdminAccount', error);
  }
};