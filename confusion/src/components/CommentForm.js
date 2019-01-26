import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';



class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        modal: false,
        touched: {
            name: false
        }
    };

    this.toggle = this.toggle.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleComment(event) {
    this.toggleModal();
    alert("name" + this.name.value + " Comment: " + this.comment.value);
    event.preventDefault();
}


  render() {
    return (
      <div>
        {/* <Button type="submit" value="submit" color="primary">Login</Button> */}
        <Button color="submit" onClick={this.toggle}>Submit Comment</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
          <ModalBody>

                       <Form onSubmit={this.handleComment}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".contactType" name="contactType"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input} />
                                 <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </FormGroup>
                            <FormGroup>
                            <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".message" id="message" name="message"
                                            rows="6"
                                            className="form-control"  innerRef={(input) => this.comment = input}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                        
          </ModalBody>
          
        </Modal>
      </div>
    );
  }
}

export default CommentForm;