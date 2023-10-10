 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'   
  import { getDatabase, ref , set , get , child } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCbe_jeDcug6_ovmgrD0uZu-FmxX0y2iVg",
    authDomain: "frgrgr-d2cd2.firebaseapp.com",
    projectId: "frgrgr-d2cd2",
    storageBucket: "frgrgr-d2cd2.appspot.com",
    messagingSenderId: "934734166289",
    appId: "1:934734166289:web:0fd09ac97ed145e52b34b0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);



  const auth = getAuth();
  const db = getDatabase(app)

  let username = document.getElementById("Username")
  let password = document.getElementById("Password")
  let email = document.getElementById("Email")
  let phone = document.getElementById("Phone")


  let submit = document.getElementById("signup");

  submit.addEventListener("click",(e)=> {
    e.preventDefault();

    if (username.value.includes(" ")) {
      alert("Username must not contain spaces.");
      return;
    }
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordPattern.test(password.value)) {

alert("The password must be more than 8 characters and contain a number, an uppercase letter, and a special character.")

      return;
    }

    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailPattern.test(email.value)) {
      alert("The email is invalid.")
      return;
    }

    const phonePattern = /^07\d{8}$/;
    if (!phonePattern.test(phone.value)) {
      alert("Invalid phone number. Must be 10 digits long and start with 07")
      return;
    }

get(ref(db, 'user/' + document.getElementById("Username").value)).then((snapshot) => {
    if (snapshot.exists()) {

alert("The user already exists.")
    }else {

    
    set(ref(db , 'user/'+ document.getElementById("Username").value ),
{
  username:username.value,
  password:password.value,
  email:email.value,
  phone:phone.value,
});
alert("Saved Data")


    let obj = {
      username:username.value,
      password:password.value,
      email:email.value,
      phone:phone.value,
}

createUserWithEmailAndPassword(auth, obj.email , obj.password)
.then(function(success){

  alert("Sign up Successfully")
})
.catch(function(err){
alert("error"+ err);
})

console.log(obj);
    }
  })

  })