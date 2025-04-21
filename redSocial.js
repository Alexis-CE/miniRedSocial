/* 
Requerimientos del reto:

1. El usuario debe poder ingresar su usuario y contraseñ
2. El sistema debe ser capaz de validar si el usuario y contraseÃ±a ingresados por el usuario existen en la base de datos
3. Si el usuario y contrasña son correctos, el sistema debe mostrar un mensaje de bienvenida y mostrar el timeline del usuario.
4. Si el usuario y contraseña son incorrectos, el sistema debe mostrar un mensaje de error y no mostrar ningun timeline.

*/

let dataBase = JSON.parse(localStorage.getItem('dataBase')) || [
    { username: "Alexis", password: "1234", posts: [] },
    { username: "Dallener", password: "1234", posts: [] }
];

let currentUser = null;

const form = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const message = document.getElementById('message');
const timelineContainer = document.getElementById('timelineContainer');
const postsContainer = document.getElementById('postsContainer');
const postButton = document.getElementById('postButton');
const newPost = document.getElementById('newPost');

function registrarUsuario(nuevoUsuario, nuevaPassword) {
    const existe = dataBase.some(
        user => user.username.toLowerCase() === nuevoUsuario.toLowerCase()
    );

    if (existe) {
        alert("Ese usuario ya existe.");
    } else {
        dataBase.push({ username: nuevoUsuario, password: nuevaPassword, posts: [] });
        localStorage.setItem('dataBase', JSON.stringify(dataBase));
        alert("Usuario registrado con éxito, inicie sesión.");
    }
}

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nuevoUsuario = document.getElementById('newUsername').value.trim();
    const nuevaPassword = document.getElementById('newPassword').value.trim();

    if (!nuevoUsuario || !nuevaPassword) {
        message.textContent = "Debes ingresar todos los campos.";
        return;
    }

    registrarUsuario(nuevoUsuario, nuevaPassword);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        message.textContent = "Debes ingresar tu usuario y contraseña.";
        return;
    }

    currentUser = dataBase.find(
        user => user.username.toLowerCase() === username.toLowerCase() && user.password === password
    );

    if (currentUser) {
        message.textContent = `Bienvenido, ${currentUser.username}. Aquí está tu timeline 📰`;

        timelineContainer.style.display = 'block';
        document.querySelector('.loginContainer').style.display = 'none';
        document.querySelector('.registerContainer').style.display = 'none';

        mostrarPosts(currentUser);

        postButton.addEventListener('click', function() {
            const newPostContent = newPost.value.trim();
            
            if (newPostContent && currentUser) {
                currentUser.posts.push(newPostContent);
                localStorage.setItem('dataBase', JSON.stringify(dataBase));
                newPost.value = '';
                mostrarPosts(currentUser);
            } else {
                message.textContent = "No estás logueado correctamente o el contenido del post está vacío.";
            }
        });
    } else {
        message.textContent = "Usuario o contraseña incorrectos, intenté nuevamente.";
    }
});


function mostrarPosts(user) {
    postsContainer.innerHTML = '';

    if (user && user.posts && user.posts.length > 0) {
        user.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.textContent = post;
            postsContainer.appendChild(postElement);
        });
    }
}

document.getElementById('reloadButton').addEventListener('click', function() {
    location.reload();
});
