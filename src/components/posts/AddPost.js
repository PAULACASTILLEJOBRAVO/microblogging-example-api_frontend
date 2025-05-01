import React, {useState} from 'react';
import { Card, CardTitle, Label, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import { postNewPost } from '../../utils/apicalls';

export default function AddPost ({updateMyPost}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [signupMessage, setSignupMessage] = useState('');
    const [messageColor, setMessageColor] = useState('danger');

    const handleTitleChange = event => {
        setTitle(event.target.value);
    }
    
    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }
    
    const addPost = () => {
        postNewPost(title, description)
        .then(result => checkPOSTNewPost(result))
        .catch(error => checkPOSTNewPost(error));
    }

    const checkPOSTNewPost = data => {

        if(data.message === 'Blog creado correctamente'){
            updateMyPost();
        }else{
            if (data.response) {
                const errorMessage = data.response.data.message || "Ha ocurrido un error desconocido. Inténtalo nuevamente.";
                const detailedError = data.response.data.error || "";
                setSignupMessage(errorMessage, detailedError);
                setMessageColor("danger");
            } else {
                setSignupMessage("¡Error en la solicitud, intenta más tarde!");
                setMessageColor("danger");
            }
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
                    {signupMessage && <Alert color={messageColor}>{signupMessage}</Alert>}
                    <Button onClick={addPost}>Añadir</Button>
                </Form>
            </Card>
        </div>
    );
}
