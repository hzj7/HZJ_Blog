import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import { getPost, deletePost } from "../utils/api/posts/index.js";
import { UserContext } from "../context/userContext.jsx";
import moment from 'moment'
import { getHTMLText } from "../utils/tools/getHTMLText.js";
import {message} from 'antd'
const Post = () => {
    const [postDetail, setPostDetail] = useState({});

    const location = useLocation()
    const postId = location.pathname.split("/")[2]
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate()

    useEffect(() => {
        moment.locale('zh-cn');
        getPost({ id: postId }).then(res => {
            if (res?.code === 200) {
                setPostDetail(res?.data)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const handleDelete = () => {
        deletePost(postId).then(res => {
            if (res.code === 200) {
                message.success("删除成功")
                navigate('/')
            }else{
                message.error(res.msg)
            }
        })
    }

    return (
        <div className='single'>
            <div className='content'>
                <img src={`http://localhost:7777/uploads/${postDetail?.post?.img}`}/>
                <div className="user">
                    {
                        postDetail?.author?.protrait
                        &&
                        <img src={postDetail?.author?.protrait} alt=""/>
                    }
                    <div className="info">
                        <div className='username'>{postDetail?.author?.username}</div>
                        <span>{moment(postDetail?.post?.date).fromNow()} 发布</span>
                    </div>
                    {
                        currentUser?.username === postDetail?.author?.username
                        &&
                        <div className='edit'>
                            <Link to={`/write?edit=${postId}`} state={postDetail}>
                                <img src={Edit} alt=""/>
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt=""/>
                        </div>
                    }
                </div>
                <h2>
                    {postDetail?.post?.title}
                </h2>
                {getHTMLText(postDetail?.post?.desc)}
            </div>
            <div className="menu">
                <Menu category={postDetail?.post?.category}/>
            </div>
        </div>
    );
}
export default Post
