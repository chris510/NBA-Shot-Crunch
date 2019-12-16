const GIF = [
  // "../assets/gifs/anthony_davis.gif",
  "../assets/gifs/Blake-Griffin.gif",
  "../assets/gifs/Chris-Paul.gif",
  "../assets/gifs/Dwight-Howard.gif",
  "../assets/gifs/jamesharden.gif",
  "../assets/gifs/Kevin-Durant.gif",
  // "../assets/gifs/Kevin-Love.gif",
  // "../assets/gifs/lebron-james.gif",
  // "../assets/gifs/Russell-Westbrook.gif",
  // "../assets/gifs/anthony_davis_lakers.gif",
  // "../assets/gifs/derek_rose.gif",
  // "../assets/gifs/devin_booker.gif",
  // "../assets/gifs/draymond_green.gif",
  "../assets/gifs/giannis.gif",
  // "../assets/gifs/hassan_whiteside.gif",
  "../assets/gifs/james_harden_cook.gif",
  // "../assets/gifs/zion_williamson.gif",
  "../assets/gifs/luka_doncic.gif",
  // "../assets/gifs/lebron_lal.gif",
]

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
  const shotContainer = document.querySelector('.shot-container');
  let chartWrapper = document.createElement('div');
  chartWrapper.setAttribute('class', 'chart-wrapper')

  let chartContainer = document.createElement('div');
  chartContainer.setAttribute('id', 'chart-container')

  shotContainer
    .appendChild(chartWrapper)
    .appendChild(chartContainer);
}

export const renderBody = () => {
  const body = document.querySelector('body');
  const app = document.createElement('div');
  app.setAttribute('class', 'app');
  
  const player = document.createElement('div');
  player.setAttribute('class', 'player');
  
  const carouselWrapper = document.createElement('div');
  carouselWrapper.setAttribute('class', 'carousel-wrapper');
  
  const carousel = document.createElement('div');
  carousel.setAttribute('class', 'carousel');
  
  
  body.appendChild(app);
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
  footerWrapper.setAttribute('class', 'footer-wrapper');

  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class', 'button-container')

  const buttonModal = document.createElement('button');
  buttonModal.setAttribute('id', 'open-modal');
  buttonModal.value = "How to Use";
  buttonModal.innerText = "How to Use";

  body.appendChild(footer)
    .appendChild(footerWrapper)
    .appendChild(buttonContainer)
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

export const renderSplashPage = () => {
  const body = document.querySelector('body');
  const splash = document.createElement('div');
  splash.setAttribute('class', 'splash')

  const splashTitle = document.createElement('div');
  splashTitle.setAttribute('class', 'splash-title');
  splashTitle.innerHTML = 'NBA Shot Crunch'

  let randomGifIdx = Math.round(Math.random() * (GIF.length - 1));
  let randomGif = GIF[randomGifIdx];

  const splashGif = new Image();
  splashGif.className = "splash-gif";
  splashGif.src = `${randomGif}`;
  splashGif.height = "400";
  splashGif.width = "400";
  // const splashGIF = document.createElement('div');
  // splashGIF.setAttribute('class', 'splash-gif');

  const button = document.createElement('div');
  button.setAttribute('class', 'lucky');

  const buttonInput = document.createElement('input');
  buttonInput.setAttribute('type', 'button');
  buttonInput.setAttribute('class', 'randombutton');
  buttonInput.value = "CLICK ME";

  body.appendChild(splash);
  splash.appendChild(splashTitle);
  splash.appendChild(splashGif);
  splash.appendChild(button).appendChild(buttonInput);
  // splash.appendChild(button);

  // body.appendChild(button);
}

export const removeSplash = () => {
  const splash = document.querySelector('.splash');
  const button = document.querySelector('.lucky');
  splash.remove();
  button.remove();
}