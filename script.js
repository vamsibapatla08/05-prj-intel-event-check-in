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
  const teamName = teamSelect.selectedOptions[0].text;

  // Increment
  count++;

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  updateProgressBar(percentage);

  // Update attendee count display
  const attendeeCount = document.getElementById("attendeeCount");
  if (attendeeCount) {
    attendeeCount.textContent = count;
  }

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Show greeting message
  const greetingDiv = document.getElementById("greeting");
  if (greetingDiv) {
    greetingDiv.textContent = `🎉 Welcome, ${name} from ${teamName}!`;
    greetingDiv.style.display = "block";
    // Set background color based on team
    if (team === "water") {
      greetingDiv.style.background = "#e8f7fc";
    } else if (team === "zero") {
      greetingDiv.style.background = "#ecfdf3";
    } else if (team === "power") {
      greetingDiv.style.background = "#fff7ed";
    } else {
      greetingDiv.style.background = "#f3f4f6";
    }
  }

  // If attendance goal is reached, show celebration and highlight winning team
  if (count >= maxCount) {
    // Find team counts
    const water = parseInt(document.getElementById("waterCount").textContent);
    const zero = parseInt(document.getElementById("zeroCount").textContent);
    const power = parseInt(document.getElementById("powerCount").textContent);

    let winner = "water";
    let winnerName = "Team Water Wise";
    let max = water;

    if (zero > max) {
      winner = "zero";
      winnerName = "Team Net Zero";
      max = zero;
    }

    if (power > max) {
      winner = "power";
      winnerName = "Team Renewables";
      max = power;
    }

    // Show celebration message
    if (greetingDiv) {
      greetingDiv.textContent = `🏆 Attendance goal reached! Congratulations, ${winnerName}!`;
      greetingDiv.style.display = "block";
      
      if (winner === "water") {
        greetingDiv.style.background = "#e8f7fc";
      } else if (winner === "zero") {
        greetingDiv.style.background = "#ecfdf3";
      } else if (winner === "power") {
        greetingDiv.style.background = "#fff7ed";
      }
    }

    // Highlight winning team card
    document.querySelectorAll(".team-card").forEach(function (card) {
      card.style.outline = "none";
      card.style.boxShadow = "none";
    });

    const winnerCard = document.querySelector(`.team-card.${winner}`);
    if (winnerCard) {
      winnerCard.style.outline = "3px solid gold";
      winnerCard.style.boxShadow = "0 0 18px 2px gold";
    }
  }

  // Reset form
  form.reset();
});
