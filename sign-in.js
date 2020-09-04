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
    renderCreatedPost();
    renderUser();
  } else {
    alert("Invalid credentials");
  }
}

function createPost() {
  let data = {};

  data.userName = document.getElementById("username").value;
  data.title = document.getElementById("postTitle").value;
  data.textBody = document.getElementById("postContent").value;
  data.image = document.getElementById("newImage").value;
  data.timeToRead = document.getElementById("timeToRead").value;
  data.timeCreated = Date.now();
  console.log(JSON.stringify(data));
  fetch("http://localhost:4000/create-post", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then(() => getUserPosts(data.userName));
}

function renderCreatedPost() {
  document.getElementById("createPost").innerHTML = "";
  document.getElementById(
    "createPost"
  ).innerHTML = `<label for="postTitle">Title</label>
  <input class="postTitle" id="postTitle" type="text" />
  <label for="postContent">Content</label>
  <input class="postConent" id="postContent" type="text" />
  <label for="newImage">Add an image</label>
  <input class="newImage" id="newImage" type="text" />
  <label for="timeToRead">Time to Read</label>
  <input class="timeToRead" id="timeToRead" type="text" />  
  <button onclick = "createPost()">Create Post</button>`;
}
