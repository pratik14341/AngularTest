const koa = require('koa');
const cors = require('koa-cors');
const koaBody = require('koa-body');
const config = require('./config');

const fs = require('fs');
const MiddlewareWrapper = require('./component/middlewareWrapper');
const port = process.env.PORT || config.port;
console.log(port)
console.log(process.env.NODE_ENV)
var app = new koa();
app.use(koaBody ({ multipart: true,maxFileSize:209715200,maxFieldsSize:209715200,jsonLimit :209715200 }));
app.use(cors());


app.use(async (ctx, next) => {
   await MiddlewareWrapper.bearerMiddleware(ctx,next);
});


fs.readdirSync('./services').map(fileName => {
    if (fileName.includes('.js')) {
        app.use(require('./services/' + fileName).routes());
    }
});
// app.use(require('./services/login').routes());
// app.use(require('./services/userinfo').routes());
// app.use(require('./services/userlogin').routes());
// app.use(require('./services/employee').routes());
// app.use(require('./services/common').routes());

app.listen(port, () => console.log('Server running on http://localhost:' + port));

function* handle404Errors(next) {
    //  console.log('handle404Errors');
    if (404 != this.status) return;
    this.redirect(`/${config.UsernotAuthorize}`);
}