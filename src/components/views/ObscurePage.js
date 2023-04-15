import React from "react";
import BaseContainer from "components/ui/BaseContainer";

const ObscurePage = () => {
    return (
        <BaseContainer>
            <iframe 
                width="720" 
                height="480" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&showinfo=0&loop=1" 
                title="ObscurePage" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>

            </iframe>
        </BaseContainer>
    
);
};

export default ObscurePage;