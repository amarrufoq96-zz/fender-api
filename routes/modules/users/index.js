const router = require('koa-better-router')().loadMethods();
const { users } = require.main.require('./logic');
const routes = require('./routes');

router.post(routes.login, ctx => users.login({ ...ctx.request.body })
    .then(data => {
        ctx.body = data;
    }));

module.exports = router;