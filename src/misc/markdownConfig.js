import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Image, Table } from "semantic-ui-react";

function MarkdownTable(props) {
    return <Table celled>{props.children}</Table>;
}

function MarkdownTableHead(props) {
    return <Table.Header>{props.children}</Table.Header>;
}

function MarkdownTableBody(props) {
    return <Table.Body>{props.children}</Table.Body>;
}

function MarkdownTableRow(props) {
    return <Table.Row>{props.children}</Table.Row>;
}

function MarkdownImage(props) {
    return (
        <Image src={props.src} style={{ maxWidth: "100%", height: "auto" }} />
    );
}

export function Markdown({ children }) {
    return (
        <ReactMarkdown
            plugins={[gfm, { singleTilde: false }]}
            children={children}
            renderers={{
                table: MarkdownTable,
                tableHead: MarkdownTableHead,
                tableBody: MarkdownTableBody,
                tableRow: MarkdownTableRow,
                image: MarkdownImage,
            }}
        />
    );
}
