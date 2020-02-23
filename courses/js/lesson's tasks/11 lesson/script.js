$(document).ready(function(){
  
  // first
  $('input[type=button]').click(function(){
    let nums = $('.numbers');
    for (let el of nums) {
      el.value *= el.value;
    }
  })

  // second
  $( ".words" ).keyup(function() {
    let symbols = $('.words').val().length;
    console.log( "Символов:", symbols);
    console.log( "Слов:", $('.words').val().split(' ').length);
  });

})