// import React, { useState, useEffect } from 'react';
// import {
//   Carousel,
//   CarouselItem,
//   CarouselControl,
//   CarouselIndicators,
//   CarouselCaption,
//   Button
// } from 'reactstrap';

// const items = [
//   {
//     id: 1,
//     altText: 'Football',
//     caption: 'Football',
//     src:'https://ic.wampi.ru/2021/05/30/Leisure.jpg',
//     btn:<Button outline color="secondary">More</Button>
//   },
//   {
    
//     id: 2,
//     altText: 'Monopoly',
//     caption: 'Monopoly',
//     src:'https://ic.wampi.ru/2021/05/30/Leisure.jpg',
//     btn:<Button outline color="secondary">More</Button>
//   },
//   {
//     id: 3,
//     altText: 'Alias',
//     caption: 'Alias',
//     src:'https://ic.wampi.ru/2021/05/30/Leisure.jpg',
//     btn:<Button outline color="secondary">More</Button>
//   }
// ];

// const Test = () => {
//   const [question, setQuestion] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [animating, setAnimating] = useState(false);
//   useEffect(() => {
//     getQuestions().then((response) => {
//       console.log(response);
//       setQuestion([...response.data.data]);
      
//     });
//   }, []);
//   return(<div></div>)
    
//     let next = () => {
//     if (animating) return;
//     const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
//     setActiveIndex(nextIndex);
//   }

//   const previous = () => {
//     if (animating) return;
//     const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
//     setActiveIndex(nextIndex);
//   }

//   const goToIndex = (newIndex) => {
//     if (animating) return;
//     setActiveIndex(newIndex);
//   }

//   const slides = items.map((item) => {
//     return (
//       <CarouselItem
//         className="custom-tag"
//         img={item.src}
//         btn={item.btn}
//         tag="div"
//         key={item.id}
//         onExiting={() => setAnimating(true)}
//         onExited={() => setAnimating(false)}
//       >
//         <btn src={item.btn} alt={item.altText}/>
//         <img src={item.src} alt={item.altText} />
//         <CarouselCaption className="text-danger" captionText={item.btn} captionHeader={item.caption}  img={item.img} btn={item.btn}/>
//       </CarouselItem>
//     );
//   });

//   return (
//     <div>
//       <style>
//         {
//           `.custom-tag {
//               max-width: 100%;
//               height: 500px;
//               background: black;
//             }`
//         }
//       </style>
//       <Carousel
//         activeIndex={activeIndex}
//         next={next}
//         previous={previous}
//       >
//         <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
//         {slides}
//         <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
//         <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
//       </Carousel>
//     </div>
//   );
//       }




// export default Test;