
  //Add FirebaseUI

  <script src="https://cdn.firebase.com/libs/firebaseui/2.4.1/firebaseui.js"></script>
  <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.4.1/firebaseui.css" />
  <script type="text/javascript">
      // FirebaseUI config.
      var provider = new firebase.auth.GoogleAuthProvider();
      var uiConfig = {
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    </script>


  <script>
  // Initialize Firebase
  var provider = new firebase.auth.GoogleAuthProvider();
  var config = {
    apiKey: "AIzaSyAmORyTzdXawXfm39yUDg8XoxLTeW-lj-8",
    authDomain: "picday-39afd.firebaseapp.com",
    databaseURL: "https://picday-39afd.firebaseio.com",
    projectId: "picday-39afd",
    storageBucket: "picday-39afd.appspot.com",
    messagingSenderId: "146132231289"
  };
  firebase.initializeApp(config);
  </script>

  <script src="https://www.gstatic.com/firebasejs/4.6.0/firebase.js"></script>
