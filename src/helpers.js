import { appendFile } from "fs";

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

  let iconHeight = '48';
  let iconWidth = '48';

  const body = document.querySelector('body');
  const footer = document.createElement('div');
  footer.setAttribute('class', 'footer');
  const footerWrapper = document.createElement('div');
  footerWrapper.setAttribute('class', 'footer');
  const buttonModal = document.createElement('button');
  buttonModal.setAttribute('id', 'open-modal');

  body.appendChild(footer)
    .appendChild(footerWrapper)
    .appendChild(buttonModal);

  const github = document.createElement('div');
  github.setAttribute('class', 'github');
  const githubLink = document.createElement('a');
  githubLink.target = "_blank";
  githubLink.href = "https://github.com/chris510";

  const githubImg = new Image();
  githubImg.className = 'github-icon';
  githubImg.height = `${iconHeight}`;
  githubImg.width = `${iconWidth}`;
  githubImg.src = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"

  github.appendChild(githubLink).appendChild(githubImg);

  const mail = document.createElement('div');
  mail.setAttribute('class', 'mail');
  const mailLink = document.createElement('a');
  mailLink.target = "_blank";
  mailLink.href = "mailto:christrinh5@gmail.com";

  const mailImg = new Image();
  mailImg.className = 'mail-icon';
  mailImg.height = `${iconHeight}`;
  mailImg.width = `${iconWidth}`;
  mailImg.src = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/gmail.svg"

  mail.appendChild(mailLink).appendChild(mailImg);

  const linkedin = document.createElement('div');
  linkedin.setAttribute('class', 'linkedin');
  const linkedinLink = document.createElement('a');
  linkedinLink.target = "_blank";
  linkedinLink.href = "https://www.linkedin.com/in/trinh-christopher/";

  const linkedinImg = new Image();
  linkedinImg.className = 'linkedin-icon';
  linkedinImg.height = `${iconHeight}`;
  linkedinImg.width = `${iconWidth}`;
  linkedinImg.src = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg"
  
  linkedin.appendChild(linkedinLink).appendChild(linkedinImg);

  footerWrapper.appendChild(github);
  footerWrapper.appendChild(mail);
  footerWrapper.appendChild(linkedin);
}