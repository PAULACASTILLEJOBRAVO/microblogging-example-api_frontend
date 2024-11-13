import React, { Component } from "react";
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from 'reactstrap';
import { putExistingPost } from '../../utils/apicalls';

class EditPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.post.title,
            description: this.props.post.description
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.editPost = this.editPost.bind(this);
    }
    handleTitleChange(e){
        this.setState({title: e.target.value});
    }
    handleDescriptionChange(e){
        this.setState({description: e.target.value});
    }
    editPost(e){
        e.preventDefault();
        const {
            title,
            description
        } = this.state;
        putExistingPost(this.props.post._id, title, description)
        .then(res => this.checkPUTPost(res));
    }
    checkPUTPost(res){
        if(res === "OK"){
            this.props.updateMyPost();
        }else{
            console.error("ERROR");
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            title: nextProps.post.title,
            description: nextProps.post.description
        });
    }
    render(){
        return(
            <div>
                <Card body>
                    <CardTitle tag="h5">Editar post</CardTitle>
                    <Form>
                        <FormGroup>
                            <Label for="aTitulo">Título</Label>
                            <Input type="text" name="title" id="aTitulo" placeholder="Introduce un título" value={this.state.title} onChange={this.handleTitleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="aDescripcion">Descripción</Label>
                            <Input style={{height: '200px'}} type="textarea" name="descripcion" id="aDescripcion" placeholder="Introduce una descripción" value={this.state.description} onChange={this.handleDescriptionChange}/>
                        </FormGroup>
                        <Button onClick={this.editPost}>Actualizar</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default EditPost;