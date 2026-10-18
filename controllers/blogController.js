let blogs = [
  {
    userId: 1,
    id: "1",
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: "2",
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: "3",
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: "4",
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: "5",
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    userId: 1,
    id: "6",
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    userId: 1,
    id: "7",
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
  {
    userId: 1,
    id: "8",
    title: "dolorem dolore est ipsam",
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
  },
  {
    userId: 1,
    id: "9",
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
  },
  {
    userId: 1,
    id: "10",
    title: "optio molestias id quia eum",
    body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
  },
  {
    userId: 2,
    id: "11",
    title: "et ea vero quia laudantium autem",
    body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
  },
  {
    userId: 2,
    id: "12",
    title: "in quibusdam tempore odit est dolorem",
    body: "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
  },
];

const getBlogs = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      body: blogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error while fetching blogs",
      error: err.message,
    });
  }
};

const getBlogById = (req, res) => {
  const blogId = req.params.id;
  const blog = blogs.find((item) => item.id === blogId);

  try {
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `port not found with ${blogId}`,
      });
    }
    res.status(200).json({
      success: true,
      body: blog,
      message: `blog data found with id ${blogId}`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err.message,
    });
  }
};

const createBlog = (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "title and body are required fields",
      });
    }
    const newBlog = {
      title,
      body,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: null,
    };
    blogs.unshift(newBlog);
    res.status(201).json({
      message: "blog created successfully",
      body: newBlog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "network error",
      error: err.message,
    });
  }
};

const updateBlog = (req, res) => {
  try {
    const updatedId = req.params.id;
    const getIndex = blogs.findIndex((blog) => blog.id === updatedId);
    if (getIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "the blog data is not found",
      });
    }
    const blog = blogs.find((item) => item.id === updatedId);
    const updateObj = {
      ...blog,
      ...req.body,
      id: blog.id,
    };
    blogs[getIndex] = updateObj;
    res.status(200).json({
      success: true,
      message: "blog updated successfully",
      body: updateObj,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "network error",
      error: err.message,
    });
  }
};

const deleteBlog = (req, res) => {
  try {
    const removeId = req.params.id;
    const getIndex = blogs.findIndex((blog) => blog.id === removeId);
    if (getIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `The blog with id ${removeId} is not found`,
      });
    }
    const removeBlog = blogs.splice(getIndex, 1);
    res.status(200).json({
      success: true,
      message: "blog deleted successfully !!!",
      body: removeBlog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "network error",
      error: err.message,
    });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
