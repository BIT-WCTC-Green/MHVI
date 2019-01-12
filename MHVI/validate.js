$(function() {
  //custom method to check that fields only contain letters and spaces
  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z\s]+$/i.test(value);
  }, "Only alphabetical characters and spaces");
  jQuery.validator.addClassRules('hiddenTr', {
          // required: true,
          lettersonly:true
    });
  $("form[name='mhvi']").validate({
    // Specify validation rules
    rules: {
      item: {
        required: true,
        // lettersonly:true
      },
      quantity:{
        required: true,
        digits: true,
        min:0
      },
      cost:{
        required:true,
        number:true,
        min:0
      }
    },
    // Specify validation error messages
    messages: {
      item: {
        required:"Please enter an Item",
      },
      weight: {
        required: "Please enter your weight",
        digits: "you must enter positive numbers",
        min: "your weight must be at least 2 digits"
      }
    },
    //don't use parentheses when calling the function
    submitHandler: dbWrite
  });
  $("#driver").validate({
      rules: {
        list: {
          required: true
        },
        driverTxtUpdate:{
          required: true,
          range:[-100,100]
        }
      },
      messages: {
        list: {
          required: "Please select an option from the dropdown menu"
        },
        driverTxtUpdate:{
          required: "Please enter the quantity"
        }
      },
  });
  $("#adminSelectForm").validate({
      rules: {
        adminList: {
          required: true
        },
        adminSelectQuantity:{
          required: true,
          range:[-100,100]
        }
      },
      messages: {
        adminList: {
          required: "Please select an option from the dropdown menu"
        },
        adminSelectQuantity:{
          required: "Please enter the quantity"
        }
      },
      submitHandler: adminSelectForm
  });
  $('#table').validate({
    rules:{
      costTR:{
        number:true
      },
      quantityTR:{
        number:true
      }
    }
  });
  $('#driverDropOff').click(function() {
    //check if driver form meets validation rules
    if ($('#driver').valid()) {
      let item = $('#list').find(":selected").text();
      let quantity = $('#driverTxtUpdate').val();
      updateDatabase(item,(-1 * quantity));
    }
  });
  $('#driverPickUp').click(function() {
    //check if driver form meets validation rules
    if ($('#driver').valid()) {
      let item = $('#list').find(":selected").text();
      let quantity = $('#driverTxtUpdate').val();
      updateDatabase(item,quantity);
    }
  });
  $('#tableBody').on('click','.update',function(){
    let $row = $(this).closest("tr");   // Find the row
    let $nextRow = $row.next("tr"); // Find the next row down
    $nextRow.toggle(); //show hide hidden row
  });
  $('#tableBody').on('click','.submit',function(){
    let $row = $(this).closest("tr"); // get the row where the button was pushed
    let $prevRow = $row.prev(); // get the previous row
    let item = $prevRow.find(".item").text(); // Find the item we are upadting
    let cost = $row.find("input[name = 'costTR']").val(); //Find textbox for Cost
    let quantity = $row.find("input[name = 'quantityTR']").val(); //Find textbox for Quantity

    if ($('#table').valid()) { //check if row meet validation requirments
      adminUpdateDatabase(item,quantity,cost);
    }
  });
  $('#tableBody').on('click','.delete',function(){
    let $row = $(this).closest('tr');
    let $item = $row.prev().find(".item").text();
    const dbItem = firebase.database().ref($item);

    if (confirm("Are you sure you want to delete " + $item + "?")){
      dbItem.remove();
    }
  });
//function
});
