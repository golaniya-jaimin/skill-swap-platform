document.addEventListener("DOMContentLoaded", () => {
  const profileList = document.getElementById("profile-list");
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");
  const dropdownItems = document.querySelectorAll('.dropdown-menu li');
  const dropdownLabel = document.querySelector('#dropdownSelected .dropdown-label strong');

  // Sample user data with availability added
  const users = [
    {
      name: "Mark Demo",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      offered: "Photoshop",
      wanted: "Web Design",
      rating: "3.5/5",
      availability: "Available"
    },
    {
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      offered: "Drawing",
      wanted: "Digital Art",
      rating: "4.2/5",
      availability: "Available"
    },
    {
      name: "Alex John",
      image: "https://randomuser.me/api/portraits/men/90.jpg",
      offered: "Video Editing",
      wanted: "Animation",
      rating: "4.7/5",
      availability: "Unavailable"
    }
  ];

  let selectedAvailability = "";

  // Create toast message container
  const toast = document.createElement("div");
  toast.id = "toast-message";
  document.body.appendChild(toast);

  function showToast(message) {
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }

  function renderProfiles(userList) {
    profileList.innerHTML = "";
    userList.forEach((user) => {
      const card = document.createElement("div");
      card.className = "profile-card";

      card.innerHTML = `
        <img src="${user.image}" alt="${user.name}" class="profile-image">
        <div class="profile-details">
          <div class="text-block">
            <h3>${user.name}</h3>
            <p><strong>Skills Offered:</strong> ${user.offered}</p>
            <p><strong>Skills Wanted:</strong> ${user.wanted}</p>
            <p><strong>Availability:</strong> ${user.availability}</p>
          </div>
          <div class="button-rating-wrapper">
            <button class="request-button">Request</button>
            <div class="divider-line"></div>
            <div class="rating-section">
              <span class="rating-value">${user.rating}</span>
            </div>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        localStorage.setItem("selectedUser", JSON.stringify(user));
        window.location.href = "user.html";
      });

      const requestBtn = card.querySelector(".request-button");
      requestBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        showToast("🔒 Please login to send a request.");
      });

      profileList.appendChild(card);
    });
  }

  function filterAndSearch() {
    const keyword = searchInput.value.toLowerCase();

    const filtered = users.filter(user => {
      const matchName = user.name.toLowerCase().includes(keyword);
      const matchAvailability = selectedAvailability === "" || user.availability === selectedAvailability;
      return matchName && matchAvailability;
    });

    renderProfiles(filtered);
  }

  // Event Listeners
  searchBtn.addEventListener("click", filterAndSearch);
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") filterAndSearch();
  });

  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      selectedAvailability = item.getAttribute("data-value");
      dropdownLabel.textContent = selectedAvailability;
      filterAndSearch();
    });
  });

  // Initial load
  renderProfiles(users);
});
