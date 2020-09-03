function signIn() {
  fetch("http://localhost:4000/users")
    .then((resp) => resp.json())
    .then((json) => validateSignIn(json));
}

function validateSignIn(json) {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let success = false;
  json.map((el) => {
    if (el.userName === username && el.passWord === password) {
      success = true;
    }
  });
  if (success) {
    getUserPosts(username);
    renderUser();
  } else {
    alert("Invalid credentials");
  }
}
