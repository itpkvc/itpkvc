(function connect(){
    var socket = io();
    let user_id = document.querySelector('#user_id');
    let theme_id = document.querySelector('#theme_id');
    let message = document.querySelector('#message');
    let messageBtn = document.querySelector('#messageBtn');
    let messageList = document.querySelector('#message-list');

    $( document ).ready(function() {
        var offset = $('#toBottom').offset().top;
        $('#message-box').animate({
            scrollTop: 1000000000000 ,
            behavior: 'smooth'
        })

        //-----------------------------------------
        socket.emit('findTheme',{theme_id:theme_id.value});  
    });
    socket.on('output', function(data){
        //console.log(data
        if(data.length){
            for(var x = 0;x < data.length;x++){
                // Build out message div
                let listItem = document.createElement('li');
                var date = moment(data[x].updated).local().format('DD/MM/YYYY เวลา HH:mm')
                listItem.innerHTML += `    
                <img src="/upload/${data[x].user.image}" id="messageImage">
                ${data[x].user.firstname}  (${data[x].user.nickname})
                : ${data[x].message + ' ' }
                <br>
                <small class="text-secondary">${date}</small>
                `
                listItem.classList.add('list-group-item');
                messageList.appendChild(listItem) 
            }
        }
    })
    message.addEventListener('keyup',e=>{
        if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("messageBtn").click();
        }
    })
    messageBtn.addEventListener('click', e => {
        socket.emit('new_message', { 
            message: message.value , 
            user_id : user_id.value,
            theme_id : theme_id.value
        })
        var offset = $('#toBottom').offset().top;
        $('#message-box').animate({
            scrollTop: 1000000000000 ,
            behavior: 'smooth'
        })
        message.value = ''
    })
    let info =  document.getElementById('info');
   ;
    message.addEventListener('keypress', e => {
        socket.emit('typing')
    })

    socket.on('typing', data => {
     
        info.innerHTML = " กำลังพิมพ์........"
        setTimeout(() => { info.textContent = ''}, 5000)
    })

})();

 //get find theme
 $( document ).ready(function(){
    obj = {
        theme_id : theme_id1
    }
    var div = document.getElementById('findAll')
    $.ajax({
        url: '/themForChat',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        success: function(result){
            var theme = result.theme[0]
            var themeImage = result.themeImage
            //console.log(theme);
            //console.log(themeImage);
            var date = moment(theme.updated).local().format('วันที่ DD-MM-YYYY เวลา HH:mm:ss');
            var nickname = theme.user.nickname;
            if(nickname == ''){
                nickname = 'ไม่ระบุ'
            }
            if(themeImage.length == 0){
                div.innerHTML += `
                    <div class="row  p-3 mt-3 cardChat ">
                        <div class="col-lg-12 col-md-12 col-sm-12 ">
                            <div >
                                <h4 class="font-weight-bold mt-5 showSubject">${theme.subject}</h4>
                                <small class="font-weight-bold">โดย ${theme.user.firstname + ' ' + theme.user.lastname +
                                ' ('+nickname +') '+ ' ' + 'เเผนก' + ' ' +  theme.department.name + ' ' + date}</small>
                                <p class="hiddenTextChat">
                                    ${theme.material}
                                </p>
                            </div>
                            <div class="d-flex justify-content-end align-self-end">
                                <div class="d-inline btn btn-primary mr-2 mb-2 mr-4 "onclick="readMore('${theme.material}')">อ่านเพิ่มเติม</div>
                            </div>
                        </div>
                    </div>
                   
                        `
            }else{
                div.innerHTML +=`
                    <div class="row mt-3 allTheme ">
                        <div class="col-lg-12 col-md-12 ">
                            <img id="showThemeImage" onclick="largeImage('${themeImage[0].name}')" class="showThemeImageChat" src="/upload/${themeImage[0].name}" alt="">
                        </div>
                        <div class="col-lg-12 col-md-12 mt-2">
                            <div>
                                <h4 class="font-weight-bold showSubject">${theme.subject}</h4>
                                <small class="font-weight-bold">โดย ${theme.user.firstname + ' ' + theme.user.lastname +
                                ' ('+nickname +') '+ ' ' + 'เเผนก' + ' ' +  theme.department.name + ' ' + date}</small>
                                <p class="hiddenTextChat">
                                    ${theme.material}
                                </p>
                            </div>
                            <div class="d-flex justify-content-end align-self-end">
                                <div class="d-inline btn btn-primary mr-2 mb-2 " onclick="readMore('${theme.material}')" >อ่านเพิ่มเติม</div>
                            </div>
                        </div>
                    </div>
                `
                $.each( themeImage, function( loop, miniImage ) {
                    var findMiniImage = document.getElementById('findMiniImage');
                    div.innerHTML +=`
                        <div class="d-inline-block ml-2 mt-1 mb-1 mbImage " onclick="changeImage('${miniImage.name}')">
                            <img class="miniImage" src="/upload/${miniImage.name}" alt="">
                        </div>  
                    `
                    
                });
            }
        }
    })
})
readMore=(material)=>{
    //console.log(material)
    $('#readMore').html("")
    var  readMore = document.getElementById('readMore');
    readMore.innerHTML += material;
    $('#readMoreModal').modal();
}
changeImage=(image)=>{
    $(`#showThemeImage`).attr("src",`/upload/${image}`);
    $(`#showThemeImage`).click(function(){ 
        $('#largeImage').attr('src',`/upload/${image}`);
        $('#ShowLargeImage').modal()
    });
}
largeImage=(image)=>{
    //console.log(image)
    $('#largeImage').attr('src',`/upload/${image}`);
    $('#ShowLargeImage').modal()
}