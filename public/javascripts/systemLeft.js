function goUser(){
    window.location.href = '/systemUser'
  }
  function goDepart(){
    window.location.href = '/systemDepart'
  }
  function goWebboard(){
    window.location.href = '/themeLocal'
  }
  goSystemWebBoard=()=>{
    window.location.href = '/systemThemeLocal'
  }
  goMyThemeLocal=()=>{
    window.location.href = '/myThemeLocal'
  }
  $( document ).ready(function() {
    $.post( "/InfoLeft", function( data ) {
      $('#infoName').append(`<span>${data.firstname + ' ' + data.lastname}</span>`);
      $('#infoImage').attr('src',`/upload/${data.image}`)
      //console.log(data);
    });
  });