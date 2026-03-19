import { findUserByUsername, sha256 } from "./dbActions.js";

if(localStorage.getItem("isLoggedIn") === 'true') {
    location.href = "./index.html";
}

document.getElementById('loginButton').addEventListener('click', async () => {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const user = await findUserByUsername(username);
    
    if(user === null) {
        document.getElementById('wrong').innerHTML = "password or username is incorrect"
    } else {
        if(user.data().password === await sha256(password)) {
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("user_id", user.id)
            location.reload(true);
        }
        document.getElementById('wrong').innerHTML = "password or username is incorrect"
    }
});