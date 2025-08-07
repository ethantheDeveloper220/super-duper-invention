// Tab switching
function showTab(tabId, event) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Signing button placeholder
document.addEventListener('DOMContentLoaded', () => {
  const signBtn = document.getElementById('signButton');
  const output = document.getElementById('signerOutput');

  signBtn.addEventListener('click', async () => {
    output.textContent = '';

    const ipaFile = document.getElementById('ipaFile').files[0];
    const p12File = document.getElementById('p12File').files[0];
    const mobileProvisionFile = document.getElementById('mobileProvisionFile').files[0];
    const p12Password = document.getElementById('p12Password').value;

    if (!ipaFile || !p12File || !mobileProvisionFile) {
      output.textContent = '⚠️ Please select all required files.';
      return;
    }
    if (!p12Password) {
      output.textContent = '⚠️ Please enter the P12 password.';
      return;
    }

    output.textContent = '🔄 Starting signing process...';

    // NOTE: This is a placeholder.
    // Here you would upload the files to your backend API or an external signer API
    // and then handle the response (signed IPA URL or error)

    // Simulate delay & success
    setTimeout(() => {
      output.textContent = '✅ IPA signed successfully! Download link:\nhttps://example.com/temp-signed-ipa.ipa (One-time use)';
    }, 2500);
  });
});