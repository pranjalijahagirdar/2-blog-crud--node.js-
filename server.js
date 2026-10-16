const cl=console.log;

let blogs = [
    {
    "userId": 1,
    "id": "1",
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": "2",
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": "3",
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": 1,
    "id": "4",
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    "userId": 1,
    "id": "5",
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  },
  {
    "userId": 1,
    "id": "6",
    "title": "dolorem eum magni eos aperiam quia",
    "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
  },
  {
    "userId": 1,
    "id": "7",
    "title": "magnam facilis autem",
    "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
  },
  {
    "userId": 1,
    "id": "8",
    "title": "dolorem dolore est ipsam",
    "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
  },
  {
    "userId": 1,
    "id": "9",
    "title": "nesciunt iure omnis dolorem tempora et accusantium",
    "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
  },
  {
    "userId": 1,
    "id": "10",
    "title": "optio molestias id quia eum",
    "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
  },
  {
    "userId": 2,
    "id": "11",
    "title": "et ea vero quia laudantium autem",
    "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
  },
  {
    "userId": 2,
    "id": "12",
    "title": "in quibusdam tempore odit est dolorem",
    "body": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
  },
]

const PORT = 3000;
const express = require('express');
const app = express()
app.use(express.json())

//get all : BASE_URL/API/BLOGS and GET

app.get('/api/blogs',(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            body:blogs
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'error while fetching blogs',
            error:err.message
        })
    }
})

//get single blog 

app.get('/api/blogs/:id',(req,res)=>{
    let blogId = req.params.id;
    let blog = blogs.find(j=>j.id === blogId)
    try{
        if(!blog){
            return res.status(404).json({
                success:false,
                message:`port not found with ${blogId}`
            });
        }
        res.status(200).json({
            success:true,
            body:blog,
            message:`blog data found with id ${blogId}`,
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'something went wrong',
            error:err.message,
        })
    }
})

//create blog

app.post('/api/blogs', (req,res)=>{
    try{
        let {title, body}=req.body;
        if(!title || !body){
            return res.status(400).json({
                success:false,
                message:'title and body are required fields'
            })
        }
        let newBlog={
            title:title,
            body:body,
            id:Date.now().toString(),
            createdAt:Date.now(),
            updatedAt:null,
        }
        blogs.unshift(newBlog)
        res.status(201).json({
            message:'blog created successfully',
            body:newBlog,
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'network error',
            error:err.message
        })
    }
})

//update blog

app.patch('/api/blogs/:id',(req,res)=>{
    try{
        let updatedId = req.params.id;
        let getIndex = blogs.findIndex(u=>u.id === updatedId)
        if(getIndex === -1){
            return res.status(404).json({
                success:false,
                message:'the blog data is not found'
            })
        }
        let obj = blogs.find(d=>d.id === updatedId)
        let updateObj={
            ...obj,
            ...req.body,
            id:obj.id
        }
        blogs[getIndex]=updateObj
        res.status(200).json({
            success:true,
            message:'blog updated successfully',
            body:updateObj
        })
    }catch(err){
        res.status(500).json({
            success:true,
            message:'network error',
            error:err.message
        })
    }
})

//delete blog

app.delete('/api/blogs/:id',(req,res)=>{
    try{
        let removeId = req.params.id;
        let getIndex = blogs.findIndex(a=>a.id === removeId)
        if(getIndex === -1){
            return res.status(404).json({
                success:false,
                message:`The blog with id ${removeId} is not found`
            })
        }
        let removeBlog = blogs.splice(getIndex, 1)
        res.status(200).json({
            success:true,
            message:'blog deleted successfully !!!',
            body:removeBlog
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'network error',
            error:err.message
        })
    }
})
app.listen(PORT,()=>{
    cl(`Server is running on port ${PORT}`)
})