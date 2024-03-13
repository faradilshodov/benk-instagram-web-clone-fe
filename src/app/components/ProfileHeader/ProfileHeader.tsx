import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const apiLink = "https://jan24-jilhslxp5q-uc.a.run.app/api/user";

const ProfileHeaderContainer = styled.div`
    // background-color: red;
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-bottom: 44px;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    margin: auto auto;
    // object-fit: cover;

    @media (max-width: 480px) {
        height: 100px;
        width: 100px;
    }
`;

const BioText = styled.div`
    // background-color: purple;
    color: white;
    
    display: grid;
    grid-template-rows: repeat(4);
    align-items: center;

    h1 {
        font-weight: bold;
    }

    ul {
        display: grid;
        grid-template-columns: 0.7fr 1fr 1fr;
        max-width: 400px;

        span {
            font-weight: bold;
        }
    }
`;

interface BioDataTypeObject {
    profile_image_url: string,
    name: string,
    bio: string,
};

export default function ProfileHeader() {
    // start displaying data with useState
    const [bioData, setBioData] = useState<BioDataTypeObject[]>();

    // fetch some data using  useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: Response = await fetch(apiLink);

                if (!response.ok) {
                    throw new Error ("Network response not ok!");
                };

                const responseJSON = await response.json();

                setBioData(responseJSON);
            } catch (error: any) {
                console.log(error);
                
            };
        };

        fetchData();
    }, [])

    return (
        <>
            {bioData ? 
                <ProfileHeaderContainer>
                    <ProfileImage src={bioData[0].profile_image_url} width={150} height={150} alt="Profile Image" />
                    <BioText>
                        <h1>{bioData[0].name}</h1>
                        <ul>
                            <li><span>47</span> posts</li>
                            <li><span>2,313</span> followers</li>
                            <li><span>2,446</span> following</li>
                        </ul>
                        <h1>{bioData[0].name}</h1>
                        <p>{bioData[0].bio}</p>
                    </BioText>
                </ProfileHeaderContainer>
                : <p>No Data</p>}
        </>
    );
};