import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const FavList = () => {
    return (
    <div>
      <Row xs={1} md={5} className="g-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Col>
            <Card style={{ width: '12rem', height: '18rem' }}>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.ImgOverlay>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
              </Card.Body>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    );
  }

{/* below is an example of how we can iterate over the users list to populate the top */}
        {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px0">
          {projects.map((item, index) => (
          <div className="shadow-md shadow-black rounded-lg">
              <img src={item.img} alt="My Projects" className="rounded-lg hover:scale-110 duration-500"/>
              <div className="flex items-center justify-center">
                  <a href={item.live}> 
                  <button className="w1/2 px-6 py-3 m-4 hover:scale-110 duration-500 text-white border-b-2 border-[#d62828]">Live</button>
                  </a>
                  <a href={item.github}>
                  <button className="w1/2 px-6 py-3 m-4 hover:scale-110 duration-500 text-white border-b-2 border-[#d62828]">GitLink</button>
                  </a>
              </div>
          </div>
          ))}
      </div> */}

export default FavList;