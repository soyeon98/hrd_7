
 (function($){ // 내부변수

    const ajaxObj={
        init(){
        this.ajaxFn();
        },
        ajaxFn(){
            // ajax 구현
            // 버튼 클릭 이벤트
            $('.save').on({
                click(e){
                    e.preventDefault();
                    // 폼데이터
                    const formData={
                        subject: $('#subject').val(),
                        content: $('#content').val()
                    }
                     $.ajax({
                         url:'/dataSend', // RequestMapping(value="/dataSend",method=RequestMethod.POST)
                         type:'POST', // SPRING => RequestMethod.POST
                         data:formData, // 뫂데이터 => 입력상자 입력값
                         success(res){
                             console.log('AJAX 성공',res);
                             window.location.href="/view"
                         },
                         error(err){
                             console.log('AJAX 실패',err);
                         }
             });

                }
            })
        }
    }


     ajaxObj.init();

 })(jQuery);



