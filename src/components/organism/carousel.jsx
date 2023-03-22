import { useState, useEffect, Children, cloneElement } from "react";

const Carousel = ({ children }) => {
    const [elements, setElements] = useState();
    const arrayChildren = Children.toArray(children);
    const [position, setPosition] = useState(0);

    useEffect(() => {
        const elements = Children.map(arrayChildren, (child, i) => {
            if (i < 3) {
                return cloneElement(child);
            }
        });
        setElements(elements);
    }, []);

    useEffect(() => {
        const arrayNewElements = [];
        let j = 0;
        for (let i = position; j < 3; i++) {
            if (i < arrayChildren.length) {
                arrayNewElements.push(cloneElement(arrayChildren[i]));
                j++;
            } else return;
        }
        setElements(arrayNewElements);
    }, [position]);

    const handleOnclickNext = () => {
        if (arrayChildren.length - 1 > position + 2) {
            setPosition(position + 1);
        }
    }

    const handleOnclickBack = () => {
        if (position >= 1) {
            setPosition(position - 1);
        }
    }

    return (
        <div className="mt-6 relative w-full m-auto">
            <div className="flex items-center justify-between w-full">
                <div className="absolute -left-9">
                    <button className=" font-serif text-4xl font-semibold" onClick={handleOnclickBack}>{"<"}</button>
                </div>

                <div className="w-full max-w-full grid lg:grid-cols-3 md:grid-cols-2 justify-items-center content-center">{elements}</div>

                <div className="absolute -right-9">
                    <button className="font-serif text-4xl font-semibold" onClick={handleOnclickNext}>{">"}</button>
                </div>
            </div>
        </div>
    )
}


export default Carousel;
