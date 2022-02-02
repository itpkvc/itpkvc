//-------set Date To value
data = moment(date).format('YYYY-MM-DD');
$('#birthday').val(data);
$('#gender').val(gender);
$('#department_id').val(department_id);
$('#duty').val(duty);
$('#role').val(role);
  //save image
  function saveImage(){
    event.preventDefault();
    var form = document.forms["formImage"];
    var image = $('#image').val();
    if(image == ''){
      Swal.fire({
      title: 'เกิดข้อผิดพลาด!',
      text: "โปรเลือกรูปภาพก่อนบันทึก!",
      icon: 'warning',
      confirmButtonColor: '#dc143c',
      confirmButtonText: 'ตกลง'
      })
    }else{
      form.submit();
    }
  }
  //readURL Images
  function readURL(input) {
      if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $('#blah')
              .attr('src', e.target.result);
               
      };
      reader.readAsDataURL(input.files[0]);
      }   
  }
  //alert Success
  if(alert == 'Update'){
    Swal.fire({
      title: 'สำเร็จ!',
      text: "บันทึกข้อมูลสำเร็จ!",
      icon: 'success',
      confirmButtonColor: '#dc143c',
      confirmButtonText: 'ตกลง'
      })
  }
  if(alert == 'Duplicate'){
    Swal.fire({
      title: 'เกิดข้อผิดพลาด!',
      text: "มีข้อมูลนี้ในระบบแล้วหรือคุณใช้อยู่!",
      icon: 'question',
      confirmButtonColor: '#dc143c',
      confirmButtonText: 'ตกลง'
      })
  }
  //------save Info
  function saveInfo(){
    event.preventDefault();
    var form = document.forms["formInfo"]
    Swal.fire({
      title: 'ต้องการบันทึกหรือไม่?',
      text: "ถ้าคุณต้องการบันทึกกรุณากดตกลง",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
      }).then((result) => {
      if (result.isConfirmed == true) {
        form.submit();
      }
    }) 
  }
  // edit Id card
  editIdcard=(id,idcard)=>{
    $('#formIdcard').attr('action',`/systemEditPrimary?id=${id}`);
    $('#_Idcard').val(idcard);
    $('#idcardModal').modal();
    
  }
   // edit Id Std
   editStudent=(id,idstudent)=>{
    $('#formStudent').attr('action',`/systemEditPrimary?id=${id}`);
    $('#_idstudent').val(idstudent);
    $('#idstdModal').modal();
    
  }
  // editName
  editName=(id,firstname,lastname)=>{
    $('#formName').attr('action',`/systemEditPrimary?id=${id}`);
    $('#_firstname').val(firstname);
    $('#_lastname').val(lastname);
    $('#nameModal').modal();
  }
  // edit email
  editEmail=(id,email)=>{
    $('#formEmail').attr('action',`/systemEditPrimary?id=${id}`);
    $('#_email').val(email);
    $('#emailModal').modal();
  }
  // edit Password
  editPassword=(id)=>{
    $('#formPassword').attr('action',`/systemEditPrimary?id=${id}`);
    $('#passwordModal').modal();
  }
  // check Password
  checkPassword=()=>{
    event.preventDefault();
    var form = document.forms["formPassword"]
    var _password = $('#_password').val();
    var c_password = $('#c_password').val();
    if(_password !== c_password){
      Swal.fire({
      title: 'เกิดข้อผิดพลาด!',
      text: "กรุณากรอกรหัสผ่านให้ตรงกัน!",
      icon: 'warning',
      confirmButtonColor: '#dc143c',
      confirmButtonText: 'ตกลง'
      })
    }else{
      form.submit();
    }
  }
  //----reset params 2
  if (uri.indexOf("&") > 0) {
    var clean_uri = uri.substring(0, uri.indexOf("&"));
    window.history.replaceState({}, document.title, clean_uri);
  }

 