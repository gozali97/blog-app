import React from "react";
import App from "@/Layouts/App.jsx";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import Grid from "@/Components/Grid.jsx";
import ArticleBlock from "@/Components/ArticleBlock.jsx";
import Container from "@/Components/Container.jsx";
import Footer from "@/Components/Footer.jsx";

export default function Home({articles}){
    return(
        <div className="mt-14 md:mt-10">
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
            <Container>
                {articles.length ?
                    <Grid>
                        {articles.map((article) => <ArticleBlock article={article}  key={article.slug}/>)}
                    </Grid>
                    :
                <p>No Articles yet .</p>
                }
            </Container>

        </div>
    )
}

Home.layout = page => <App children={page}/>
