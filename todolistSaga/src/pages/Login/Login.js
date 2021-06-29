import React, { useState } from 'react'

export default function Login(props) {
    const [userLogin, setUserLogin] = useState({ userName: '', passWord: '' })
    console.log(userLogin)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserLogin({
            ...userLogin,[name]:value
        })  
    }
    const handleLogin=(event)=>{
        event.preventDefault();
        if(userLogin.userName==='cyberlearn'&&userLogin.passWord==='cyberlearn'){
            //thành công thì chuyển về trang trước đó
            //props.history.goBack();
            //chuyển đến trang chỉ định sau  khi xử lý
            //chuyển hướng đến path tương ứng
            //props.history.push('/home')
            //replace thay đổi nội dung
            props.history.replace('/home');
            localStorage.setItem('userLogin',JSON.stringify(userLogin) )
        }else{
            alert('login fail')
            return;
        }
    }
    return (
        <form className='container' onSubmit={handleLogin}>
            <h3 className='display-4'>login</h3>
            <div className='form-group'>
                <p>User name</p>
                <input name='userName' className='form-control' onChange={handleChange} />
            </div>
            <div className='form-group'>
                <p>Password</p>
                <input name='passWord' className='form-control' onChange={handleChange} />
            </div>
            <div className='form-group'>
                <button className='btn btn-success'>Đăng nhập</button>
            </div>
            <prompt when={true} message={(location)=>{
                console.log(location)
                return 'bạn có chắc muốn rời khỏi trang này!'
            }}>

            </prompt>
        </form>
    )
}
