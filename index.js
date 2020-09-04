//whenever page loads we want to fetch the blog by username
function getUserPosts(userName) {
  fetch(`http://localhost:4000/post?userName=${userName}`)
    .then((resp) => resp.json())
    // .then((json) => console.log(json))
    .then((json) => updateUserPost(json));
}

function updateUserPost(posts) {
  document.getElementById("userPosts").innerHTML = "";
  posts.map((el) => {
    document.getElementById("userPosts").innerHTML += `<div class="singlePost">
        <div class="title">${el.title}</div>
        <div class="content">${el.textBody}</div>
        <div class="image"><img src="${el.image}" alt="" /></div>
        <div class="readTime">${el.timeToRead}</div>
        <div class="timeCreated">${el.timeCreated}</div>
    </div>`;
    if (el.userName === document.getElementById("username").value) {
      document.getElementById(
        "userPosts"
      ).innerHTML += `<button onclick="deletePost(${el.id})">Delete</button>`;
    }
  });
}

function renderUser() {
  document.getElementById("usernames").innerHTML = "";
  fetch("http://localhost:4000/users")
    .then((resp) => resp.json())
    // .then((json) => console.log(json));
    .then((json) => displayUsers(json));
}

function displayUsers(json) {
  json.map(
    (el) =>
      (document.getElementById(
        "usernames"
      ).innerHTML += `<button onclick="getUserPosts('${el.userName}')">${el.userName}</button>`)
  );
}

function deletePost(id) {
  fetch(`http://localhost:4000/post?id=${id}`, {
    method: "DELETE",
  })
    .then((resp) => resp.json())
    .then(() => getUserPosts(document.getElementById("username").value));
}

function editPost() {}
