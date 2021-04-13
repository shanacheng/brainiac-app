import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client'
import PlatformCard from '../components/PlatformCard'
import {Container, Col, Row} from 'react-bootstrap'


function ExplorePage() {
    const { loading, data: {getPlatforms: platforms}} = useQuery(FETCH_PLATFORMS_QUERY);
    return (
        <div>
            <h1>Explore</h1>
            
            <Container>
                <Row>{loading ? (<h1>Loading...</h1>) : (
                    platforms && platforms.map((platform) =>(
                        <Col > 
                            <PlatformCard platform={platform}/>
                        </Col>
                    ))
                )}
                </Row> 
            </Container>
        </div>
    );
}

const FETCH_PLATFORMS_QUERY = gql`
{
    getPlatforms{
        platformID name creatorName
    }
}   
`;

export default ExplorePage;

