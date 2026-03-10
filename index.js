// --- Updated Auth Execution for Backend ---
document.getElementById('regForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const userData = {
    username: document.getElementById('uName').value,
    email: document.getElementById('uEmail').value
  };

  document.getElementById('sync-overlay').style.display = 'flex';

  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      setTimeout(() => {
        document.getElementById('sync-overlay').style.display = 'none';
        document.getElementById('auth-page').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('welcome').innerText = "Operator: " + userData.username;
        
        // Add to UI Table
        const table = document.getElementById('userTable');
        table.innerHTML += `<tr class="new-row">
            <td>${userData.username}</td>
            <td>Level 4</td>
            <td style="color:var(--success)"><i class="fas fa-circle" style="font-size:8px"></i> ONLINE</td>
        </tr>`;

        triggerPopup("Encrypted Link Established with MongoDB");
      }, 2000);
    }
  } catch (err) {
    alert("Connection Failed. Is your Backend running?");
    document.getElementById('sync-overlay').style.display = 'none';
  }
});