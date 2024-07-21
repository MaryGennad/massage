/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );






// 

$(function() {
  $('.forma').each(function() {    
      var $frm = $(this);
      var input = $(this).find('.validate-input-at .input-at');
      var butsend = $(this).find('.form-at-btn');
      butsend.on('click',function(){
          var check = true;
          for(var i=0; i<input.length; i++) {
              if(validate(input[i]) == false){
                  showValidate(input[i]);
                  check=false;
              }
          }
          // Отправка формы        
          if (check == true) {
              $.post("/send.php", $frm.find(".form-at select, .form-at input, .form-at textarea").serialize(),
                  function(data){
                      if(data.frm_check == 'error'){ 
                          $frm.find(".result-at").html("<div class='error-at'>Ошибка: " + data.msg + "</div>");                    
                          } else {
                          $frm.find(".result-at").html("<div class='success-at'>Ваше сообщение отправлено!</div>"); 
                          $frm.find(".form-at").fadeOut(500);
                          $frm.find(".input-at").val("");            
                      }
                  }, "json");
                  return false;
          }
      });
      $('.form-at .input-at').each(function(){
          $(this).focus(function(){
              hideValidate(this);
          });
      });
      
  });    
  function validate(input) {
      /* Если нужно проверять валидность почты, раскомментируйте строчки ниже */
      /*
          if($(input).attr('type') == 'email' || $(input).attr('name') == 'email-at') {
          if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
          return false;
          }
          }
      */
      if($(input).val().trim() == ''){
          return false;
      }
  }
  function showValidate(input) {
      var thisAlert = $(input).parent();
      $(thisAlert).addClass('alert-validate');
  }
  function hideValidate(input) {
      var thisAlert = $(input).parent();
      $(thisAlert).removeClass('alert-validate');
  }
});