document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("login-popup").style.display = "block";
  paginateTable();

  // Add event listeners for Enter key
  document.getElementById("username").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action if necessary
      login();
    }
  });

  document.getElementById("password").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action if necessary
      login();
    }
  });
});

function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username === "admin" && password === "admin#1234") {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("login-popup").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
  } else if (username === "test" && password === "test") {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("login-popup").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
  } else {
    alert("Incorrect username or password");
  }
}

function logout() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("login-popup").style.display = "block";
  document.getElementById("chat-container").style.display = "none";
}

let currentPage = 1;
const rowsPerPage = 10;

function paginateTable() {
  const table = document.getElementById("chat-table");
  const tbody = table.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  rows.forEach((row, index) => {
    row.style.display = "none";
    if (index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage) {
      row.style.display = "table-row";
      row.classList.add("fade-in-row"); // Add animation class
    }
  });

  document.getElementById("page-number").max = totalPages;
  document.getElementById("page-number").value = currentPage;
  document.getElementById("prev-btn").disabled = currentPage === 1;
  document.getElementById("first-btn").disabled = currentPage === 1;
  document.getElementById("next-btn").disabled = currentPage === totalPages;
  document.getElementById("last-btn").disabled = currentPage === totalPages;
}

function nextPage() {
  currentPage++;
  paginateTable();
}

function prevPage() {
  currentPage--;
  paginateTable();
}

function firstPage() {
  currentPage = 1;
  paginateTable();
}

function lastPage() {
  const table = document.getElementById("chat-table");
  const rows = table.querySelectorAll("tbody tr");
  currentPage = Math.ceil(rows.length / rowsPerPage);
  paginateTable();
}

function goToPage(page) {
  const totalPages = Math.ceil(document.querySelectorAll("#chat-table tbody tr").length / rowsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    paginateTable();
  } else {
    alert("Invalid page number");
    document.getElementById("page-number").value = currentPage;
  }
}
