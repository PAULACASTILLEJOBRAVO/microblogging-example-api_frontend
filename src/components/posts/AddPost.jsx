import React from 'react';
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from 'reactstrap';
import { postNewPost } from '../../utils/apicalls';

export default class AddPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: ''
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.addPost = this.addPost.bind(this);
    }

    handleTitleChange = event => {
        this.setState({ title: event.target.value });
    }
    
    handleDescriptionChange(e){
        this.setState({description: e.target.value});
    }

    addPost(e){
        e.preventDefault();
        const {
            title,
            description
        } = this.state;
        postNewPost(sessionStorage.getItem('iduser'), title, description, sessionStorage.getItem('email'))
        .then(res => this.checkPOSTNewPost(res));
    }
    checkPOSTNewPost(res){
        if(res === "OK"){
            this.props.updateMyPost();
            this.setState({
                title: "",
                description: ""
            });
            this.props.updateMyPost();
        }else{
            console.error("ERROR");
        }
    }
    render(){
        return(
            <div>
                <Card body>
                    <CardTitle tag="h5">Añadir un nuevo post</CardTitle>
                    <Form>
                        <FormGroup>
                            <Label for="aTitulo">Título</Label>
                            <Input type="text" name="title" id="aTitulo" placeholder="Introduce un título" value={this.state.title} onChange={this.handleTitleChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="aDescripcion">Descripción</Label>
                            <Input style={{height: '200px'}} type="textarea" name="descripcion" id="aDescripcion" placeholder="Introduce una descripción" value={this.state.description} onChange={this.handleDescriptionChange}/>
                        </FormGroup>
                        <Button onClick={this.addPost}>Añadir</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}


