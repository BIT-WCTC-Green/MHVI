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
  
  $(document).ready(function(){
    //search database for item
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
            window.location.href = "driver.html";
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
    const dbTable = firebase.database().ref();

    dbTable.startAt('A').orderByKey().on('child_added', snap => {
        $('#tableBody').append('<tr name ='+snap.key +'><td class="item"><span>' + snap.key + '</span></td><td class = "cost">' + snap.val().Cost + '</td><td class = quantity>' + snap.val().Quantity +
            '<td><button type = "button" class="update">Update</button></td></tr>' +
            '<tr class = "hide">'+
              '<td><button type = "button" class = "delete">Delete</button></td>'+
              '<td class = "hidden"><input type="text" name="costTR" placeholder="Cost"></td>'+
              '<td class = "hidden"><input type="text" name="quantityTR" placeholder="Quantity"></td>'+
              '<td><button type = "button" class = "submit">Submit</button>'+
            '</td></tr>');
          });
    dbTable.on('child_changed', snap => {
        $('tr[name =' + snap.key +']').find(".cost").html(snap.val().Cost);
        $('tr[name =' + snap.key +']').find(".quantity").html(snap.val().Quantity);
    });
    dbTable.on('child_removed', snap => {
        let $nextRow = $('tr[name = '+ snap.key +']').next("tr");
        $nextRow.remove();
        $('tr[name = '+ snap.key +']').remove();
    });
    //sync database changes in dropdown menu
    //grab reference to database
    const dbDropdown = firebase.database().ref();
    //databse event handlers
      //add all itmes from databases
      dbDropdown.on('child_added', snap => {
        //driver list
        $('#list').append('<option value = ' + snap.key + '>' + snap.val().Item + '</option>');
        $('#adminList').append('<option value = ' + snap.key + '>' + snap.val().Item + '</option>');
      })
      // listens for changes to any child in the database
      dbDropdown.on('child_changed', snap => {
        $('#list option[value='+ snap.key+']').text(snap.val().Item);
        $('#adminList option[value='+ snap.val().Item+']').text(snap.val().Item);
      })
      //listens for any children removed from the database then updates the selectlist
      dbDropdown.on('child_removed', snap => {
        $('#list option[value='+ snap.key +']').remove();
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
