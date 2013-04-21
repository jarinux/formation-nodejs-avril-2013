function init_auth () {
  var eStatus = document.getElementById('status');
  var eLogin = document.getElementById('login');
  var eLogout = document.getElementById('logout');

  function refreshStatus () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/auth/status", true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = JSON.parse(xhr.responseText);
        if (!res.authenticated) {
          eStatus.innerText = 'Non identifié';
          eLogin.style.display = '';
          eLogout.style.display = 'none';
        } else {
          eStatus.innerText = 'Identifié (' + res.username + ')';
          eLogin.style.display = 'none';
          eLogout.style.display = '';
        }
      }
    };
  }

  eLogin.addEventListener("click", function () {
    var username = prompt('Username');
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/auth/login", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({username: username}));
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        refreshStatus();
      }
    };
  });

  eLogout.addEventListener("click", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/auth/logout", true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        refreshStatus();
      }
    };
  });

  refreshStatus();
}