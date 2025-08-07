document.addEventListener("DOMContentLoaded", () => {
  // Tab switching logic
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabs = document.querySelectorAll(".tab");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("active"));
      tabs.forEach((tab) => tab.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });

  // Signer form logic
  const signerForm = document.querySelector(".signer-form");

  signerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ipa = document.getElementById("ipa").files[0];
    const p12 = document.getElementById("p12").files[0];
    const mobileprovision = document.getElementById("mobileprovision").files[0];
    const password = document.getElementById("password").value.trim();

    if (!ipa || !p12 || !mobileprovision || !password) {
      alert("Please fill in all fields and upload all required files.");
      return;
    }

    const formData = new FormData();
    formData.append("ipa", ipa);
    formData.append("p12", p12);
    formData.append("mobileprovision", mobileprovision);
    formData.append("password", password);

    // Optional: show loading spinner here

    try {
      // 🚧 Replace the URL with your actual signer backend API endpoint
      const response = await fetch("https://your-signer-api.example.com/sign", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        const tempLink = result.downloadUrl;

        // Create one-time-use download link
        const note = document.createElement("div");
        note.className = "note";
        note.innerHTML = `<strong>Download Signed IPA:</strong> <a href="${tempLink}" target="_blank">${tempLink}</a><br><small>This link is one-time use only.</small>`;
        signerForm.appendChild(note);
      } else {
        alert("Signing failed: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while signing the IPA.");
    }
  });
});