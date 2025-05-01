import API from './api'

export {
    login,
    postNewUser,
    getAllPosts,
    getMyPost,
    deletePost,
    putExistingPost,
    postNewPost,
    getAllUsers, 
    getOneUser,
    putExistingUser
};

//LOGIN
function login(username, password){
    return API.post('/users/login', {
        username: username,
        password:password
    }).then(result => result.data)
    .catch(error => error);
}

//USERS
function getAllUsers() {
    return API.get('/users/all')
    .then(result => result.data)
    .catch(error => error);
}

function getOneUser(iduser) {
    const token = sessionStorage.getItem('token');

    return API.get(`/users/secure/${iduser}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(result => result.data)
    .catch(error => error);
}

function postNewUser(username, password, fullname='', email, role){    
    return API.post('/users', {
        username: username,
        password: password,
        fullname: fullname,
        email: email,
        role: role
    })
    .then(result => result.data)
    .catch(error => error);
}

function putExistingUser(iduser, fullname, email, aboutMe){
    const token = sessionStorage.getItem("token");

    return API.put(`/users/secure/${iduser}`, 
        {fullname, email,aboutMe}, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then(result => result.data)
    .catch(error => error);
}

//POSTS
function getAllPosts() {
    return API.get('/posts/all')
    .then(result=> result.data)
    .catch(error => error);
}

function getMyPost(idpost){
    const token = sessionStorage.getItem('token');

    return API.get(`/posts/secure/${idpost}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    })
    .then(result=> result.data)
    .catch(error => error);
}

function postNewPost(title, description){
    const token = sessionStorage.getItem('token');

    return API.post('/posts/secure', {
        title: title, 
        description: description
    },
    {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then(result=> result.data)
    .catch(error => error);
}

function putExistingPost(idpost, title, description){
    const token = sessionStorage.getItem('token');

    return API.put(`/posts/secure/${idpost}`, {
        title: title, 
        description: description
    },
    {
        headers: {
          Authorization: `Bearer ${token}`
        }
    })
    .then(result=> result.data)
    .catch(error => error);
}

function deletePost(idpost){
    const token = sessionStorage.getItem('token');

    return API.delete(`/posts/secure/${idpost}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    })
    .then(result=> result.data)
    .catch(error => error);
}