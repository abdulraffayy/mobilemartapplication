import { useEffect, useState } from 'react';
import videoimage from '../assets/iphonevideo.mp4'; // Update the path to your video file

const Iphone = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const videoStyle = {
        width: `${Math.max(50, 100 - Math.min(scrollY / 5, 50))}%`, // Decrease to 50% on scroll
        borderRadius: `${Math.min(scrollY / 10, 20)}px`,
        transition: 'width 0.3s ease, border-radius 0.3s ease',
    };

    return (
        <div className="relative w-full h-screen flex items-center justify-center bg-gray-100 overflow-hidden">

            <video
                style={{
                    ...videoStyle,
                    height: '90%',
                    maxWidth: '90%',
                    position: 'absolute',
                    top: '5%',
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                }}
                className="object-cover rounded-lg"
                autoPlay
                loop
                muted
            >
                <source src={videoimage} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

        
    );
};

export default Iphone;