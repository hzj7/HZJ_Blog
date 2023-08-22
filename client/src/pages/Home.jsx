import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPosts } from "../utils/api/posts/index.js";
import { UrlParamsFilter } from "../utils/tools/urlParamsFilter.js";
import { getHTMLText } from "../utils/tools/getHTMLText.js";

const Home = () => {
    const [posts, setPosts] = useState([]);

    let location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        let params = UrlParamsFilter(location.search)

        getAllPosts({ category: params.category }).then(res => {
            if (res?.code === 200) {
                setPosts(res?.data)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className='home'>
            <div className="posts">
                {posts.map(post => (
                    <div className='post' key={post._id} onClick={() => navigate(`/posts/${post._id}`)}>
                        <div className="img">
                            <img src={`http://localhost:7777/uploads/${post.img}`} alt=""/>
                        </div>
                        <div className="content">
                            <h1>{post.title}</h1>
                            <p>{getHTMLText(post.desc)}</p>
                            <button>进入文章</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home
