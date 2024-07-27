import React, { useState, useEffect } from 'react';
import './Main.scss';

const Main = () => {
    const [heroSrc, setHeroSrc] = useState('./hero-bottom.png');
    const [point, setPoint] = useState(0);
    const [visibleOwl, setVisibleOwl] = useState('bottom');

    const imagePaths = {
        top: ['./hero-top-1.png', './hero-top-2.png', './hero-top-3.png', './hero-top-4.png', './hero-top-5.png'],
        right: ['./hero-right-1.png', './hero-right-2.png', './hero-right-3.png', './hero-right-4.png', './hero-right.png'],
        bottom: ['./hero-bottom-1.png', './hero-bottom-2.png', './hero-bottom-3.png', './hero-bottom-4.png', './hero-bottom-5.png'],
        left: ['./hero-left-1.png', './hero-left-2.png', './hero-left-3.png', './hero-left-4.png', './hero-left-5.png']
    };

    useEffect(() => {
        Object.values(imagePaths).flat().forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const handlePoint = (direction) => {
        setPoint(point + 1);
        const newDirection = getRandomDirection(direction);
        setVisibleOwl(newDirection);
        handleOwlClick(direction);
    };

    const handleOwlClick = (direction) => {
        const images = imagePaths[direction] || imagePaths.bottom;
        cycleHeroImages(images, 600);
    };

    const cycleHeroImages = (images, duration) => {
        let index = 0;
        const interval = duration / images.length;

        const intervalId = setInterval(() => {
            setHeroSrc(images[index]);
            index += 1;

            if (index >= images.length) {
                clearInterval(intervalId);
            }
        }, interval);
    };

    const getRandomDirection = (currentDirection) => {
        const directions = ['top', 'right', 'bottom', 'left'];
        let newDirection = currentDirection;

        while (newDirection === currentDirection) {
            newDirection = directions[Math.floor(Math.random() * directions.length)];
        }

        return newDirection;
    };

    const handleRestart = () => {
        setPoint(0);
        setHeroSrc('./hero-bottom.png');
        setVisibleOwl('bottom');
    };

    return (
        <section className="main">
            <div className="container">
                <div className="wrap">
                    <h2 className="point">{point}</h2>
                    <div className="game">
                        <div className="hero">
                            <img src={heroSrc} alt="hero" />
                        </div>
                        {['top', 'right', 'bottom', 'left'].map((direction) => (
                            <div
                                key={direction}
                                className={`owl owl-${direction} ${visibleOwl === direction ? 'visible' : 'hidden'} ${visibleOwl === direction ? 'wop-anim' : ''}`}
                                onClick={() => handlePoint(direction)}
                            >
                                <img src="./owl.png" alt="owl" />
                            </div>
                        ))}
                    </div>
                    <button className='btn' onClick={handleRestart}>Restart Game</button>
                </div>
            </div>
        </section>
    );
};

export default Main;
