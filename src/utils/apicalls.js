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
    return API.post('/users/signin', {
        username: username,
        password:password
    }).then(result => result.data)
    .catch(error => console.log(error));
}

//USERS
function getAllUsers() {
    return API.get('/users/all').then(res => res.data);
}

function getOneUser(iduser) {
    const token = localStorage.getItem("token");

    return API.get('/users/secure/'+iduser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.data);
}

function postNewUser(username, password, fullname, email, role){
    const token = localStorage.getItem("token");
    
    return API.post('/users/secure', {
        headers: {
            Authorization: `Bearer ${token}`  
        },
        username: username,
        password: password,
        fullname: fullname,
        email: email,
        role: role
    })
    .then(result => result.data)
    .catch(err => console.log(err));
}

function putExistingUser(iduser, fullname, email){
    const token = sessionStorage.getItem("token");

    return API.put('/users/secure/'+iduser, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        fullname: fullname, 
        email: email
    }).then(res => res.data);
}

//POSTS
function getAllPosts() {
    return API.get('/posts/all').then(res => res.data);
}

function getMyPost(iduser){
    return API.get('/posts/'+iduser).then(res => res.data);
}

function postNewPost(iduser, title, description, email){
    return API.post('/posts', {
        user: iduser,
        title: title, 
        description: description, 
        email: email
    }).then(res => res.data)
    .catch(err => console.log(err));
}

function putExistingPost(idpost, title, description){
    return API.put('/posts/'+idpost, {
        title: title, 
        description: description
    }).then(res => res.data);
}

function deletePost(idpost){
    return API.delete('/posts/'+idpost).then(res => res.data);
}