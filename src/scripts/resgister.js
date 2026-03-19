import { addNewUser, findUserByUsername } from "./dbActions.js"

document.getElementById('registerButton').addEventListener('click', async () => {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const passwordConf = document.getElementById("registerPasswordCon").value;

    if(password !== passwordConf) {
        document.getElementById('wrong').innerHTML = "passwords are not the same"
    } else if(await findUserByUsername(username) !== null) {
        document.getElementById('wrong').innerHTML = "username already in use"
    } else {
        await addNewUser(username, password);
        location.href = "./login.html";
    }
   
});