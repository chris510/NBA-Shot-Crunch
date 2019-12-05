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
  const body = document.querySelector('body');
  const shotContainer = document.createElement('div');
  shotContainer.setAttribute('class', 'shot-container');
  // let shotContainer = document.querySelector('.shot-container');
  let chartWrapper = document.createElement('div');
  chartWrapper.setAttribute('class', 'chart-wrapper')

  let chartContainer = document.createElement('div');
  chartContainer.setAttribute('id', 'chart-container')

  body
    .appendChild(shotContainer)
    .appendChild(chartWrapper)
    .appendChild(chartContainer);
}

export const renderBody = () => {
  const body = document.querySelector('body');
  const app = document.createElement('div');
  app.setAttribute('class', 'app');
  const appTitle = document.createElement('div');
  appTitle.setAttribute('class', 'app-title');
  appTitle.innerHTML = 'NBA Shot Crunch';

  const player = document.createElement('div');
  player.setAttribute('class', 'player');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.setAttribute('class', 'carousel-wrapper');

  const carousel = document.createElement('div');
  carousel.setAttribute('class', 'carousel');

  body.appendChild(app).appendChild(appTitle)
  // app.appendChild(appTitle);
  app.appendChild(player)
    .appendChild(carouselWrapper)
    .appendChild(carousel);

  const shotContainer = document.createElement('div');
  shotContainer.setAttribute('class', 'shot-container');
  app.appendChild(shotContainer);
}

export const renderFooter = () => {

}