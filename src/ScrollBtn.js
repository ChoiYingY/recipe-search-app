import React, {useState, useEffect} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import {Button} from './Button';

const ScrollBtn = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
        if(window.scrollY > 300)
            setVisible(true);
        else{
            setVisible(false);
        }
    });
  }, []);   // only render once

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }

    return (
        <Button>
            <FaArrowCircleUp onClick={scrollToTop} 
            style={{display: visible ? 'inline' : 'none'}} />
        </Button>
    )
}

export default ScrollBtn;