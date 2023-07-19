;(($)=>{
   // svg 애니메이션 구현
   // 1. svg 내에 원형 그래프를 가져온다
   const svgBox =$('.svg-box');
   const circle =$('.circle');
   const number =$('.number');
    // 반응형 글자 크기(0.14) = 글자크기 / svgBox 너비
    // 너비 * 0.14 => 반응형 글자크기적용
    number.css({fontSize:svgBox.innerWidth()*0.14+'px'});

    // 원형 svg 길이(원둘레) 구하기 => 반지름 * 3.14
  

    let tot=0; // 원형 전체 둘레
    let percent = 0.9;
    let setId =0;
    let cnt = 0; // 증가값
    let step = 5;
    let percentLength = tot*percent; // 원형 전체 둘레의 98%

    $.each(circle, function(idx,obj){
        tot = obj.getTotalLength() + 7;
        console.log(tot);
        obj.style.strokeDasharray = tot; 
        obj.style.strokeDashoffset = tot;
        percentLength = tot*percent;

        setId=setInterval(function(){
            cnt += step;
            if(cnt > percentLength){
                clearInterval(setId);
            }
            else{ //에니메이션 구현
                $(obj).css({strokeDashoffset:tot-cnt})
                number.html(`${Math.ceil(cnt/tot*100)}%`);
            }

        },10);


    });


})(jQuery);