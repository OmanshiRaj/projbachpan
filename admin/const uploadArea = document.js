const uploadArea = document.getElementById("upload-area");
const evidenceInput = document.getElementById("evidence");
const fileList = document.getElementById("file-list");
let uploadedFiles = [];

// File Upload Section
uploadArea.addEventListener("click", () => evidenceInput.click());

evidenceInput.addEventListener("change", (e) => {
  uploadedFiles = Array.from(e.target.files);
  displayFiles();
});

uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.style.backgroundColor = "#f2e3cb";
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.style.backgroundColor = "#f9f3e7";
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadedFiles = Array.from(e.dataTransfer.files);
  displayFiles();
});

function displayFiles() {
  fileList.innerHTML = uploadedFiles.map((f) => `<p>${f.name}</p>`).join("");
}

// Location Detection
function getLocation() {
  const locStatus = document.getElementById("location-status");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        locStatus.style.color = "green";
        locStatus.textContent = `Detected Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      },
      () => {
        locStatus.style.color = "red";
        locStatus.textContent = "Unable to retrieve your location. Please enable location access.";
      }
    );
  } else {
    locStatus.textContent = "Geolocation not supported by this browser.";
  }
}

// Form Submission
function submitReport() {
  const type = document.getElementById("type").value;
  const age = document.getElementById("age").value;
  const details = document.getElementById("details").value;
  const email = document.getElementById("email").value;
  const locStatus = document.getElementById("location-status").textContent;

  if (!type || !age || !details) {
    alert("Please fill in all required fields before submitting.");
    return;
  }

  const report = {
    type,
    age,
    details,
    email,
    location: locStatus,
    uploadedFiles: uploadedFiles.map((f) => f.name),
  };

  console.log("Report submitted:", report);
  alert("✅ Your report has been submitted successfully!\n\nThank you for your vigilance.");

  // Optional: Clear form
  uploadedFiles = [];
  fileList.innerHTML = "";
  document.getElementById("type").value = "";
  document.getElementById("age").value = "";
  document.getElementById("details").value = "";
  document.getElementById("email").value = "";
  document.getElementById("location-status").textContent =
    "Unable to retrieve your location. Please enable location access.";
}
