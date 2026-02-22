const form = document.getElementById("checkInForm"); //Get's one specific element from the page by its ID and stores it in a variable called form
const nameInput = document.getElementById("attendeeName"); //Get's one specific element from the page by its ID and stores it in a variable called nameInput
const teamSelect = document.getElementById("teamSelect"); //Get's one specific element from the page by its ID and stores it in a variable called teamSelect

function updateProgressBar(percentage) {
  const prgBar = document.getElementById("progressBar");
  if (prgBar) prgBar.style.width = percentage + "%";
}

function greetingCard(name, team, teamName) {
  const card = document.getElementById("greeting");

  if (card) {
    card.style.display = "block";
    card.textContent = `🎉Welcome, ${name} from ${teamName}!`;

    if (team == "water") card.style.backgroundColor = "#e8f7fc";
    else if (team == "zero") card.style.backgroundColor = "#ecfdf3";
    else if (team == "power") card.style.backgroundColor = "#fff7ed";
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

  // Increment
  count++;

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100);

  //Attendance bar progress
  updateProgressBar(percentage);

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

  // Reset form
  form.reset();
});
