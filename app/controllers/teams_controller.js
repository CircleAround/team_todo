const Controller = require('./controller');
const models = require('../models');

class TeamsController extends Controller {
  async create(req, res) {
    const team = models.Team.build({});
    res.render('teams/create', { team });
  }

  async store(req, res) {
    const team = await models.Team.createWithOwner(req.user, req.body);
    await req.flash('info', `新規チーム${team.name}を作成しました`);
    res.redirect(`manager/teams/${team.id}`);
  }
}

module.exports = TeamsController;