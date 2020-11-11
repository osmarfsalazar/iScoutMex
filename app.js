var db = firebase.firestore();

//Login google
$('#loginG').click(function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {

        console.log(result.user);
        //  $('#root').append("<img src='"+result.user.photoURL+"'/>")
        //   $('#root').append("<img stc='"+)
        guardarDatos(result.user);
    });
})

// Login with Facebook
$('#loginF').click(function () {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log(result);
        guardarDatos(result.user);
    })
        .catch(err => {
            console.log(err);
        })
})

// Login correo
$('#login').click(function () {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {
            console.log('Credenciales correctas, ¡bienvenido!');
        })
        .catch(function (error) {
            console.log(error);
        });
})

// Registro correo
$('#reg').click(function () {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (result) {
            var usuario = {
                uid: result.user.uid,
                nombre: result.user.email,
                email: result.user.email,
                img: "https://graph.facebook.com/3498960506864413/picture",
            }
            db.collection("users").doc(result.user.uid).set(usuario)
        })
        .catch(function (error) {
            console.error(error)
        });
})

//bd
function guardarDatos(user) {
    var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        img: user.photoURL
    }
    db.collection("users").doc(user.uid).set(usuario)
}

// function ingresar(){
//     let idIngresar = document.getElementById("i")
// }

//update realtime
db.collection("users").onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        $('#root').append("<img src='" + doc.data().img + "'/>")
    });
})

