

 //---------------------err--------------------------------------
 if(err == 'success'){
  Swal.fire({
    title: 'สำเร็จ!',
    text: "เพิ่มข้อมูลสำเร็จ!",
    icon: 'success',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
 }
 if(err == 'Deleted'){
  Swal.fire({
    title: 'สำเร็จ!',
    text: "ลบข้อมูลสำเร็จ!",
    icon: 'success',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    }) 
 }
 if(err == 'D_idcard'){
  Swal.fire({
    title: 'เกิดข้อผิดพลาด?',
    text: "มีรหัสประชาชนในระบบแล้ว!",
    icon: 'error',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
 }
 if(err == 'D_idstudent'){
  Swal.fire({
    title: 'เกิดข้อผิดพลาด?',
    text: "มีรหัสนักศึกษาในระบบแล้ว!",
    icon: 'error',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
 }
 if(err == 'D_email'){
  Swal.fire({
    title: 'เกิดข้อผิดพลาด?',
    text: "มีอีเมล์ในระบบแล้ว!",
    icon: 'error',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
 }
 if(err == 'D_name'){
  Swal.fire({
    title: 'เกิดข้อผิดพลาด?',
    text: "มีรหัสชื่อนี้ในระบบแล้ว!",
    icon: 'error',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
 }
 //------------------------------------------------------------------
 //readURL Images
 function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah')
              .attr('src', e.target.result);
          $('#infoblah')
              .attr('src', e.target.result);     
      };
      reader.readAsDataURL(input.files[0]);
    }   
      
}

function validateForm(){
  event.preventDefault();
  var form = document.forms["insertUserForm"]; 
  var idcard = $('#idcard').val();
  var idstudent = $('#idstudent').val();
  var firstname = $('#firstname').val();
  var lastname = $('#lastname').val();
  var email = $('#email').val();
  var department = $('#department_id').val();
  var gender = $('#gender').val();
  var birthday = $('#birthday').val();
  var generation = $('#generation').val();
  var year =  $('#year').val();
  
  if((idcard.length !== 13 || idcard == '' || birthday == '' || idstudent == '' || firstname == '' || lastname == '' || email == '' || department == '' || gender == '' || generation == '' || year == '')){
    if(idcard.length !== 13){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด?',
        text: "กรุณากรอกรหัสประชาชนต้อง 13 หลักเท่านั้น",
        icon: 'warning',
        confirmButtonColor: '#dc143c',
        confirmButtonText: 'ตกลง'
        })
    }
    if(generation == '' || year == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด?',
        text: "กรุณากรอกรุ่นและปี!",
        icon: 'warning',
        confirmButtonColor: '#dc143c',
        confirmButtonText: 'ตกลง'
        })
    }
   
    if(idcard == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด?',
        text: "กรุณากรอกรหัสประชาชน!",
        icon: 'warning',
        confirmButtonColor: '#dc143c',
        confirmButtonText: 'ตกลง'
        })
    }
    if(idstudent == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด?',
        text: "กรุณากรอกรหัสนักศึกษา!",
        icon: 'warning',
        confirmButtonColor: '#dc143c',
        confirmButtonText: 'ตกลง'
        })
    }
    if(firstname == '' ){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด?',
        text: "กรุณากรอกชื่อ!",
        icon: 'warning',
        confirmButtonColor: '#dc143c',
        confirmButtonText: 'ตกลง'
        })
    }
    if(lastname == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด?',
        text: "กรุณากรอกนามสกุล!",
        icon: 'warning',
        confirmButtonColor: '#dc143c',
        confirmButtonText: 'ตกลง'
        })
    }
    if(email == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด?',
        text: "กรุณากรอกอีเมล์!",
        icon: 'warning',
        confirmButtonColor: '#dc143c',
        confirmButtonText: 'ตกลง'
        })
    }
    if(birthday == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด?',
        text: "กรุณากรอกวันเดือนปีเกิด!",
        icon: 'warning',
        confirmButtonColor: '#dc143c',
        confirmButtonText: 'ตกลง'
        })
    }
    if(department == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด?',
        text: "กรุณาเลือกแผนก!",
        icon: 'warning',
        confirmButtonColor: '#dc143c',
        confirmButtonText: 'ตกลง'
        })
    }
    if(gender == ''){
      Swal.fire({
        title: 'เกิดข้อผิดพลาด?',
        text: "กรุณาเลือกเพศ!",
        icon: 'warning',
        confirmButtonColor: '#dc143c',
        confirmButtonText: 'ตกลง'
        })
    }
  }else{
    form.submit()
  }
} 
 //------image------------
 if(user_id !== ''){
  $('#modalImage').modal();
} 
$( "#resetID" ).click(function() {
  Swal.fire({
    title: 'สำเร็จ!',
    text: "เพิ่มข้อมูลสำเร็จ!",
    icon: 'success',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    }).then((result)=>{
      if(result){
        $('#user_id').val("");
        $('#modalImage').modal('hide');
      }
    })

});
$("#saveImg").click(function(){
  event.preventDefault();
  var form = document.forms["formImg"]
  var image = $('#image').val();
  if(image == ''){
    Swal.fire({
    title: 'เกิดข้อผิดพลาด?',
    text: "กรุณาเลือกรูปภาพ!",
    icon: 'warning',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
  }else{
    form.submit();
  }
})
//Delete User
function deleteUser(id){
  event.preventDefault();
  Swal.fire({
    title: 'ต้องการลบหรอไม่?',
    text: "ถ้าคุณต้องลบกรุณากดตกลงเพื่อลบ!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
    }).then((result) => {
    if (result.isConfirmed == true) {
      window.location.href = `/systemDeleteUser?id=${id}`
    }
  }) 
}
//show User
function infoUser(id){
  event.preventDefault();
  $.post("systemInfoUser?id="+id,function(data){
    receiveInfo = $('#infoidcard').val(data.idcard);
    $('#infoidstudent').val(data.idstudent);
    $('#infolastname').val(data.lastname);
    $('#infoemail').val(data.email);
    var date = moment(data.birthday).utc().format('YYYY-MM-DD')
    $("#infobirthday").val(date)
    $('#infogender').val(data.gender);
    $('#infodepartment_id').val(data.department_id);
    $('#infogen').val(data.gen);
    $('#infoyear').val(data.year);
    $('#infofacebook').val(data.facebook);
    $('#infoline').val(data.line);
    $('#infophone').val(data.phone);
    $('#infoduty').val(data.duty);
    $('#inforole').val(data.role);
    $('#infoother').val(data.other);
    $('#infofirstname').val(data.firstname);
    $('#infonickname').val(data.nickname)
    $('#infoblah').attr("src","/upload/"+data.image);
    $('#infoIdForImage').val(data._id);
    $('#infoBeforeImage').val(data.image)
    $('#editusermodal').modal();
    //console.log("/upload/"+data.image)
    //console.log(data)
  })
}
//edit User
function editUser(id){
  event.preventDefault();
  window.location.href = `/systemEditUserPage?id=${id}`
}
//----------------------------ค้นหา------------------------------
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
//---------------------------------------------------------------
  if (uri.indexOf("?") > 0) {
    var clean_uri = uri.substring(0, uri.indexOf("?"));
    window.history.replaceState({}, document.title, clean_uri);
  }