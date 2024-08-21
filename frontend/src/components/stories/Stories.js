import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./Stories.css";
import { SERVER } from "../constants/server";

const Stories = () => {
  const [sliderData, setSliderData] = useState([]);
  const sliderLength = sliderData.length;
  const slidesPerPage = 7;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState([]);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const autoScroll = true;
  let slideInterval;
  const intervalTime = 15000;

  useEffect(() => {
    // Fetch stories from the server
    fetch(`${SERVER}/stories`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSliderData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

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

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "insta-cloneMK");
    data.append("cloud_name", "codermk1");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/codermk1/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const responseData = await response.json();
    return responseData.url;
  };

  const addStory = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      const imageUrl = await uploadImageToCloudinary(file);

      const newStory = {
        image: imageUrl,
        name: "John Doe", // You can set the name dynamically based on your requirements
      };

      // Add the new story to the database
      fetch(`${SERVER}/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(newStory),
      })
        .then((response) => response.json())
        .then((data) => {
          // Do something with the response if needed
          console.log("Story added:", data);
        })
        .catch((error) => {
          console.error("Error adding story:", error);
        });
    });
  };

  useEffect(() => {
    const startIndex = currentSlide;
    const endIndex = (startIndex + slidesPerPage) % sliderLength;
    const slicedData =
      startIndex <= endIndex
        ? sliderData.slice(startIndex, endIndex + 8)
        : [...sliderData.slice(startIndex), ...sliderData.slice(0, endIndex)];

    // Ensure that only the number of slidesPerPage are shown
    const adjustedVisibleSlides = slicedData.slice(0, slidesPerPage);

    setVisibleSlides(adjustedVisibleSlides);

    if (autoScroll) {
      slideInterval = setInterval(nextSlide, intervalTime);
    }

    return () => clearInterval(slideInterval);
  }, [currentSlide, autoScroll, sliderData]);

  const isPrevButtonHidden = currentSlide === 0;
  const isNextButtonHidden = currentSlide === sliderLength - slidesPerPage;

  return (
    <div className="stories">
      {!isPrevButtonHidden && (
        <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      )}
      <button className="add-story" onClick={addStory}>
        Add Story
      </button>
      {visibleSlides.map((slide, index) => {
        const { image, name } = slide;

        return (
          <div key={index} className="slide">
            <div className="stories__info">
              <div className="stories__img">
                <span onClick={() => openPreview(image)}>
                  <img src={image} alt={name} />
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
