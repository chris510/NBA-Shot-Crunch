function toggleClass(elem,className){
	if (elem.className.indexOf(className) !== -1){
		elem.className = elem.className.replace(className,'');
	}
	else{
		elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
	}
	
	return elem;
}

function toggleDisplay(elem){
	const curDisplayStyle = elem.style.display;			
				
	if (curDisplayStyle === 'none' || curDisplayStyle === ''){
		elem.style.display = 'block';
	}
	else{
		elem.style.display = 'none';
	}
}

function toggleMenuDisplay(e){
	const dropdown = e.currentTarget.parentNode;
	const seasonMenu = dropdown.querySelector('.season-menu');
	const icon = dropdown.querySelector('.fa-angle-right');

	toggleClass(seasonMenu,'hide');
	toggleClass(icon,'rotate-90');
}

function toggleTeamMenuDisplay(e){
	const dropdown = e.currentTarget.parentNode;
	const teamMenu = dropdown.querySelector('.team-menu');
	const icon = dropdown.querySelector('.fa-angle-right');

	toggleClass(teamMenu, 'hide');
	toggleClass(icon,'rotate-90');
}

function handleOptionSelected(e){
	toggleClass(e.target.parentNode, 'hide');			

	const id = e.target.id;
	const newValue = e.target.textContent + ' ';
	const titleElem = document.querySelector('.dropdown .title');
	const icon = document.querySelector('.dropdown .title .fa');


	titleElem.textContent = newValue;
	titleElem.appendChild(icon);
	
	//trigger custom event
	document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
	//setTimeout is used so transition is properly shown
	setTimeout(() => toggleClass(icon,'rotate-90',0));
}

function handleTeamOptionSelected(e){
	toggleClass(e.target.parentNode, 'hide');			
	const id = e.target.id;
	const newValue = e.target.textContent + ' ';
	const teamElem = document.querySelector('.dropdown .team');
	const icon = document.querySelector('.dropdown .team .fa');

	teamElem.textContent = newValue;
	teamElem.setAttribute('id',`${id}`);
	teamElem.appendChild(icon);
	
	//trigger custom event
	document.querySelector('.dropdown .team').dispatchEvent(new Event('change'));
	//setTimeout is used so transition is properly shown
	setTimeout(() => toggleClass(icon,'rotate-90',0));
}

function handleTitleChange(e){
	const result = document.getElementById('result');

	// result.innerHTML = 'The result is: ' + e.target.textContent;
}

module.exports = {
  toggleClass,
  toggleDisplay,
	toggleMenuDisplay,
	toggleTeamMenuDisplay,
	handleOptionSelected,
	handleTeamOptionSelected,
  handleTitleChange
}