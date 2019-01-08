(function() {
  var config = {
    apiKey: "AIzaSyDaPeaiTpAzQcJSV46IDaaElp0OeAGp7E8",
    authDomain: "mhvi-15e2b.firebaseapp.com",
    databaseURL: "https://mhvi-15e2b.firebaseio.com",
    projectId: "mhvi-15e2b",
    storageBucket: "mhvi-15e2b.appspot.com",
    messagingSenderId: "630227463036"
  };
  firebase.initializeApp(config);
// blah
  $(document).ready(function(){
    //search database for item
    //ERRORS left shoes
    $("#search").click(function(){
        //grab string from searchName textbox
        searchDatabase($('#searchName').val(),$('#object'));
    });
    //update quanitity of item
    $('#btnUpdate').click(function(){
      updateDatabase(String($('#searchName').val()),$('#txtUpdate').val());
    });
    $('#loginBtn').click(function(){
      let usr = $('#userName').val();
      // alert(usr);
      let pwd = $('#password').val();

      //authenticate login information
      firebase.auth().signInWithEmailAndPassword(usr, pwd).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error : " + errorMessage);
      });
      //check if user is logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // alert(user.email);
          // check which user signed in and redirect accordingly.
          if (user.email == 'admin@mhvi.com'){
            window.location.href = "admin.html";
          }
          else if (user.email == 'driver@mhvi.com'){
            window.location = "driver.html";
          }
        }
      //onAuthStateChanged
      });
    //login button
    });
    $('#logoutBtn').click(function(){
      firebase.auth().signOut();
      window.location = "login.html";
    });

    const d = firebase.database().ref();

    d.on('child_added', snap => {
      // $('#table').append('<tr><td = "blah"><span>' + snap.key + '</span><button type = "button" class = "update">update</button></td></tr>');
      $('#adminTable').append(snap.key + '<button type="button" class="update">');
    })

    //sync database changes in dropdown menu
    //grab reference to database
    const dbDropdown = firebase.database().ref();
    //databse event handlers
      //add all itmes from database
      dbDropdown.on('child_added', snap => {
        //driver list
        $('#list').append('<option value = ' + snap.key + '>' + snap.val().Item + '</option>');

        $('#adminList').append('<option value = ' + snap.key + '>' + snap.val().Item + '</option>');
      })
      // listens for changes to any child in the database
      dbDropdown.on('child_changed', snap => {
        $('#list option[value='+snap.key+']').text(snap.val().Item);
        $('#adminList option[value='+snap.key+']').text(snap.val().Item);
      })
      //listens for any children removed from the database then updates the selectlist
      dbDropdown.on('child_removed', snap => {
        $('#list option[value='+snap.key +']').remove();
        $('#adminList option[value='+snap.key +']').remove();
      })

    $('#list').change(function() {
      let listItem = $('#list').find(":selected").text();
      if (listItem != "Select Item"){
        searchDatabase(listItem,$(driverOutput));
      }
    });
    $('#adminList').change(function() {
      let listItem = $('#adminList').find(":selected").text();
      if (listItem != "Select Item"){
        searchDatabase(listItem,$(output));
      }
    });
    //doc.ready()
    });
//function
}());
