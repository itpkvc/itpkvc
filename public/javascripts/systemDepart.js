if(err == 'noName'){
    Swal.fire({
    title: 'เกิดข้อพิดพลาด?',
    text: "กรุณาใส่ชื่อแผนก!",
    icon: 'warning',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
}
if(err == 'duplicate'){
    Swal.fire({
    title: 'เกิดข้อพิดพลาด?',
    text: "มีชื่อแผนกนี้แล้ว!",
    icon: 'warning',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
}
if(err == 'deleteSuccess'){
    Swal.fire({
    title: 'สำเร็จ!!',
    text: "ลบขอมูลสำเร็จ",
    icon: 'success',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
}
if(err == 'insertSuccess'){
    Swal.fire({
    title: 'สำเร็จ!!',
    text: "เพิ่มข้อมูลสำเร็จ",
    icon: 'success',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
}
if(err == 'updated'){
    Swal.fire({
    title: 'สำเร็จ!!',
    text: "เเก้ไข้ข้อมูลสำเร็จ",
    icon: 'success',
    confirmButtonColor: '#dc143c',
    confirmButtonText: 'ตกลง'
    })
}
function confirmDepart(data){
    event.preventDefault();
    Swal.fire({
        title: 'ต้องการลบข้อมูลหรือไม่?',
        text: "ถ้าคุณต้องการลบข้อมูลกรุณากดตกลง!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
        }).then((result) => {
        if (result.isConfirmed == true) {
            window.location.href = `/systemDeleteDepart/${data}`
        }
    })
}  


//-----------------------------------------------------------------------------------------------------------
var uri = window.location.toString();
if (uri.indexOf("?") > 0) {
    var clean_uri = uri.substring(0, uri.indexOf("?"));
    window.history.replaceState({}, document.title, clean_uri);
}     