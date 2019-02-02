import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Form,Input, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        author: '',
        modal: false,
        touched: {
            author: false
        }
      };
  
      this.toggle = this.toggle.bind(this);
    }
  
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
    handleSubmit(values) {
        this.toggle();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
  
    render() {
      return (
        <div>
          {/* <Button type="submit" value="submit" color="primary">Login</Button> */}
          <Button color="submit" onClick={this.toggle}>Submit Comment</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                              <FormGroup>
                                  <Label htmlFor="rating">Rating</Label>
                                  <Control.select model=".rating" id="rating" name="rating"
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
                                  <Control.text model=".author" id="author" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
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
                                  <Control.textarea model=".comment" id="comment" name="comment"
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
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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

    function RenderComments({comments, addComment, dishId}) {
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
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }


    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 

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
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
                </div>
            );
        } else
            return <div></div>;
    }

    
    

export default DishDetail;
