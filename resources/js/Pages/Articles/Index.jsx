import React from "react";
import App from "@/Layouts/App.jsx";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import Container from "@/Components/Container.jsx";
import Grid from "@/Components/Grid.jsx";
import ArticleBlock from "@/Components/ArticleBlock.jsx";
import Pagination from "@/Components/Pagination.jsx";

export default function Index({category, ...props}){
    const {data: articles, meta, links} = props.articles;
    return(
        <div className="mt-14 md:mt-10">
            <Head title="The Article"/>
            <Header>
                <Header.Title>
                    The Article
                </Header.Title>
                <Header.Content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Header.Content>
            </Header>
            <Container>
                {articles.length ?
                    <>
                        <Grid>
                            {articles.map((article) => (
                                <ArticleBlock article={article}  key={article.slug}/>
                            ))}
                        </Grid>
                        <Pagination {...{meta, links}}/>
                    </>
                    :
                    <p>No Articles yet .</p>
                }
            </Container>
        </div>
    )
}

Index.layout = page => <App children={page}/>
