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
};

function login(username, password){
    return API.post('/users/signin', {
        username: username,
        password:password
    }).then(result => result.data)
    .catch(err => console.log(err));
}

function postNewUser(username, password, fullname, email, role){
    return API.post('/users', {
        username: username,
        password: password,
        fullname: fullname,
        email: email,
        role: role
    })
    .then(result => result.data)
    .catch(err => console.log(err));
}

function getAllPosts() {
    return API.get('/posts').then(res => res.data);
}

function getMyPost(iduser){
    return API.get('/posts/all/'+iduser).then(res => res.data);
}

function deletePost(idpost){
    return API.delete('/posts/'+idpost).then(res => res.data);
}

function putExistingPost(idpost, title, description){
    return API.put('/posts/'+idpost, {
        title: title, 
        description: description
    }).then(res => res.data);
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

function getAllUsers() {
    return API.get('/users').then(res => res.data);
}