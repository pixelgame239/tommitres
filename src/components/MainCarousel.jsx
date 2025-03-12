import { Carousel } from "react-bootstrap";
import tomMit from "../assets/tom-mit.jpg";
import doAn from "../assets/do-an.jpg";
import nemNuong from "../assets/nem-nuong.jpg";
import ResponsiveScreen from "../styles/responsiveScreen";

const images = [tomMit, doAn, nemNuong];

const CarouselSlider = () => {
  const { width, height } = ResponsiveScreen();

  return (
    <div
      style={{ marginTop: "20px", overflow: "hidden", alignItems: "center" }}
      className="vw-100"
    >
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              style={{
                objectFit: "cover",
                width: "100%",
                height: height / 1.6,
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
