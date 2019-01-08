function dbWrite() {
  //reference to database
  const dbWrite = firebase.database().ref().child(String($('#item').val()));
  //new date object
  dbWrite.set({
    Item:$('#item').val(),
    Quantity:(parseInt($('#quantity').val())),
    Cost:(parseInt($('#cost').val())),
    Date: firebase.database.ServerValue.TIMESTAMP
  })
}
