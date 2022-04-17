module.exports = async function managableTeam(req, res, next) {
  const member = await req.user.getMember({ where : { teamId: req.params.team, role: 1 } });
  if ( member.length > 0 ) {
    return next();
  } else {
    await req.flash('alert', 'アクセスできません');
    res.redirect('/');
  }
}; 