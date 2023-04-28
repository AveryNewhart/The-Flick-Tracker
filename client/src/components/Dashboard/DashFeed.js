import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const DashFeed = () => {

    return (
        <div>
            <Container />
             <Row>
                <Col>
                    {/* <img className='movie__poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
                    style={{
                    width: "35%",
                    float: "left"
                    }}/> */}
                    <img src='https://via.placeholder.com/150'/>
              </Col>
                <Col xs={8}style={{backgroundColor: 'blue'}}></Col>
             </Row>
            <Container />
        </div>
    )
}

export default DashFeed;