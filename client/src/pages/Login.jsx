import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import { message } from "antd";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const { login } = useContext(UserContext);
    const navigate = useNavigate()
    const handleChange = e => {
        setInputs(previous => ({ ...previous, [e.target.name]: e.target.value }))
    }
    const handleSubmit = e => {
        e.preventDefault()
        login(inputs).then(res => {
            if (res.code === 200) {
                message.success("登录成功")
                navigate('/')
            }
        })
    }

    return (
        <div className='auth'>
            <div className="background"></div>
            <h1>登录</h1>
            <form>
                <input required type='username' placeholder='请输入用户名' name='username' onChange={handleChange}/>
                <input required type='password' placeholder='请输入密码' name='password' onChange={handleChange}/>
                <button onClick={handleSubmit}>登录</button>
                <span>尚未拥有账户？<Link to={'/register'}>前往注册</Link></span>
            </form>
        </div>
    )
}
export default Login
