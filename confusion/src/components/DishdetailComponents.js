import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Form,Input, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
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
    }
  
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

  
    render() {
      return (
        <div>
          {/* <Button type="submit" value="submit" color="primary">Login</Button> */}
          <Button color="submit" onClick={this.toggle}>Submit Comment</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
            <ModalBody>
                         <LocalForm >
                              <FormGroup>
                                  <Label htmlFor="rating">Rating</Label>
                                  <Control.select model=".rating" name="rating"
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
                                  <Control.text model=".name" id="name" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
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
                                              className="form-control" />
                              </FormGroup>
                              <Button type="submit" value="submit" color="primary">Submit</Button>
                          </LocalForm>
                          
            </ModalBody>
            
          </Modal>
        </div>
      );
    }
  }

    function RenderDish({dish}){
        if (dish != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        } else {
            return (
                <div>

                </div>
            );
        }
    }

    function RenderComments({comments}){
        if (comments != null) {
            const commentsToDisplay = comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        {comment.comment}
                        <br></br>
                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        <p></p>
                    </div>
                );
            });
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {commentsToDisplay}
                    <CommentForm />
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }


    const DishDetail = (props) => {
        if (props.dish != null) {
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );
        } else
            return <div></div>;
    }

    
    

export default DishDetail;
