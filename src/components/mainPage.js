import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
//importing images
import image from '../Images/pic1.jpg'
import image2 from '../Images/pic2.jpg'
import image3 from '../Images/pic3.jpg'
import BackgroundPic from '../Images/background.jpg'


const bgImage = {

    backgroundImage: 'url(' + BackgroundPic + ')' //setting the bg image
}


export class MainPage extends React.Component {

    render() {
        return (
            <div style={bgImage} >
                <div className='container-fluid' >
                    <div className="row title" style={{ marginBottom: "20px" }} >
                    </div>
                </div>
                <div className='container-fluid' >
                    <Carousel interval={2000} keyboard={false}>
                        <Carousel.Item style={{ 'height': "500px" }}  >
                            <img style={{ 'height': "400px" }}
                                className="d-block w-50"
                                src={image} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item  >
                        <Carousel.Item style={{ 'height': "500px" }}>
                            <img style={{ 'height': "400px" }}
                                className="d-block w-50"
                                src={image2} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item style={{ 'height': "500px" }}>
                            <img style={{ 'height': "400px" }}
                                className="d-block w-50"
                                src={image3} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        );

    }

}