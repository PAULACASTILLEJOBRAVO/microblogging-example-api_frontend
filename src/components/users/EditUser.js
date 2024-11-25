import React, { useState, useEffect } from "react";
import { Card, CardTitle, Label, Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { putExistingUser } from '../../utils/apicalls';

function EditPost ({user, updateProfile, setEdit}){

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    
    const handleFullnameChange = event => {
        setFullname(event.target.value);
    }

    const handleEmailChange = event => {
        setEmail(event.target.value);
    }

    const editUser = (user) => {
        putExistingUser(user._id, fullname, email)
        .then(res => checkPUTUser(res));
    }

    const checkPUTUser = res => {
        if(res === "OK"){
            updateProfile(user._id);
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
                        </Form>
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