import React, { useState, useEffect } from "react";
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from 'reactstrap';
import { putExistingPost } from '../../utils/apicalls';

function EditPost ({post, updateMyPost}){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const handleTitleChange = event => {
        setTitle(event.target.value);
    }
    
    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }

    const editPost = () => {
        putExistingPost(post._id, title, description)
        .then(res => checkPUTPost(res));
    }

    const checkPUTPost = res => {
        if(res === "OK"){
            updateMyPost();
        }else{
            console.error("ERROR");
        }
    }

    // useEffect(() => {
    //     setTitle(post.title);
    //     setDescription(post.description);
    // }, [title, description, post]);

    return(
        <div>
            <Card body>
                <CardTitle tag="h5">Editar post</CardTitle>
                <Form>
                    <FormGroup>
                        <Label for="aTitulo">Título</Label>
                        <Input type="text" name="title" id="aTitulo" placeholder="Introduce un título" value={title} onChange={handleTitleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="aDescripcion">Descripción</Label>
                        <Input style={{height: '200px'}} type="textarea" name="descripcion" id="aDescripcion" placeholder="Introduce una descripción" value={description} onChange={handleDescriptionChange}/>
                    </FormGroup>
                    <Button onClick={editPost}>Actualizar</Button>
                </Form>
            </Card>
        </div>
    );
}

export default EditPost;