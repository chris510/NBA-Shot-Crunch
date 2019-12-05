export const teamSelector = (playerTeam) => {
  d3.csv('./assets/nba_teams.csv').then(teams => {
    teams.forEach(team => {
      if (playerTeam != team.name) {
        let teamOption = document.createElement('div');
        teamOption.setAttribute('class','team-option');
        teamOption.setAttribute('id',`${team.prefix_1}`);
        teamOption.innerHTML = team.name;
        document.querySelector('.team-menu').appendChild(teamOption);
      }
    })
  })
}
