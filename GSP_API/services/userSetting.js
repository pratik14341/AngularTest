const Router = require('koa-router');
const crypto = require('../_helpers/criptoHelper')();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const userSettingAction = require('../action/userSetting');
const router1 = new Router();

router1.post('/userrights', async (req, res) => {
  await MiddlewareWrapper.wrape(req, null, async () => {
    let userId = crypto.decrypt(req.request.body);
    return await userSettingAction.getUserRights(userId);
  });
});

router1.post('/userleftMenuAndRights', async (req, res) => {
  await MiddlewareWrapper.wrape(req, null, async () => {
    var reqParam = req.request.body;
    let userId = crypto.decrypt(reqParam.userid);
    let userRights = await userSettingAction.getUserRights(userId);
    let userLeftMenu = await userSettingAction.getUserLeftMenu(JSON.parse(userRights))
    let gridColumns = await userSettingAction.getUserLayout(userId);
    return {
      userrights: userRights,
      userleftMenu: userLeftMenu,
      gridcolumns: gridColumns
    };
  });
});

router1.post('/usergridsavelayout', async (req, res) => {
  await MiddlewareWrapper.wrape(req, null, async () => {
    var reqParam = req.request.body;
    let userId = crypto.decrypt(reqParam.userid);
    await userSettingAction.saveUserGridLayout(reqParam, { userId })
    return await userSettingAction.getUserLayout(userId);
  });
});

router1.post('/usergridremovelayout', async (req, res) => {
  await MiddlewareWrapper.wrape(req, null, async () => {
    
    var reqParam = req.request.body;
    let userId = crypto.decrypt(reqParam.userid.toString());
    await userSettingAction.removeUserGridLayout(reqParam,{userId} );
    return await userSettingAction.getUserLayout(userId);
  });
});
module.exports = router1;



