import React from "react";
import App from "@/Layouts/App.jsx";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import Container from "@/Components/Container.jsx";
import Markdown from "@/Components/Markdown.jsx";
import {Link} from "@inertiajs/inertia-react";

export default function Show(props){
    const {data:article, related:articles} = props.article;
    return(
        <div className="mt-14 md:mt-10">
            <Head title={article.title}/>
            <Header>
                <div className="mb-4">
                    <div className='text-gray-400 mb-4 text-sm'>
                        Fill in: <Link className='text-white underline' href={route('category.show', article.category.slug)}>{article.category.name}</Link>
                    </div>
                    {article.tags.length ?
                        <div className='flex items-center gap-x-2 mb-1'>
                            {article.tags.map(tag => (
                                <Link className='bg-gray-700 text-white px-2 py-1 text-xs font-medium hover:bg-gray-600 transition duration-200 rounded shadow border-t border-gray-600' key={tag.slug} href={route('tags.show', tag.slug)}>{tag.name}</Link>
                            ))}
                        </div>
                        : null}
                </div>
                <Header.Title>
                    {article.title}
                </Header.Title>
                <Header.Subtitle>
                    {article.teaser}
                </Header.Subtitle>
            </Header>
            <Container>
                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-8">
                        {<img className='w-full rounded mb-6' src={article.image} alt=""/>}
                        <Markdown>{article.body}</Markdown>
                    </div>
                    <div className="col-span-4">
                            <h4 className='text-xl font-semibold text-black border-b pb-2 mb-4'>More About {article.category.name}</h4>
                        {articles.length ? (
                            <ul className='space-y-2'>
                                {articles.map((article) =>(
                                    <li key={article.slug}>
                                        <Link className='line-clamp-2 text-blue-600 underline decoration-blue-500' href={route('articles.show', article.slug)}>{article.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        )
                            : null
                        }

                    </div>
                </div>

            </Container>
        </div>
    )
}

Show.layout = page => <App children={page}/>
