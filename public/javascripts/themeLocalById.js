$('#themeEditModal').on('hidden.bs.modal', function () {
    window.location.href = '/myThemeLocal?message=success'
})
if(alert == 'success'){
    console.log(alert)
    let timerInterval
    Swal.fire({
    title: 'รอสักครู่!',
    html: 'กรุณารอสักครู่กำลังอัพเดทข้อมูล ',
    timer: 800,
    timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
            const content = Swal.getHtmlContainer()
            if (content) {
                const b = content.querySelector('b')
                if (b) {
                b.textContent = Swal.getTimerLeft()
                }
            }
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    })
}
$(document).ready(function(){
    $("#searchThemeOne").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#searchBody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
searchTheme=()=>{
    $.get( "/myFindTheme", function(data) {
        //console.log(data)
        $('#searchBody').html('');
        $('#searchThemeOne').val('');
        let searchBody = document.getElementById("searchBody");
        $.each(data, function(key, value) {
            //console.log(value)
            let trItem = document.createElement('tr');
            let tdItem1 = document.createElement('td');
            let tdItem2 = document.createElement('td');
            let tdItem3 = document.createElement('td');
            let tdItem4 = document.createElement('td');
            tdItem1.innerHTML += `<p>${value.subject}</p>`
            tdItem2.innerHTML += `${value.user.firstname + ' (' +value.user.nickname +')'}`
            tdItem3.innerHTML += `${value.department.name}`
            tdItem4.innerHTML += `<a class="btn btn-primary "onClick="goChat('${value._id}')"">เข้าร่วม</a>`
            tdItem1.classList.add("searchSubject");
            tdItem2.classList.add("searchName");
            tdItem3.classList.add("searchDeapart");
            tdItem4.classList.add("text-center");
            trItem.append(tdItem1,tdItem2,tdItem3,tdItem4);
            searchBody.appendChild(trItem);
        });
        $("#searchThemeModal").modal();
    })
}
//get find theme
$( document ).ready(function() {
    var div = document.getElementById('findAll');
    $.get( "/myFindTheme", function( data ) {
        //console.log(data)
        $.each(data, function(key, value) {
            var obj = {theme_id : value._id}
            $.ajax({
                url: 'findThemeImage',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success: function(resultImage){  
                    //console.log(resultImage);
                    //console.log(value);
                    var date = moment(value.updated).local().format('วันที่ DD-MM-YYYY เวลา HH:mm:ss');
                    var nickname = value.user.nickname;
                    if(nickname == ''){
                        nickname = 'ไม่ระบุ'
                    }
                    if(resultImage.length == 0){
                        div.innerHTML += `
                        <div class="row  pl-5 mb-3 allTheme">
                        
                            <div class="col-lg-12 col-md-12 col-sm-12 ">
                            <div >
                                <h4 class="font-weight-bold mt-2 showSubject">${value.subject}</h4>
                                <img src="/upload/${value.user.image}" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">
                                <small class="font-weight-bold">โดย ${value.user.firstname + ' ' + value.user.lastname +
                            ' ('+nickname +') '+ ' ' + 'เเผนก' + ' ' +  value.department.name + ' ' + date}</small>
                                <p class="hiddenText">
                                    ${value.material}
                                </p>
                            </div>
                            <div class="d-flex justify-content-end align-self-end">
                                    <div class="d-inline btn btn-primary mr-2 mb-2 " onClick="goChat('${value._id}')">เข้าร่วมกระทู้</div>
                                    <div class="d-inline btn btn-secondary mr-2 mb-2" data-toggle="modal" data-target="#themeEditModal" onClick="editTheme('${value._id}')">เเก้ไขกระทู้</div>
                                    <div class="d-inline btn btn-danger mr-2 mb-2" onClick="deleteTheme('${value._id}')">ลบกระทู้นี้</div>
                            </div>
                            </div>
                        </div>
                        `
                    }else{                           
                        div.innerHTML +=`
                        <div class="row mt-3 allTheme">
                            <div class="col-lg-3 col-md-5 bgImage">
                                <img id="showThemeImage${key}" onclick="largeImage('${resultImage[0].name}')" class="showThemeImage" src="/upload/${resultImage[0].name}" alt="">
                            </div>
                            <div class="col-lg-9 col-md-7 mt-2">
                                <div>
                                    <h4 class="font-weight-bold showSubject ">${value.subject}</h4>
                                    <img src="/upload/${value.user.image}" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">
                                    <small class="font-weight-bold">โดย ${value.user.firstname + ' ' + value.user.lastname +
                            ' ('+nickname +') '+ ' ' + 'เเผนก' + ' ' +  value.department.name + ' ' + date}</small>
                                    <p class="hiddenText">
                                        ${value.material}
                                    </p>
                                </div>
                                <div class="d-flex justify-content-end align-self-end">
                                        <div class="d-inline btn btn-primary mr-2 mb-2 " onClick="goChat('${value._id}')">เข้าร่วมกระทู้</div>
                                        <div class="d-inline btn btn-secondary mr-2 mb-2"data-toggle="modal" data-target="#themeEditModal" onClick="editTheme('${value._id}')">เเก้ไขกระทู้</div>
                                        <div class="d-inline btn btn-danger mr-2 mb-2 " onClick="deleteTheme('${value._id}')">ลบกระทู้นี้</div>
                                </div>
                            </div>
                            
                        </div>
                        
                        `
                        $.each( resultImage, function( loop, miniImage ) {
                            var findMiniImage = document.getElementById('findMiniImage');
                            div.innerHTML +=`
                                <div class="d-inline-block ml-2 mt-1 mb-1 mbImage " onclick="changeImage('${miniImage.name}','${key}')">
                                    <img class="miniImage" src="/upload/${miniImage.name}" alt="">
                                </div>  
                            `
                            
                        });

                    }
                }
            });
        });
    });

})
goChat=(idTheme)=>{
    window.location.href = '/chat?idTheme='+idTheme
}
editTheme=(idTheme)=>{
    $("#showImage").html("");
    //console.log(idTheme)
    var obj = {
        _id : idTheme
    }
    $.ajax({
        url: '/myInfoTheme',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        success: function(result){
            //console.log(result.theme[0]._id);
            $('#material').val(result.theme[0].material);
            $('#subject').val(result.theme[0].subject);
            if(result.themeImage.length !== 0){
                $.each(result.themeImage, function(key, themeImage) {
                    var div = document.getElementById('showImage');
                    var loop = 'loop'+key
                    //console.log(loop)
                    div.innerHTML += `
                            <div class="col-lg-6 col-md-6 col-sm-12 mb-2" id="${loop}">
                                <div class="image-area">
                                    <img src="/upload/${themeImage.name}"  alt="Preview">
                                    <a class="remove-image" onclick="deleteImage('${themeImage._id}','${themeImage.name}','${loop}')" style="display: inline;">&#215;</a>
                                </div>
                            </div>  `; 
                    //console.log(item.name);
                });
            }
            $("#editTheme").on("click", function(){
            var obj = {
                material : $('#material').val(),
                subject :  $('#subject').val(),
                _id : result.theme[0]._id
            }  
            $.ajax({
                url: '/myEditTheme',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                    success: function (data) { 
                        //console.log(data)
                          Swal.fire({
                            title: 'สำเร็จ!',
                            text: "เเก้ไขข้อมูลสำเร็จ!",
                            icon: 'success',
                            confirmButtonColor: '#dc143c',
                            confirmButtonText: 'ตกลง'
                        })
                    }
                })
            });
            $("#saveImage").on("click", function(){
                var div = document.getElementById('showImage');
                $("#showImage").html("");
                var file = $("#image")[0].files[0];
                console.log(file)
                var formdata = new FormData();
                formdata.append("image", file);
                $.ajax({
                    type: 'post',
                    enctype: 'multipart/form-data',
                    url: '/insertThemeImage?id='+result.theme[0]._id,
                    data: formdata,
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (data) {   
                        $.each(data, function(key, item) {
                            var loop = 'loop'+key
                            //console.log(loop)
                            div.innerHTML += `
                                    <div class="col-lg-6 col-md-6 col-sm-12 mb-2" id="${loop}">
                                        <div class="image-area">
                                            <img src="/upload/${item.name}"  alt="Preview">
                                            <a class="remove-image" onclick="deleteImage('${item._id}','${item.name}','${loop}')" style="display: inline;">&#215;</a>
                                        </div>
                                    </div>  `; 
                            //console.log(item.name);
                        });
                        $('#image').val('');
                    }
                });
            });

        }
    })
}
deleteImage=(id,image,loop)=>{
//console.log(id)
//console.log(image)
    var obj = {
        _id : id,
        name : image
    }
    $.ajax({
        url: '/deleteThemeImage',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        success: function(data){  
        if(data == "success"){
            $(`#${loop}`).hide();
        }
        }
    });
}
deleteTheme=(idTheme)=>{
    //console.log(idTheme);
    var obj = {
        _id : idTheme
    }
    Swal.fire({
        title: 'ต้องการลบหรอไม่?',
        text: "ถ้าคุณต้องการยกเลิกกรุณากดตกลงเพื่อยกเลิก!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
        }).then((result) => {
        if (result.isConfirmed == true) {
            $.ajax({
                url: '/DeleteTheme',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success: function(resultImage){
                    if(resultImage.message == 'deleted'){
                        Swal.fire({
                            title: 'สำเร็จ!',
                            text: "ลบมูลสำเร็จ!",
                            icon: 'success',
                            confirmButtonColor: '#dc143c',
                            confirmButtonText: 'ตกลง'
                        }).then((result)=>{
                            if (result) {
                                location.reload(); 
                            }
                        })
                    }
                }
            })
        }
    }) 
   
}
changeImage=(image,key)=>{
    $(`#showThemeImage${key}`).attr("src",`/upload/${image}`);
    $(`#showThemeImage${key}`).click(function(){ 
        $('#largeImage').attr('src',`/upload/${image}`);
        $('#ShowLargeImage').modal()
    });
}
largeImage=(image)=>{
    //console.log(image)
    $('#largeImage').attr('src',`/upload/${image}`);
    $('#ShowLargeImage').modal()
}

//clear url query
if (uri.indexOf("?") > 0) {
var clean_uri = uri.substring(0, uri.indexOf("?"));
window.history.replaceState({}, document.title, clean_uri);
}