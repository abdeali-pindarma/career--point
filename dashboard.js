// Elements
document.querySelector('.logout-btn').onclick = () => {
    // Implement logout logic or redirect to login
    window.location.href = "index.html";
    document.querySelector('.modern-button').onclick = () => {
        // Implement logout logic or redirect to login
        window.location.href = "chatbot.html";
    };

    function goToRoadmapPage(event) {
        // Prevent the parent click event if any
        event.stopPropagation();
        window.location.href = 'roadmap.html'; // redirect to roadmap.html page
    }

};

// Click avatar to open modal!
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.classList.add('open');
    modal.style.display = 'flex';
    document.getElementById('editName').value = document.getElementById('profileName').innerText;
    document.getElementById('editBio').value = document.getElementById('profileBio').innerText;
}

// Edit Profile via button (same behavior as avatar for reuse)
function editProfile() { openProfileModal(); }

// Fade out with smooth animation
function closeEdit() {
    const modal = document.getElementById('profileModal');
    modal.classList.remove('open');
    setTimeout(() => { modal.style.display = "none"; }, 330);
}

// Save changes and close
function saveProfile() {
    document.getElementById('profileName').innerText =
        document.getElementById('editName').value.trim();
    document.getElementById('profileBio').innerText =
        document.getElementById('editBio').value.trim();
    closeEdit();
}

// Click outside to close modal
window.onclick = function(event) {
    const modal = document.getElementById('profileModal');
    if (event.target === modal && modal.classList.contains('open')) {
        closeEdit();
    }
}

// You can add click handlers to each block to navigate to respective pages/features.

const careerModal = document.getElementById('career-modal');
const closeCareerModal = document.getElementById('close-career-modal');
const careerList = document.getElementById('career-list');
const careerSearch = document.getElementById('career-search');
const careerSelected = document.getElementById('career-selected');

// Open modal on block click
document.getElementById('career option').onclick = () => {
    careerModal.style.display = 'flex';
    populateCareerList("");
};

// Close modal
closeCareerModal.onclick = () => {
    careerModal.style.display = 'none';
    careerSelected.textContent = '';
};

// Click outside modal closes it
careerModal.onclick = (e) => {
    if (e.target === careerModal) {
        careerModal.style.display = 'none';
        careerSelected.textContent = '';
    }
};
document.getElementById('chatbot-block').onclick = function() {
    showChatbotModal();
};

function showChatbotModal() {
    const overlay = document.createElement('div');
    overlay.className = 'counsellor-coming-soon'; // reuse modal overlay for simplicity
    overlay.innerHTML = `
    <div class="counsellor-coming-soon-content">
      <div class="icon">🤖</div>
      <div>
        <strong>Chatbot AI</strong><br>
        Your instant assistant is ready!<br><br>
        (Chat UI coming soon)
      </div>
      <button onclick="this.parentElement.parentElement.remove()">Back to Dashboard</button>
    </div>
  `;
    document.body.appendChild(overlay);
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
}


function populateCareerList(search) {
    careerList.innerHTML = '';
    let filtered = careerOptions.filter(opt =>
        opt.toLowerCase().includes(search.toLowerCase())
    );
    filtered.forEach(option => {
        let li = document.createElement('li');
        li.textContent = option;
        li.onclick = () => {
            document.querySelectorAll('#career-list li').forEach(el => el.classList.remove('selected'));
            li.classList.add('selected');
            careerSelected.textContent = option;
        };
        careerList.appendChild(li);
    });
}
careerSearch.oninput = () => {
    populateCareerList(careerSearch.value);
};
// Autofill list when modal opens
populateCareerList("");

document.getElementById('research').onclick = () => {

    window.location.href = 'career options.html';
};


document.getElementById('salary-info').onclick = () => {
    alert('Salary info coming soon!');
};
document.getElementById('colleges-options').onclick = () => {
    alert('Colleges and Options section coming soon!');
};