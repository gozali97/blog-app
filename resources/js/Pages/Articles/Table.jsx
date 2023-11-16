import React from "react";
import App from "@/Layouts/App.jsx";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import Container from "@/Components/Container.jsx";
import {Link} from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination.jsx";
import Table from "@/Components/Table.jsx";

export default function ArticleTable(props){
    const {data: articles, meta, links} = props.articles
    return(
        <div className="mt-14 md:mt-10 p-10">
            <Head title="My Article"/>
            <Container>
                <Table>
                    <Table.Thead>
                    <tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Tags</Table.Th>
                        <Table.Th></Table.Th>
                    </tr>
                    </Table.Thead>
                    <Table.Tbody>
                    {articles.length ?
                        (
                            articles.map((article, i) => (
                                <tr key={article.id}>
                                    <Table.Td>{meta.from + i}</Table.Td>
                                    <Table.Td>
                                        <Link href={article.url}>{article.title}</Link>
                                    </Table.Td>
                                    <Table.Td>
                                        <Link href={article.category.url}>{article.category.name}</Link>
                                    </Table.Td>
                                    <Table.Td>
                                        {article.tags.map((tag, i) =>(
                                            <Link href={tag.url} key={i}>{tag.name}</Link>
                                        ))}
                                    </Table.Td>
                                    <td>
                                        <Table.Dropdown>
                                            <Table.DropdownItem href={route('articles.show', article.slug)}>View</Table.DropdownItem>
                                            <Table.DropdownItem href={route('articles.edit', article.slug)}>Edit</Table.DropdownItem>
                                            <Table.DropdownItem className='hover:bg-rose-500 hover:text-white' href={'#'}>Delete</Table.DropdownItem>
                                        </Table.Dropdown>
                                    </td>
                                </tr>
                            ))
                        )
                        :
                        <tr aria-colspan={5}>
                            <td>
                                <p>
                                    Youd dont have article yet
                                </p>
                            </td>
                        </tr>
                    }
                    </Table.Tbody>
                </Table>
                <Pagination {...{meta, links}}/>
            </Container>
        </div>
    )
}

ArticleTable.layout = page => <App children={page}/>
