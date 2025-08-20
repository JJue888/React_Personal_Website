import React from "react";

interface WorkDisplayProps {
    title: string;
    image: string[];
}

const WorkDisplay: React.FC<WorkDisplayProps> = ({ title, image }) => {
    return (
        <>
            <div className="">
                <img src={image[0]} alt={title}/>
                <p className="text-white text-center pt-2">{title}</p>
            </div>
        </>
    );
};

export default WorkDisplay;