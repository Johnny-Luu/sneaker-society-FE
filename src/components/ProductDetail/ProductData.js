import { images } from "../../assets";

export const OneProduct = {
  id: "abc123",
  name: "Nike Shoes",
  brand: "Nike",
  shortDescription: "Hands-free, hads on music experience.",
  description:
    "POD-S3.1 Shoes High-tech shoes that mix modern materials for flexible support. The P.O.D. System is reborn from the archives with new levels of comfort, flexibility and design. These...",
  price: 100,
  rating: 4.5,
  size: [37, 37.5, 38, 39, 39.5, 40, 40.5, 41, 42],
  src: [
    {
      img: images.sneakerTransparent.nikeOne,
      color: "Green",
    },
    {
      img: images.sneakerTransparent.nikeTwo,
      color: "Red-White",
    },
    {
      img: images.sneakerTransparent.nikeThree,
      color: "White",
    },
    {
      img: images.sneakerTransparent.nikeFour,
      color: "Black-White",
    },
  ],
};
