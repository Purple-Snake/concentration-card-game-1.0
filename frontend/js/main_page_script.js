const endpoint = "http://localhost:3000/api/users";

function logOutUser() {
  sessionStorage.clear();
}

window.addEventListener("load", () => {
  const userName = sessionStorage.getItem("userName");

  if (!userName) {
    document.getElementById("nav-ul").innerHTML = `
        <li class="nav-item">
                <a class="nav-link log-in" id="log-in" href="registration.html">Prisijungti</a>
            </li>
            `;
    // document.getElementById("user-highscore").innerHTML = `0`;
    
    return;
  } else {
    document.getElementById("nav-ul").innerHTML = `
    <li class="nav-item welcome-sign"><span class="welcome-sign">Sveiki, ${userName}</span></li>
    <li class="nav-item">
                <a href="#" class="nav-link log-out" id="log-out" onclick="logOutUser(),location.reload()">Atsijungti</a>
            </li>
    `;
    document.getElementById("user-highscore-div").innerHTML = `
      <ul class="list-inline mx-auto highscore">
        <li class="record">Rekordas</li>
        <li class="score" id="user-highscore"></li>
      </ul>`;
    document.getElementById(
      "user-highscore"
    ).innerHTML = `${sessionStorage.getItem("highScore")}`;
  //   
  }
});
