function showTab(tabId, event) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

const API_SIGN_URL = 'https://your-existing-signer-api.com/sign'; // Change this to your IPA signer API endpoint

const form = document.getElementById('signForm');
const output = document.getElementById('output');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  output.textContent = "Signing in progress... please wait.";

  const formData = new FormData();

  const ipaFile = document.getElementById('ipaFile').files[0];
  const p12File = document.getElementById('p12File').files[0];
  const p12Password = document.getElementById('p12Password').value;
  const mobileProvisionFile = document.getElementById('mobileProvisionFile').files[0];

  if (!ipaFile || !p12File || !p12Password || !mobileProvisionFile) {
    output.textContent = 'Please fill all required fields.';
    return;
  }

  formData.append('ipa', ipaFile);
  formData.append('p12', p12File);
  formData.append('p12_password', p12Password);
  formData.append('mobileprovision', mobileProvisionFile);

  try {
    const response = await fetch(API_SIGN_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      output.textContent = `Error: ${response.statusText}`;
      return;
    }

    const result = await response.json();

    if (result.error) {
      output.textContent = `Error: ${result.error}`;
    } else if (result.download_url) {
      output.innerHTML = `🎉 Signed IPA ready! <a href="${result.download_url}" target="_blank" rel="noopener">Download here (one-time use)</a>`;
    } else {
      output.textContent = 'Unexpected response from server.';
    }
  } catch (err) {
    output.textContent = `Network or server error: ${err.message}`;
  }
});
