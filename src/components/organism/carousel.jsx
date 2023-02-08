import { useState, useEffect, Children, cloneElement } from "react";

const Carousel = ({ children }) => {
    const [elements, setElements] = useState();
    const [position, setPosition] = useState(0);
    const arrayChildren = Children.toArray(children);

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
        if (arrayChildren.length - 1 > position) {
            setPosition(position + 1);
        }
    }

    const handleOnclickBack = () => {
        if (position > 0) {
            setPosition(position - 1);
        }
    }

    return (
        <div className="mt-6 relative max-w-3xl m-auto">
            <div className="flex items-center w-full">
                <div className="absolute -left-1/4">
                    <button className=" font-serif text-4xl font-semibold" onClick={handleOnclickBack}>{"<"}</button>
                </div>

                <div className="w-full max-w-full grid gap-7 grid-cols-3">{elements}</div>

                <div className="absolute -right-1/4">
                    <button className="font-serif text-4xl font-semibold" onClick={handleOnclickNext}>{">"}</button>
                </div>
            </div>
            <div></div>
        </div>
    )
}


export default Carousel;
