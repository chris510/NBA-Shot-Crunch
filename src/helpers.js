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

export const renderCourt = () => {
  let shotContainer = document.querySelector('.shot-container');
  let chartWrapper = document.createElement('div');
  chartWrapper.setAttribute('class', 'chart-wrapper')

  let chartContainer = document.createElement('div');
  chartContainer.setAttribute('id', 'chart-container')

  shotContainer.appendChild(chartWrapper)
    .appendChild(chartContainer);
}

export const renderBody = () => {
  const app = document.createElement('div');
  app.setAttribute('class', 'app');
  const appTitle = document.createElement
}

export const renderFooter = () => {

}