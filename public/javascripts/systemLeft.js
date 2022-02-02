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
  gen=()=>{
    window.location.href = '/gen'
  }
  var user_id
  $( document ).ready(function() {
    $.post( "/InfoLeft", function( data ) {
      $('#infoName').append(`<span>${data.firstname + ' ' + data.lastname}</span>`);
      $('#infoImage').attr('src',`/upload/${data.image}`)
      if(data.role == 'admin'){
        $('#depart1').empty();
        $('#headLeft').html("ผู้ดูแลเเผนก")
      }
      if(data.role == 'user'){
        $('.user1').empty();
        $('#headLeft').html("ผู้ใช้งาน")
       
      }
      if(data.role == 'system'){
      
        $('#headLeft').html("ผู้ดูแลระบบ")
       
      }
      user_id = data._id
      
      //console.log(data);
    });
   
  });
  function setting(){
    window.location.href = '/systemEditUserPage?id='+ user_id
  }
  function news(){
    window.location.href = '/news'
  }
  function logout(){
    window.location.href = '/logout'
  }
  function news_show(){
    window.location.href = '/news_show'
  }
  function news_(){
    window.location.href = '/news_'
  }