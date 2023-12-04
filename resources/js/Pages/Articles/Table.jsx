import React from "react";
import App from "@/Layouts/App.jsx";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container.jsx";
import {Link} from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination.jsx";
import Table from "@/Components/Table.jsx";
import useSwal from "@/Hooks/useSwal.jsx";

export default function ArticleTable(props){
    const {data: articles, meta, links} = props.articles

    const {ask} = useSwal();


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
                                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800">
                                                <Link href={tag.url} key={i}>{tag.name}</Link>
                                            </span>

                                        ))}
                                    </Table.Td>
                                    <td>
                                        <Table.Dropdown>
                                            <Table.DropdownItem href={route('articles.show', article.slug)}>View</Table.DropdownItem>
                                            <Table.DropdownItem href={route('articles.edit', article.slug)}>Edit</Table.DropdownItem>
                                            <Table.DropdownButton className='hover:bg-rose-500 hover:text-white' onClick={() => {
                                                ask({
                                                    url: route('articles.destroy', article),
                                                    message: "Are you sure want to delete ?",
                                                    method: "delete"
                                                })
                                            }}>Delete</Table.DropdownButton>
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
