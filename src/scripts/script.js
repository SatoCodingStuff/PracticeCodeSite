import { findUserById } from "./dbActions.js"

if(localStorage.getItem("user_id") !== null) {
	const user = await findUserById(localStorage.getItem("user_id"));

	document.getElementById('text').innerHTML = "Hello " + user.data().username;
	document.getElementById('LogIn').style.display = 'none';
	document.getElementById('Register').style.display = 'none';
} else {
	document.getElementById('logOut').style.display = 'none';
	document.getElementById('text').innerHTML = "Welcome Guest";
}


document.getElementById('Register').addEventListener('click', () => {
	location.href = "./regsiter.html";
});

document.getElementById('LogIn').addEventListener('click', () => {
	location.href = "./login.html";
});

document.getElementById('logOut').addEventListener('click', () => {
	localStorage.removeItem('user_id');
	localStorage.setItem('isLoggedIn', false);
	location.reload(true);
});