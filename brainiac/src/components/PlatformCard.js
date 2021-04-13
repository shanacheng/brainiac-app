import React from 'react';
import {Card, Button} from 'react-bootstrap'


function PlatformCard({platform: {platformID, name, creatorName}}){
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    created by {creatorName}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PlatformCard;