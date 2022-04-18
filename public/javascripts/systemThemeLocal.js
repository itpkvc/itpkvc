//search
$(document).ready(function(){
    $("#searchThemeOne").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#searchBody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
searchTheme=()=>{
    $.post( "/findTheme", function(data) {
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
$( document ).ready(function() {
    findTheme();
    $( "#auto_s" ).click(function() { 
        var auto_p = $(".tags").val()  
        findTheme($(".tags").val() );
    });

}) 
function btn_auto(auto_p){
    //console.log(auto_p)
    findTheme(auto_p)
}       
//get find theme
function findTheme(auto_p){
    $.post( "/findTheme",{auto : auto_p}, function( data ) {
        //console.log(data)
         var divHead = document.getElementById('findAll');
         divHead.innerHTML = ''
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
                        let row = document.createElement("div");
                        let col = document.createElement("div");
                        //for col
                        let div1 = document.createElement("div");
                        let div2 = document.createElement("div");
                        //add class
                        row.classList.add("row","pl-5","mb-3","allTheme");
                        col.classList.add("col-lg-12","col-md-12","col-sm-12");
                        div2.classList.add("d-flex","justify-content-end","align-self-end");
                        //for div 1
                        let header = document.createElement("p");
                        let small = document.createElement("small");
                        let paragraph = document.createElement("p")
                        header.classList.add("h4","font-weight-bold","mt-2","showSubject");
                        small.classList.add("font-weight-bold");
                        paragraph.classList.add("hiddenText");
                        header.innerHTML += `${value.subject}`
                        small.innerHTML += `<img src="/upload/${value.user.image}" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">`
                        small.innerHTML += `${'  ' +value.user.firstname + ' ' + value.user.lastname + ' '}`
                        small.innerHTML += `(${value.user.nickname + ' ' }) เเผนก ${value.department.name}`
                        small.innerHTML += `${date + ' '}  <span class="bg-warning">#${ value.auto}</span>`
                        paragraph.innerHTML += value.material
                        div1.append(header,small,paragraph)
                        //for div 2
                        div2.innerHTML += `<div class="d-inline btn btn-primary mr-2 mb-2" onClick="goChat('${value._id}')">เข้าร่วมกระทู้</div>`
                        div2.innerHTML += `<div class="d-inline btn btn-danger mr-2 mb-2" onClick="deleteTheme('${value._id}')">ลบกระทู้นี้</div>`
                        //append
                        col.append(div1,div2);
                        row.appendChild(col);
                        divHead.appendChild(row);
                    }else{                           
                        let row = document.createElement("div");
                        let col1 = document.createElement("div");
                        let col2 = document.createElement("div");
                        //for col2
                        let div2_1 = document.createElement("div");
                        let div2_2 = document.createElement("div");
                        //add class
                        row.classList.add("row","mt-3","allTheme");
                        col1.classList.add("col-lg-3","col-md-5","bgImage");
                        col2.classList.add("col-lg-9","col-md-7","mt-2");
                        div2_2.classList.add("d-flex","justify-content-end","align-self-end");
                        //for col1
                        col1.innerHTML += `<img id="showThemeImage${key}" onclick="largeImage('${resultImage[0].name}')" class="showThemeImage" src="/upload/${resultImage[0].name}" alt="">`

                        //for col2 div 1
                        let header = document.createElement("p");
                        let small = document.createElement("small");
                        let paragraph = document.createElement("p")
                        header.classList.add("h4","font-weight-bold","mt-2","showSubject");
                        small.classList.add("font-weight-bold");
                        paragraph.classList.add("hiddenText");
                        header.innerHTML += `${value.subject}`
                        small.innerHTML += `<img src="/upload/${value.user.image}" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">`
                        small.innerHTML += `${'  ' +value.user.firstname + ' ' + value.user.lastname + ' '}`
                        small.innerHTML += `(${value.user.nickname + ' ' }) เเผนก ${value.department.name}`
                        small.innerHTML += `${date + ' '}  <span class="bg-warning">#${ value.auto}</span>`
                        paragraph.innerHTML += value.material
                        div2_1.append(header,small,paragraph)
                        //for col2 div 2
                        div2_2.innerHTML += `<div class="d-inline btn btn-primary mr-2 mb-2" onClick="goChat('${value._id}')">เข้าร่วมกระทู้</div>`
                        div2_2.innerHTML += `<div class="d-inline btn btn-danger mr-2 mb-2" onClick="deleteTheme('${value._id}')">ลบกระทู้นี้</div>`
                        col2.append (div2_1,div2_2)
                        row.append(col1,col2);
                        divHead.appendChild(row)

                        $.each( resultImage, function( loop, miniImage ) {
                            var findMiniImage = document.getElementById('findMiniImage');
                            divHead.innerHTML +=`
                                <div class="d-inline-block ml-2 mt-1 mb-1 mbImage " onclick="changeImage('${miniImage.name}','${key}')">
                                    <img class="miniImage" src="/upload/${miniImage.name}" alt="">
                                </div>  
                            `
                        })
                    }
                }
            });
        });
    });
}

goChat=(idTheme)=>{
    window.location.href = '/chat?idTheme='+idTheme
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
