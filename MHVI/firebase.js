(function() {
  var config = {
    apiKey: "AIzaSyAZ08zz5k4W-uOFUDFbqMTnuIB6CQsf2yE",
    authDomain: "mhvi-80432.firebaseapp.com",
    databaseURL: "https://mhvi-80432.firebaseio.com",
    projectId: "mhvi-80432",
    storageBucket: "mhvi-80432.appspot.com",
    messagingSenderId: "252316303560"
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
            '<td><button type = "button" class="update btn btn-mhvi-secondary">Update</button></td></tr>' +
            '<tr class = "hide bg-mhvi-primary">'+
              '<td><button type = "button" class = "delete btn btn-danger">Delete</button></td>'+
              '<td class = "hidden"><input type="number" class="form-control" name="costTR" id="cost" placeholder="Cost of item"></td>'+
              '<td class = "hidden"><input type="number" class="form-control" name="quantityTR" id="quantity" placeholder="Quantity of item"></td>'+
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
        $('#inventoryTotal').append('<hr><h3>INVENTORY ITEMS:<br>' + totalInventoryItems.toLocaleString('en') + '</h3>');

        $('#reportTableBody tr:last').after('<tr><td><strong>Totals</strong></td>' +
                           '<td><strong>$'+totalCost.toLocaleString('en')+'</strong></td>'+
                           '<td><strong>' + totalQuantity.toLocaleString('en') + '</strong></td>'+
                           '<td><strong>$'+ totalInventoryValue.toLocaleString('en')+'</strong></td></tr>');
     //dbReportTable
     });
    //doc.ready()
    });
//function
}());
