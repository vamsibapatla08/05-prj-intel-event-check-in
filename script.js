const form = document.getElementById("checkInForm"); //Get's one specific element from the page by its ID and stores it in a variable called form
const nameInput = document.getElementById("attendeeName"); //Get's one specific element from the page by its ID and stores it in a variable called nameInput
const teamSelect = document.getElementById("teamSelect"); //Get's one specific element from the page by its ID and stores it in a variable called teamSelect

function updateProgressBar(percentage) {
  const prgBar = document.getElementById("progressBar");

  if (prgBar) {
    prgBar.style.width = percentage + "%"; //Increases width of the progress bar based on the percentage calculated from the attendance count
  }

  console.log(`Progress: ${percentage}%`); // Log the progress percentage to the console for debugging
}

function greetingCard(name, team, teamName) {
  const card = document.getElementById("greeting");

  if (card) {
    card.style.display = "block";
    card.textContent = `🎉Welcome, ${name} from ${teamName}!`;

    console.log(card.textContent);

    if (team == "water") {
      card.style.backgroundColor = "#e8f7fc";
    } else if (team == "zero") {
      card.style.backgroundColor = "#ecfdf3";
    } else if (team == "power") {
      card.style.backgroundColor = "#fff7ed";
    }
  }
}

//Track attendance
let count = 0;
const maxCount = 50;

// Handle form submission

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Only increment and update if goal not reached
  if (count < maxCount) {
    count++;

    console.log(`Total count: ${count}`);
    
    // Update progress bar
    const percentage = Math.round((count / maxCount) * 100);
    updateProgressBar(percentage); //function application

    // Update attendee count display
    const attendeeCount = document.getElementById("attendeeCount");
    if (attendeeCount) {
      attendeeCount.textContent = count;
    }

    // Update team counter
    const teamCounter = document.getElementById(team + "Count");
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

    //Greeting card for each team member after check-in
    greetingCard(name, team, teamName);

    //Attendee list
    const attendeeList = document.getElementById("attendeeList");
    const attendeeNumber = count;
    const listItem = document.createElement("li");
    listItem.innerHTML = `<span class="attendee-number">${attendeeNumber}</span>) <b>${name}</b> from <b>${teamName}</b>`;
    listItem.style.fontFamily = "Roboto, sans-serif";
    listItem.style.fontSize = "16px";
    listItem.style.padding = "5px"; 
    listItem.style.listStyleType = "none"; //To remove the bullet points for each attendee added in the list
    listItem.style.alignContent = "left";
    listItem.style.breakInside = "avoid"; //To prevent list items from breaking across columns
    attendeeList.appendChild(listItem); //This adds each attendee

    // Reset form
    form.reset();
  }

  // Show celebration message and stop counting
  if (count == maxCount) {
    const waterCount = document.getElementById("waterCount").textContent;
    const zeroCount = document.getElementById("zeroCount").textContent;
    const powerCount = document.getElementById("powerCount").textContent;

    let teamName = "";

    if (
      parseInt(waterCount) > parseInt(zeroCount) &&
      parseInt(waterCount) > parseInt(powerCount)
    ) {
      teamName = "Team Water Rise";
    } else if (
      parseInt(zeroCount) > parseInt(waterCount) &&
      parseInt(zeroCount) > parseInt(powerCount)
    ) {
      teamName = "Team Net Zero";
    } else if (
      parseInt(powerCount) > parseInt(waterCount) &&
      parseInt(powerCount) > parseInt(zeroCount)
    ) {
      teamName = "Team Renewables";
    }

    const winnerCelebration = document.getElementById("greeting");

    if (winnerCelebration) {
      winnerCelebration.innerHTML = `🎉Congratulations to ${teamName} for winning attendance goal with maximum check-in's!`;
      winnerCelebration.style.display = "block";

      if (teamName == "Team Water Rise") {
        winnerCelebration.style.backgroundColor = "#e8f7fc"; //light blue
      } else if (teamName == "Team Net Zero") {
        winnerCelebration.style.backgroundColor = "#ecfdf3"; //light green
      } else if (teamName == "Team Renewables") {
        winnerCelebration.style.backgroundColor = "#fff7ed"; //light orange
      }
    }

    // Optionally reset form or disable it
    form.reset();
  }
});
