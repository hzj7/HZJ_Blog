import React, { useEffect, useState } from 'react'
import { getAllPosts } from "../utils/api/posts/index.js";

const Menu = (props) => {
    const { category } = props

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts({ category }).then(res => {
            if (res?.code === 200) {
                setPosts(res?.data)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
        <div className='menu'>
            <h1>其他文章</h1>
            {
                posts.map(post => (
                    <div className="post" key={post.id}>
                        <img src={`http://localhost:7777/uploads/${post.img}`}/>
                        <h2>{post.title}</h2>
                        <button>前往了解</button>
                    </div>
                ))
            }
        </div>
    )
}
export default Menu
