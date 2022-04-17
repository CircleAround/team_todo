const Controller = require('./controller');
const models = require('../models');

class TeamsController extends Controller {
  async create(req, res) {
    const team = models.Team.build({});
    res.render('teams/create', { team });
  }

  async store(req, res) {
    const team = models.Team.build({
      name: req.body.name,
      ownerId: req.user.id
    });
    await team.save();
    await req.flash('info', `新規チーム${team.name}を作成しました`);
    res.redirect(`manager/teams/${team.id}`);
  }
}

module.exports = TeamsController;