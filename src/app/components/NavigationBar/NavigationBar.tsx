"use client"

import { Icon } from "../../profile/page";
import Image from "next/image";
import styled from "styled-components";

const Navigation = styled.aside`
    display: grid;
    grid-template-rows: repeat(6, min-content);
    grid-gap: 10px;
    width: fit-content;
    position: fixed;
    height: 100%;
    place-content: center;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0px 10px;

    button {
        background-color: transparent;
        border: none;
        width: 48px;
        height: 48px;
        transition: all 0.2s ease;

        &:hover {
            background-color: #222222;
            border-radius: 9px;
            transform: scale(1.1);            
        }
    }

    // Tablet
    @media (max-width: 768px){
        // background-color: red;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: grid;
        grid-template-columns: repeat(6, min-content);
        grid-template-rows: 1fr;
        height: fit-content;
        bottom: 0px;
        width: 100%;
        padding: 10px 0px;
        z-index: 10;
    }

    // Mobile Phone
    @media (max-width: 480px){
        // background-color: red;
        height: 73px;
        bottom: 0px;
    }
`;

interface NavigationBarProps {
    items: Icon[];
}

export default function NavigationBar({items}: NavigationBarProps){
    // items.map((icon) => {
    //     console.log(icon.altText);
    // })

    return (
        <>
            <Navigation>
                {items.map((icon, index) => {
                    return (
                        <button key={index}>
                            <Image
                                src={icon.path} 
                                width={icon.width} 
                                height={icon.height} 
                                alt={icon.altText}
                                />
                        </button>
                    )
                })}
            </Navigation>
        </>
    )
}