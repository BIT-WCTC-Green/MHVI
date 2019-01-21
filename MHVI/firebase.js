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
        searchDatabase($('#adminSearch').val(),$('#object'));
    });
    //update quanitity of item
    $('#btnUpdate').click(function(){
      updateDatabase(String($('#adminSearch').val()),$('#txtUpdate').val());
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

    //databse event handlers
    const dbTable = firebase.database().ref();

    let dbAutocomplete = [];
    dbTable.startAt('A').orderByKey().on('child_added', snap => {
        $('#tableBody').append('<tr name ='+ snap.key +'><td class="item" width = "254"><span>' + snap.key + '</span></td><td class = "cost" width ="531">' + snap.val().Cost.toLocaleString('en')   + '</td><td class = quantity width ="531"> ' + snap.val().Quantity.toLocaleString('en')  + '</td>'+
            '<td><button type = "button" class="update btn btn-primary">Update</button></td></tr>' +
            '<tr class = "hide bg-primary">'+
              '<td><button type = "button" class = "delete btn btn-danger">Delete</button></td>'+
              '<td class = "hidden"><input type="text" name="costTR" placeholder="Cost"></td>'+
              '<td class = "hidden"><input type="text" name="quantityTR" placeholder="Quantity"></td>'+
              '<td><button type = "button" class = "submit btn btn-warning">Submit</button>'+
            '</td></tr>');

            dbAutocomplete.push(snap.key);
    });
    $( "#searchName" ).autocomplete({
      source: dbAutocomplete
    });
    const dbReportTable = firebase.database().ref();
     dbReportTable.on('value', snap => {
       let totalInventoryItems = 0;
       let totalCost = 0;
       let totalQuantity = 0;
       let totalInventoryValue = 0;

       snap.forEach(function(child){
         $('#reportTableBody').append('<tr><td class="item" width = "254"><span>' + child.val().Item + '</span></td>'+
             '<td class = "cost" width ="531">' + child.val().Cost.toLocaleString('en')  + '</td>'+
             '<td width ="531"> ' + child.val().Quantity.toLocaleString('en')  + '</td>'+
             '<td>'+ (child.val().Cost * child.val().Quantity).toLocaleString('en')  +'</td></tr>');
         totalInventoryItems++;
         totalCost+= child.val().Cost;
         totalQuantity+=child.val().Quantity;
         totalInventoryValue+=(child.val().Cost * child.val().Quantity);
       });
        $('#total').append('<h3>Inventory Items:</h3>' + totalInventoryItems.toLocaleString('en') +
                           '<br><h3>Total Cost:</h3>' +'$'+totalCost.toLocaleString('en')+
                           '<br><h3>Total Quantity:</h3>' + totalQuantity.toLocaleString('en')+
                           '<br><h3>Total Inventory Value:</h3>' +'$'+ totalInventoryValue.toLocaleString('en'));
     });
    // //grab reference to database
    // const dbDropdown = firebase.database().ref();
    // //add all itmes from databases
    // dbDropdown.on('child_added', snap => {
    //   //driver list
    //   $('#list').append('<option value = ' + snap.key + '>' + snap.val().Item + '</option>');
    //   $('#adminList').append('<option value = ' + snap.key + '>' + snap.val().Item + '</option>');
    // })
    // // listens for changes to any child in the database
    // dbDropdown.on('child_changed', snap => {
    //   // $('#list option[value='+ snap.val().Item+']').text(snap.val().Item);
    //   $('#adminList option[value='+ snap.key+']').text(snap.val().Item);
    //   $('#list option[value='+ snap.key +']').text(snap.val().Item);
    //
    // })
    // //listens for any children removed from the database then updates the selectlist
    // dbDropdown.on('child_removed', snap => {
    //   $('#list option[value='+ snap.key +']').remove();
    //   $('#adminList option[value='+snap.key +']').remove();
    // })
    //
    // $('#list').change(function() {
    //   let listItem = $('#list').find(":selected").text();
    //   if (listItem != "Select Item"){
    //     searchDatabase(listItem,$(driverOutput));
    //   }
    // });
    // $('#adminList').change(function() {
    //   let listItem = $('#adminList').find(":selected").text();
    //   if (listItem != "Select Item"){
    //     searchDatabase(listItem,$(output));
    //   }
    // });
    //doc.ready()
    });
//function
}());
