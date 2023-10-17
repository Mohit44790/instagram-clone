import React, { useEffect, useState } from "react";
import { sliderData } from "./sliderdata";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./Stories.css";

const Stories = () => {
  const sliderLength = sliderData.length;
  const slidesPerPage = 7;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState([]);
  const [isPreviewOpen, setPreviewOpen] = useState(false); // New state for image preview
  const [previewImage, setPreviewImage] = useState(""); // New state for previewed image
  const autoScroll = true;
  let slideInterval;
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderLength);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? sliderLength - 1 : prevSlide - 1
    );
  };

  const openPreview = (image) => {
    setPreviewImage(image);
    setPreviewOpen(true);
    setTimeout(() => {
      setPreviewOpen(false);
    }, 5000);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };

  useEffect(() => {
    // Set the initial visible slides based on the currentSlide
    const startIndex = currentSlide;
    const endIndex = (startIndex + slidesPerPage) % sliderLength;
    setVisibleSlides(
      startIndex <= endIndex
        ? sliderData.slice(startIndex, endIndex + 1)
        : [...sliderData.slice(startIndex), ...sliderData.slice(0, endIndex)]
    );

    if (autoScroll) {
      const auto = () => {
        // eslint-disable-next-line
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, autoScroll]);

  const isPrevButtonHidden = currentSlide === 0;
  const isNextButtonHidden = currentSlide === sliderLength - slidesPerPage;

  return (
    <div className="stories">
      {!isPrevButtonHidden && (
        <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      )}
      {visibleSlides.map((slide, index) => {
        const { image, name } = slide;
        return (
          <div key={index} className="slide">
            <div className="stories__info">
              <div className="stories__img">
                <span onClick={() => openPreview(image)}>
                  {" "}
                  {/* Add onClick to open preview */}
                  <img src={image} alt="user" />
                </span>
              </div>
              <div className="stories__name">{name}</div>
            </div>
          </div>
        );
      })}
      {!isNextButtonHidden && (
        <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      )}

      {isPreviewOpen && (
        <div className="image-preview-overlay" onClick={closePreview}>
          <div className="image-preview-container">
            <img src={previewImage} alt="Preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
