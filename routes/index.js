const router = require('koa-better-router')();

const users = require('./modules/users');

router.extend(users);

module.exports = router;
