import React from "react";
import App from "@/Layouts/App.jsx";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header.jsx";

export default function Home(){
    return(
        <div>
            <Head title="Blog Inertia"/>
            <Header>
                <Header.Title>
                    Lorem
                </Header.Title>
                <Header.Subtitle>
                        Lorem ipsum dolor.
                </Header.Subtitle>
                <Header.Content>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, exercitationem!
                </Header.Content>
            </Header>
        </div>
    )
}

Home.layout = page => <App children={page}/>
