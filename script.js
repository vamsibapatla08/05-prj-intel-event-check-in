// Update the progress bar width smoothly
function updateProgressBar(percentage) {
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
}

const form = document.getElementById("checkInForm"); //Get's one specific element from the page by its ID and stores it in a variable called form
const nameInput = document.getElementById("attendeeName"); //Get's one specific element from the page by its ID and stores it in a variable called nameInput
const teamSelect = document.getElementById("teamSelect"); //Get's one specific element from the page by its ID and stores it in a variable called teamSelect

//Track attendance
let count = 0;
const maxCount = 50;

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text; // Get the text of the selected option

  console.log(name, teamName);

  //Increment
  count++;
  console.log("Total check-ins: " + count);

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  updateProgressBar(percentage);
  console.log(`Progress: ${percentage}%`);

  // Update attendee count display
  const attendeeCount = document.getElementById("attendeeCount");
  if (attendeeCount) {
    attendeeCount.textContent = count;
  }

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  //Welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  console.log(message);

  //Reset form
  form.reset();
});
