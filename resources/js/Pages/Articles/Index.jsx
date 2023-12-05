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
            <Container data-aos="fade-up">
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
                    <div className="flex w-full justify-center py-20">
                        <span className="px-2 py-1 rounded text-white bg-gray-800 dark:text-gray-900 dark:bg-gray-100">No Articles yet .</span>
                    </div>
                }
            </Container>
        </div>
    )
}

Index.layout = page => <App children={page}/>
