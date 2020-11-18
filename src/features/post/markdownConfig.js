import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Table } from "semantic-ui-react";

function MarkdownTable(props) {
    return <Table celled>{props.children}</Table>;
}

function MarkdownTableHead(props) {
    return <Table.Header>{props.children}</Table.Header>;
}

function MarkdownTableBody(props) {
    return <Table.Body>{props.children}</Table.Body>;
}

function MarkdownTableRow(props){
    return <Table.Row>{props.children}</Table.Row>;
}

export function Markdown({ children }) {
    return (
        <ReactMarkdown
            plugins={[gfm]}
            children={children}
            renderers={{
                table: MarkdownTable,
                tableHead: MarkdownTableHead,
                tableBody: MarkdownTableBody,
                tableRow: MarkdownTableRow,
            }}
        />
    );
}
