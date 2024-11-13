import React, {useState} from 'react';
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from 'reactstrap';
import { postNewPost } from '../../utils/apicalls';

export default function AddPost ({updateMyPost}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = event => {
        setTitle(event.target.value);
    }
    
    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }
    
    const addPost = () => {
        postNewPost(sessionStorage.getItem('iduser'), title, description, sessionStorage.getItem('email'))
        .then(res => checkPOSTNewPost(res));
    }

    const checkPOSTNewPost = res => {

        if(res === "OK"){
            updateMyPost();
        }else{
            console.error("ERROR");
        }
    }

    return(
        <div>
            <Card body>
                <CardTitle tag="h5">Añadir un nuevo post</CardTitle>
                <Form>
                    <FormGroup>
                        <Label for="aTitulo">Título</Label>
                        <Input type="text" name="title" id="aTitulo" placeholder="Introduce un título" value={title} onChange={handleTitleChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="aDescripcion">Descripción</Label>
                        <Input style={{height: '200px'}} type="textarea" name="descripcion" id="aDescripcion" placeholder="Introduce una descripción" value={description} onChange={handleDescriptionChange}/>
                    </FormGroup>
                    <Button onClick={addPost}>Añadir</Button>
                </Form>
            </Card>
        </div>
    );
}
