import React from 'react';
import $ from 'jquery';
import './scss/go_top.scss';

export default function GoTopComponent () {

   
    React.useEffect(()=>{
        let sec3Top = 0;
        let goTop = $('#goTop');
        let gotopBtn = $('.gotop-btn');

        try{
            sec3Top = $('#section3').offset().top;
        }
        catch(e){
            sec3Top=600;
        }
        // 스크롤 이벤트
        $(window).scroll(function(){
            if($(window).scrollTop()>=sec3Top){
                goTop.stop().animate({bottom:'25px'});
            }
            else{
                goTop.stop().animate({bottom:'-60px'});
            }
        });
      
        // Smooth Scrolling
        gotopBtn.on({
            click(){
                $('html,body').stop().animate({scrollTop:0},600);
            }
        })

    },[]);


    return (
        <div id='goTop'>
            <a href="#wrap" className='gotop-btn'>
                <img src="./images/intro/다운로드1.png" alt="" />
            </a>
            
        </div>
    );
};

