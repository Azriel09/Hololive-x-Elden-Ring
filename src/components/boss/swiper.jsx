import React, { useState, useEffect } from "react";
import "../css/swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Box, Typography } from "@mui/material";
import "../css/font.css";
import {
  Tree,
  Margit,
  Godrick,
  Wolf,
  Rennala,
  Radahn,
  Astel,
  Rykard,
  GodfreyGolden,
  Morgott,
  FireGiant,
  Malenia,
  Godskin,
  Mohg,
  Maliketh,
  Gideon,
  Godfrey,
  Radagon,
  Beast,
} from "./boss_images";
export default function SwiperBoss({ listBoss, selectBoss }) {
  const handleChange = (e) => {
    console.log(e);
    const slide = e.realIndex;
    selectBoss(listBoss[slide]);
  };

  // returns Image of boss depending on which slide is selected
  const BossImage = (bossIndex) => {
    switch (bossIndex) {
      case 0:
        return Tree();
      case 1:
        return Margit();
      case 2:
        return Godrick();
      case 3:
        return Wolf();
      case 4:
        return Rennala();
      case 5:
        return Radahn();
      case 6:
        return Astel();
      case 7:
        return Rykard();
      case 8:
        return GodfreyGolden();
      case 9:
        return Morgott();
      case 10:
        return FireGiant();
      case 11:
        return Malenia();
      case 12:
        return Godskin();
      case 13:
        return Mohg();
      case 14:
        return Maliketh();
      case 15:
        return Gideon();
      case 16:
        return Godfrey();
      case 17:
        return Radagon();
      case 18:
        return Beast();
    }
  };
  return (
    <Box
      sx={{
        height: "70vh",
        width: "70vw",
        mt: "5vh",
      }}
    >
      <Swiper
        style={{
          "--swiper-navigation-color": "white",
        }}
        onSlideChange={(e) => handleChange(e)}
        slidesPerView={"auto"}
        spaceBetween={10}
        navigation={true}
        loop={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        centeredSlides={true}
      >
        {listBoss.map((boss, index) => {
          return (
            <SwiperSlide
              style={{
                backgroundColor: "rgba(0,0,0,0)",
                width: "300px",
                height: "500px",
                position: "relative",
                "&Active": {
                  opacity: 1, //
                },
              }}
              key={index}
              className="swiper-slide"
            >
              {({ isActive }) => (
                <>
                  <Typography
                    sx={{
                      fontFamily: "Elden Ring",
                      fontSize: "1.6em",
                      color: "lightgray",
                      position: "absolute",
                      textShadow: "3px 3px #000",
                    }}
                  >
                    {boss}
                  </Typography>
                  {isActive ? (
                    <img
                      src={BossImage(index)}
                      style={{
                        borderRadius: "10px",
                        opacity: "1",
                      }}
                    />
                  ) : (
                    <img
                      src={BossImage(index)}
                      style={{
                        borderRadius: "10px",
                        opacity: "0.4",
                      }}
                    />
                  )}
                </>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
