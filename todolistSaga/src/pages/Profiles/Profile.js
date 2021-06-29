import React from 'react'
import { Redirect } from 'react-router';

export default function Profile(props) {
    if(localStorage.getItem('userLogin')){
        return (
            <div>
                profile
            </div>
        )
    }else{
        alert('vui lòng đăng nhập để vào trang này');
        return <Redirect to='/login' />
    }
  
}
