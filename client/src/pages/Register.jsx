import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { register as registerApi } from '../utils/api/users/index.js'
import { message } from "antd";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        email: ""
    });

    const navigate = useNavigate()
    const handleChange = e => {
        setInputs(previous => ({ ...previous, [e.target.name]: e.target.value }))
    }
    const handleSubmit = e => {
        e.preventDefault()
        registerApi(inputs).then(res => {
            if (res.code === 200) {
                navigate("/login")
                message.success("注册成功")
            } else {
                message.error(res?.msg)
            }
        })
    }

    return (
        <div className='auth'>
            <div className="background"></div>
            <h1>注册</h1>
            <form>
                <input required type='username' placeholder='请输入用户名' name='username' onChange={handleChange}/>
                <input required type='email' placeholder='请输入邮箱' name='email' onChange={handleChange}/>
                <input required type='password' placeholder='请输入密码' name='password' onChange={handleChange}/>
                <button onClick={handleSubmit}>注册</button>
                <span>已有账号？<Link to={'/login'}>前往登陆</Link></span>
            </form>
        </div>
    )
}
export default Register
