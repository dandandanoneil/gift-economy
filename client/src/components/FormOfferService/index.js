import React, { useContext, useState } from "react";
import API from '../../utils/API';
import UserContext from "../../utils/UserContext";

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function FormOfferService() {
    const { currentUser } = useContext(UserContext);

    const [postContent, setPostContent] = useState({
        created_by: currentUser._id,
        offerRequestEvent: "offer",
        type: "service",
        title: "",
        category: "",
        description: "",
        imageURL: "",
        location: "",
        searchTags: "",
        offeredUntil: null,
        offerCapacity: "",
        onlineOrRemote: false,
        timeSensitive: false,
        limitedCapacity: false
    });    

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPostContent({
            ...postContent,
            [name]: value
        });
    }

    const handleCheckboxChange = event => {
        const { name, checked } = event.target;
        setPostContent({
            ...postContent,
            [name]: checked
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        API.savePost(postContent);
    };

  return (
    <Card border="primary" className="m-1">
        <Card.Header style={{ color: "white", backgroundColor: "#4c68a5", fontWeight: "bold"}}>Offer Services</Card.Header>
        <Form className="p-3">
            <Form.Group as={Row}>
                <Form.Label column sm="2" className="text-right">Service Title:</Form.Label>
                <Col sm="10"><Form.Control type="text" name="title" onChange={handleInputChange} /></Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2" className="text-right">Category:</Form.Label>
                <Col sm="10">
                    <Form.Control as="select" name="category" onChange={handleInputChange}>
                        <option defaultValue disabled>Select a category</option>
                        <option>Legal</option>
                        <option>Physical Labor</option>
                        <option>Financial Advice</option>
                        <option>Educational</option>
                        <option>Transportation</option>
                        <option>Beauty & Wellness</option>
                        <option>Household</option>
                        <option>Lessons</option>
                        <option>Pet</option>
                        <option>Real Estate</option>
                        <option>Other</option>
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm="2" className="text-right"><Form.Label>Description:</Form.Label></Col>
                <Col sm="10"><Form.Control as="textarea" rows={3} name="description" onChange={handleInputChange} /></Col>
            </Form.Group>
            <Form.Group as={Row}>
            <Form.Label column sm="2" className="text-right">Image:</Form.Label>
                <Col sm="7"><Form.File label="Upload an image" custom name="imageURL" onChange={handleInputChange} /></Col>
                <Form.Text as={Col}><em>(optional)</em></Form.Text>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2" className="text-right">Location:</Form.Label>
                <Col sm="7">
                    <Form.Control as="select" name="location" onChange={handleInputChange}>
                        <option defaultValue>Select a location</option>
                        <option>Bridesburg-Kensington-Port Richmond</option>
                        <option>Bucks County</option>
                        <option>Center City</option>
                        <option>Chester County</option>
                        <option>Delaware County</option>
                        <option>Far Northeast Philadelphia</option>
                        <option>Germantown-Chestnut Hill</option>
                        <option>Lower North Philadelphia</option>
                        <option>Montgomery County</option>
                        <option>Near Northeast Philadelphia</option>
                        <option>Olney-Oak Lane</option>
                        <option>Roxborough-Manayunk</option>
                        <option>South Philadelphia</option>
                        <option>Southwest Philadelphia</option>
                        <option>Upper North Philadelphia</option>
                        <option>West Philadelphia</option>
                    </Form.Control>
                </Col>
                <Form.Text as={Col}><em>(optional)</em></Form.Text>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2" className="text-right">Search Tags:</Form.Label>
                <Col sm="7"><Form.Control type="text" placeholder="Enter relevant tags, seperated by spaces" name="searchTags" onChange={handleInputChange} /></Col>
                <Form.Text as={Col}><em>(optional)</em></Form.Text>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2" className="text-right">Offered Until:</Form.Label>
                <Col sm="7"><Form.Control type="date" name="offeredUntil" onChange={handleInputChange} /></Col>
                <Form.Text as={Col}><em>(optional)</em></Form.Text>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2" className="text-right">Capacity:</Form.Label>
                <Col sm="7"><Form.Control type="text" name="offerCapacity" onChange={handleInputChange} /></Col>
                <Form.Text as={Col}><em>(optional)</em></Form.Text>
            </Form.Group>
            <Row className="text-center">
                <Col><Form.Check type="checkbox" label="Online/Remote" name="onlineOrRemote" onChange={handleCheckboxChange}/></Col>
                <Col><Form.Check type="checkbox" label="Time Sensitive" name="timeSensitive" onChange={handleCheckboxChange}/></Col>
                <Col><Form.Check type="checkbox" label="Limited Capacity" name="limitedCapacity" onChange={handleCheckboxChange}/></Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Post Offer
                </Button>
            </Row>
        </Form>
    </Card>
  );
}

export default FormOfferService;