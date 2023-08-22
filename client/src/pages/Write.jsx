import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFile } from "../utils/api/files/index.js";
import { useLocation, useNavigate } from "react-router-dom";
import { addPost, editPost } from "../utils/api/posts/index.js";
import { message } from "antd";

const Write = () => {

    const state = useLocation().state
    const navigate = useNavigate()

    const [value, setValue] = useState(state?.post?.desc || '');
    const [title, setTitle] = useState(state?.post?.title || '');
    const [file, setFile] = useState([]);
    const [category, setCategory] = useState(state?.post?.category || 'life');

    const upload = async () => {
        let formData = new FormData();
        formData.append("file", file.length > 0 ? file[0] : '')
        return await uploadFile(formData)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        let fileUrl;
        if (file.length > 0) {
            await upload().then(res => {
                fileUrl = res?.data
            })
        }
        if (state) {
            let params = {
                _id: state?.post?._id,
                title,
                desc: value,
                img: fileUrl || state?.post?.img,
                category: category,
            }
            editPost(state.post._id, params).then(res => {
                if (res?.code === 200) {
                    message.success(res?.msg)
                } else {
                    message.error(res?.msg)
                }
            })
        } else {
            let params = {
                title,
                desc: value,
                img: fileUrl,
                category: category
            }
            addPost(params).then(res => {
                if (res?.code === 200) {
                    message.success(res?.msg)
                } else {
                    message.error(res?.msg)
                }
            })
        }
        navigate('/')
    }

    return (
        <div className='add'>
            <div className="content">
                <input type='text' value={title} placeholder='请输入标题' onChange={e => setTitle(e.target.value)}/>
                <div className="editContainer">
                    <ReactQuill className='editor' theme="snow" value={value} onChange={setValue}/>
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>发布文章</h1>
                    <span>
                        <b>状态：</b>{state ? '已发布' : '草稿'}
                    </span>
                    <span>
                        <b>可见：</b>所有人可见
                    </span>
                    <input type='file' id='file' name='file' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files)}/>
                    <label className='file' htmlFor='file'>{file[0]?.name || '选择图片'}</label>
                    <div className="buttons">
                        <button onClick={handleSubmit}>发布</button>
                    </div>
                </div>
                <div className="item">
                    <h1>分类</h1>
                    <div className="category">
                        <input type='radio' checked={category === 'life'} name='category' value='life' id='life' onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor='life'>生活</label>
                    </div>
                    <div className="category">
                        <input type='radio' checked={category === 'article'} name='category' value='article' id='article' onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor='article'>博客</label>
                    </div>
                    <div className="category">
                        <input type='radio' checked={category === 'tour'} name='category' value='tour' id='tour' onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor='tour'>旅游</label>
                    </div>
                    <div className="category">
                        <input type='radio' checked={category === 'food'} name='category' value='food' id='food' onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor='food'>美食</label>
                    </div>
                    <div className="category">
                        <input type='radio' checked={category === 'other'} name='category' value='other' id='other' onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor='other'>其他</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Write
