import React, { useContext } from 'react'
import Logo from '../img/logo.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";

const Navbar = () => {
    const { currentUser, logout } = useContext(UserContext);
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className='navbar'>
            <div className='container'>
                <div className="logo">
                    <Link to='/'>
                        <img src={Logo} alt=""/>
                    </Link>
                </div>
                <div className="links">
                    <Link className='link' to='/?category=life'>
                        <h6 style={location.search === '?category=life' ? { color: "#4285d7", fontWeight: "bold" } : {}}>
                            生活
                        </h6>
                    </Link>
                    <Link className='link' to='/?category=article'>
                        <h6 style={location.search === '?category=article' ? { color: "#4285d7", fontWeight: "bold" } : {}} z>
                            博客
                        </h6>
                    </Link>
                    <Link className='link' to='/?category=tour'>
                        <h6 style={location.search === '?category=tour' ? { color: "#4285d7", fontWeight: "bold" } : {}}>
                            旅游
                        </h6>
                    </Link>
                    <Link className='link' to='/?category=food'>
                        <h6 style={location.search === '?category=food' ? { color: "#4285d7", fontWeight: "bold" } : {}}>
                            美食
                        </h6>
                    </Link>
                    <Link className='link' to='/?category=other'>
                        <h6 style={location.search === '?category=other' ? { color: "#4285d7", fontWeight: "bold" } : {}}>
                            其他
                        </h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ?
                        <span onClick={logout}>退出登陆</span>
                        :
                        <Link to='/login'>请登录</Link>
                    }
                    <span className='write' onClick={() => {navigate('/write')}}>
                              <span className='link'>写文章</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Navbar
