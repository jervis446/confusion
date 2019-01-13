import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';




    function renderDish({dish}){
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

    function renderComments({comments}){
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
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

const DishDetail = (props) => {
    render() {
        if (this.props.dish != null) {
            return (
                <div className="row">
                 <renderDish dish={this.props.dish} />
                 <renderComments comments={this.props.dish.comments} />
                </div>
            );
        } else
            return <div></div>;
    }
}


export default DishDetail;
