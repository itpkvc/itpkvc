document.title = "วิทลัยอาชีวศึกษาภูเก็ต"
//หน้า forgot-----------------------------------------------------------------------------------
function cancel(){
    Swal.fire({
        title: 'ต้องการยกเลิกหรอไม่?',
        text: "ถ้าคุณต้องการยกเลิกกรุณากดตกลงเพื่อยกเลิก!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
        }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/';
        }
    })
}
function  confirmSubmit(){
    event.preventDefault();
    var form = document.forms["formId"]; 
    Swal.fire({
    title: 'ต้องการยกเลิกหรอไม่?',
    text: "ถ้าคุณต้องการยกเลิกกรุณากดตกลงเพื่อยกเลิก!",
    icon: 'warning',
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
//-----------------------------------------------------------------------------------------------------

//resetPassword----------------------------------------------------------------------------------------
function check_pattern(){
    var pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8}$/;
    var c_password = document.getElementById("c_password").value;
    var password = document.getElementById("password").value;
    document.getElementById('alertBt').innerHTML = '';
    document.getElementById('alertPw').innerHTML = '';  
    if( !password.match(pattern)){
        var div = document.getElementById('alertBt');
        div.innerHTML += `
        <div class="alert alert-danger" role="alert">
        กรุณาอย่างน้อย 8 ตัวโดยมีตัวพิมเล็กตัวพิมพ์ใหญ่และตัวเลข
        </div>
        `;
    }
    if( password.match(pattern)){
        var div = document.getElementById('alertBt');
        div.innerHTML += `
        <div class="alert alert-success" role="alert">
        กรอกรหัสผ่านได้แข็งเเรง
        </div>
        `;
    }           
    if(c_password !== password){
        var div = document.getElementById('alertPw');
        div.innerHTML += `
        <div class="alert alert-danger" role="alert">
        กรุณากรอกรหัสผ่านให้ตรงกัน
        </div>
        `;      
    }
    if(c_password == password){
        var div = document.getElementById('alertPw');
        var divBt = document.getElementById('alertBt');
        
        div.innerHTML += `
        <div class="alert alert-success" role="alert">
        รหัสผ่านตรงกันเเล้ว
        </div>
        `; 
        
    } 
}
function reset_pw(){
    document.getElementById('alertPw').innerHTML = '';
    document.getElementById('alertBt').innerHTML = '';
}
function check_pw(){
    var c_password = document.getElementById("c_password").value;
    var password = document.getElementById("password").value;
    document.getElementById('alertPw').innerHTML = '';
   
    if(c_password !== password){
        var div = document.getElementById('alertPw');
        div.innerHTML += `
        <div class="alert alert-danger" role="alert">
        กรุณากรอกรหัสผ่านให้ตรงกัน
        </div>
        `;      
    }else{
        var div = document.getElementById('alertPw');
        div.innerHTML += `
        <div class="alert alert-success" role="alert">
        รหัสผ่านตรงกันเเล้ว
        </div>
        `; 
    }
    if(c_password = ''){
        document.getElementById('alertPw').innerHTML = '';
    }
}
function submit_pw(){
    event.preventDefault();
    var pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8}$/;
    var input_password = $("#password").val();
    var input_c_password = $("#c_password").val();
    if( !input_password.match(pattern) &&  !input_c_password.match(pattern)){
        Swal.fire({
            title: 'เกิดข้อพิดพลาด?',
            text: "กรุณากรอกข้อมูลให้ครบและทำตามเงื่อนไข!",
            icon: 'warning',
            confirmButtonColor: '#dc143c',
            confirmButtonText: 'ตกลง'
            });
    }else{
        var c_password = document.getElementById("c_password").value;
        var password = document.getElementById("password").value;
        var form = document.forms["formReset"];
        if(c_password == password){
            form.submit();
        }else{
            Swal.fire({
                title: 'เกิดข้อพิดพลาด?',
                text: "กรุณากรอกข้อมูลให้ครบและทำตามเงื่อนไข!",
                icon: 'warning',
                confirmButtonColor: '#dc143c',
                confirmButtonText: 'ตกลง'
            });
        }
        } 
}

