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
      }
    },
    //don't use parentheses when calling the function
    submitHandler: dbWrite
  });
  $("#driver").validate({
      rules: {
        searchName: {
          required: true
        },
        driverQuantityUpdate:{
          required: true,
          min:0
        }
      },
      messages: {
        list: {
          required: "Please select an option from the dropdown menu"
        },
        driverQuantityUpdate:{
          required: "Please enter the quantity"
        }
      },
      submitHandler: function(){
        alert("pickup")
      }
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
        digits:true
      },
      quantityTR:{
        number:true
      }
    }
  });
//function
});
