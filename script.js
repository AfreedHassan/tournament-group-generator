function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateGroups() {
  let sport = document.getElementById('sport').value
  let teams = document.getElementById('teams').value.split(',').map(team => team.trim());
  let separateTeams = document.getElementById('separateTeams').value.split(',').map(team => team.trim());
  let numGroups = parseInt(document.getElementById('numGroups').value);
  let teamsPerGroup = parseInt(document.getElementById('teamsPerGroup').value);

  // Validate inputs
  if (teams.length === 0 || numGroups <= 0 || teamsPerGroup <= 0) {
    alert('Please enter valid data');
    return;
  }

  // Check if the total teams can fit in the specified groups and teams per group
  if (numGroups * teamsPerGroup < teams.length) {
    alert('The specified number of groups and teams per group cannot accommodate all the teams.');
    return;
  }

  // Ensure that the separate teams can be placed in different groups
  if (separateTeams.length > numGroups) {
    alert('There are more teams to be separated than available groups.');
    return;
  }


  // Filter the separate teams from the main list
  teams = teams.filter(team => !separateTeams.includes(team));

  // Shuffle remaining teams for random distribution
  teams = shuffle(teams);

  let groups = [];
  for (let i = 0; i < numGroups; i++) {
    groups.push([]);
  }

  // Place separate teams in different groups
  console.log(separateTeams)
  if (separateTeams.length > 1) {
    separateTeams.forEach((team, index) => {
        groups[index].push(team);
    });
  }

  // Randomly assign teams to groups while not exceeding teamsPerGroup
  let thisGroup = 0;
  teams.forEach(team => {
    if (groups[thisGroup].length < teamsPerGroup) {
      groups[thisGroup].push(team);
    } else {
      thisGroup++;
      if (thisGroup >= numGroups) thisGroup = 0; // wrap around
      groups[thisGroup].push(team);
    }
  });

  // Display the result as tables
  let resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<h2>${sport}</h2>`; //Set the name of the sport as heading.
  groups.forEach((group, index) => {
    let table = `
      <div class="group-table">
        <table>
          <tr><th>Group ${String.fromCharCode(index + 65)}</th></tr>`;
    group.forEach((team, i) => {
      table += `<tr><td>${i + 1}. ${team}</td></tr>`;
    });
    table += `</table></div>`;
    resultDiv.innerHTML += table;
  });
}
