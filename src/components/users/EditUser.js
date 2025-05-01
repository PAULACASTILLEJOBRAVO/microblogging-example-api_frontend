import React, { useState, useEffect } from "react";
import { Card, CardTitle, Label, Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Alert } from 'reactstrap';
import { putExistingUser } from '../../utils/apicalls';

function EditPost ({user, updateProfile, setEdit}){

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [aboutMe, setAboutMe] = useState("");

    const [updateProfileMessage, setUpdateProfileMessage] = useState('');
    
    const handleFullnameChange = event => {
        setFullname(event.target.value);
    }

    const handleEmailChange = event => {
        setEmail(event.target.value);
    }

    const handleAboutMeChange = event => {
        setAboutMe(event.target.value);
    }

    const editUser = (user) => {
        putExistingUser(user._id, fullname, email, aboutMe)
        .then(result => checkPUTUser(result))
        .catch(error => checkPUTUser(error));
    }

    const checkPUTUser = data => {
        if(data.message === "Usuario modificado correctamente"){
            setUpdateProfileMessage("Perfil actualizado con éxito");
            setTimeout(() => {
                updateProfile(user._id); 
                setEdit(null); 
            }, 1500);

        }else{
            console.error("ERROR");
        }
    }

    const cancelEditUser = () => {
        setEdit(null);
    }

    useEffect(() => {
        setFullname(user.fullname);
        setEmail(user.email);
        
        if(user.aboutMe){
            setAboutMe(user.aboutMe);
        }
    }, [user]);

    return(
        <div>
            <Modal isOpen="true">
                <Card body>
                    <ModalHeader>
                        <CardTitle tag="h5">Editar usuario</CardTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="aNombreCompleto">Nombre completo</Label>
                                <Input type="text" name="nombreCompleto" id="aNombreCompleto" placeholder="Introduce tu nombre completo" value={fullname} onChange={handleFullnameChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="aEmail">Email</Label>
                                <Input type="text" name="email" id="aEmail" placeholder="Introduce tu correo electrónico" value={email} onChange={handleEmailChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="aSobreMi">Sobre mí</Label>
                                <Input type="text" name="sobreMi" id="aSobreMi" placeholder="Agrega información sobre tí" value={aboutMe} onChange={handleAboutMeChange}/>
                            </FormGroup>
                        </Form>
                        { updateProfileMessage && <Alert color="success">{ updateProfileMessage }</Alert> }
                    </ModalBody>
                    <ModalFooter>
                        <Button color='secondary' onClick={() => cancelEditUser()} >Cancelar</Button>
                        <Button color='warning' onClick={() => editUser(user)}>Actualizar</Button>
                    </ModalFooter>
                </Card>
            </Modal>
        </div>
    );
}

export default EditPost;