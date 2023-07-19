import React from 'react';
import './scss/section-link-image.scss';
import axios from 'axios';

export default function Section6Component  ()  {

    const [state,setState] = React.useState({
        이미지:''
    });

    const getDataApi=()=>{
        axios({
            url:'./data/intro_page/section_link_img.json',
            method:'get'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    이미지:res.data.섹션6
                })
            }
        })
        .catch((err)=>{
            console.log(`AXIOS ERROR ${err}`);
        })
    }
    React.useEffect(()=>{
        getDataApi();
    },[state.이미지])

    return (
        <section id="section6" className='section-link-image'>
        <div className="container">
            <div className="gap">
                <div className="title hide"><h2>섹션탑베너</h2></div>
                <div className="content">
                    <a href="!#"><img src={`./images/intro/${state.이미지}`} alt="" /></a>
                </div>
            </div>
        </div>
    </section>
    );
};

