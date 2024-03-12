import { useEffect } from "react";

const apiLink = "https://jan24-jilhslxp5q-uc.a.run.app/api/user";

export default function ProfileHeader() {
    // start displaying data with useState

    // fetch some data using  useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: Response = await fetch("https://jan24-jilhslxp5q-uc.a.run.app/api/user");

                if (!response.ok) {
                    throw new Error ("Network response not ok!");
                };

                const responseJSON = await response.json();

                console.log(responseJSON);
                

            } catch (error: any) {
                console.log(error);
                
            };
        };

        fetchData();
    }, [])

    return (
        <p>Profile Header</p>
    );
};