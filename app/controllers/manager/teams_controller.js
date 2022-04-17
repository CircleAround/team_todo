const Controller = require('../controller');
const models = require('../../models');

class TeamsController extends Controller {
  async show(req, res) {
    const team = await this._team(req);
    const tasks = await team.getTasks({ 
      include: ['assignee'],
      order: [['id', 'DESC']]
    });
    res.render('manager/teams/show', { team, tasks });
  }

  async create(req, res) {
    const team = models.Team.build({});
    res.render('manager/teams/create', { team });
  }

  async store(req, res) {
    const team = models.Team.build({
      name: req.body.name,
      ownerId: req.user.id
    });
    await team.save();
    await req.flash('info', `新規チーム${team.name}を作成しました`);
    res.redirect(`/manager/teams/${team.id}`);
  }

  async edit(req, res) {
    const team = await this._team(req);
    res.render('manager/teams/edit', { team });
  }

  async update(req, res) {
    const team = await this._team(req);
    team.set(req.body);
    await team.save();
    await req.flash('info', `${team.name}に更新しました`);
    res.redirect(`/manager/teams/${team.id}/edit`);
  }

  async _team(req) {
    const team = await models.Team.findByPk(req.params.team);
    if (!team) {
      throw new Error('Team not find');
    }
    return team;
  }
}

module.exports = TeamsController;