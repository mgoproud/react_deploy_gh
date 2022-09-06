import { useEffect, useContext, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { format } from "date-fns/esm"
import api from './api/posts'
import DataContext from './context/DataContext'

const EditPost = () => {

    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')

    const { posts, setPosts } = useContext(DataContext)
    const { id } = useParams()
    const post = posts.find((post) => (post.id).toString() === id)  
    const navigate = useNavigate()
    
    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const updatedPost = { id, title: editTitle, datetime, body: editBody }
        try {
          const res = await api.put(`/posts/${id}`, updatedPost)
          setPosts(posts.map((post) => post.id === id ? { ...res.data } : post))
          setEditTitle('')
          setEditBody('')
          navigate('/')
        } catch (err) {
          console.log(`Error: ${err.message}`)
        }
      }

    useEffect(() => {
    if (post) {
        setEditTitle(post.title)
        setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])

  return (
    <main className='NewPost'>

    {editTitle && 
    <>
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='postTitle'></label>
            <input
            id='postTitle'
            type='text'
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea
            id='postBody'
            required
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            >
            </textarea>
            <button onClick={() => handleEdit(post.id)} type='submit'>Submit</button>
        </form>
    </> 
}
    {!editTitle &&
    <>
        <h2>Post Not Found</h2>
        <p>Well, That's Disappointing</p>
        <p>
            <Link to='/'>Visit Our Homepage</Link>
        </p>
    </>

    }
    </main>

  )
}

export default EditPost