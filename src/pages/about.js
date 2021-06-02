import React, { Component } from "react";
import {
    Menu,
    Image,
    Grid,
    Header,
    Container,
    Segment,
} from "semantic-ui-react";
import gfm from "remark-gfm";
import { Markdown } from "../misc/markdownConfig";

import { BlockStyle } from "../style/style.json";
import { NavigationBar } from "../components/navigation";

const backgroundColor = BlockStyle.backgroundColor;

const BioText = `
# Yun Hong

Hi, this is Yun Hong. I am currently pursuing M.S. in ECE at CMU. My
concentration is in System (Embedded, Networking, and
HPC/Distributed). But I have a growing interest in web technology
(The beauty of "One page works everywhere"). I will graduate in 2022
Spring. I am looking for a SDE job in system/backend/frontend field
after my graduation.

## Education

-   2021-2022 **Master's** in _Electrical and Computer Engineering_ at **_Carnegie Mellon Universiyt_**
-   2016-2020 **Bachelor's** in _Computer & System Engineering_ and _Electrical Engineering_ (Dual Degree) at **_Renssalaer Polytechnic Institute_**

## Personal Projects

1. **[This Website](https://alaudaehong.space)**
    - Mainly use React.js, Redux.js, and Express.js
    - User, Post, and File Upload related functionality implemented.
    - More information can be found in README, or link to repository (you can find it in Others)

---

## Course Projects (Full History)

-   **18613 - Intro to Computer System** (C Language):
    -   **_Data Lab, Bomb Lab, and Attack Lab_**: Concept in bit manipulation, disassembling, and buffer overflow
    -   **_CacheLab_**: Implementing a cache simualtor and experimenting different r/w strategy to improve miss rate.
    -   **_MallocLab_**: Implementing a high-proformance and space-efficient memory allocator with following functions:
        > malloc, free, realloc, calloc
    -   **_TshLab_**: Implementing a Linux Shell supporting the following functions:
        -   built-in functions: quit, jobs, bg job, fg job
        -   execute binary files in foreground/background
    -   **_ProxyLab_**: Building a concurrent HTTP Proxy Server.
        -   HTTP/1.0 GET requests are supported
        -   Cache mechanism implemented
    -   More Info about these Labs can be found [here](http://csapp.cs.cmu.edu/3e/labs.html)

---

-   **CSCI 4220 - Network Programming** (C Language)
    -   **_TFTP Server_**: A LAN TFTP Server complied with [RFC 1350](https://tools.ietf.org/html/rfc1350)
    -   **_Word Game_**: A Word Guess Game with mulitple players in LAN.
    -   **_Chat Room_**: A LAN Chat Room support:
        -   Channel Creating, Deletion, and chat inside channel
        -   Admin Op: Kick user from one or all channel
        -   Direct Message to specific user or channel
    -   **_DHT (Distributed Hash Table)_**: A simplified implementation of P2P based on Kademlia Protocol.

---

-   **ECSE 4790 - Microprocessor System** (C Language)
    -   **_Lab 1_**: Demonstrate serial port I/O
    -   **_Lab 2_**: Demonstrate GPIO and Timers using register or HAL library
        -   GPIO: General Perpose Input/Output
    -   **_Lab 3_**: Demonstrate serial communication using UART and SPI.
        -   UART: Universal Asynchronous Receiver-Transmitter
        -   SPI: Serial Peripheral Interface
    -   **_Lab 4_**: ADC and DAC Demonstration
    -   **_Lab 5_**: Lab 4 with DMA (Direct Memory Access)
    -   **_Lab 6_**: USB interface Demonstration (Host/Slave)

---

-   **CSCI 4210 - Operating System** (C Language)
    -   **_Homework 1_**: Cache Simulator
    -   **_Homework 2_**: Simplified Linux Shell
    -   **_Homework 3_**: Concurrent Board Game Solver
    -   **_Homework 4_**: Concurrent TCP/UDP Chat Server
    -   **_Project_**: Simplified Job Scheduler

---

-   **CSCI 4320 - Parallel Programming** (C Language)
    -   **_Homework 1 & Homework 2_**: Benchmarking SLA (Carry-Lookahead Adder) with/without MPI.
    -   **_Homework 3_**: Benchmarking SLA with/without p2p reduce
    -   **_Homework 4_**: Benchmarking Game of Life with mix of thread/process.
    -   **_Project_**: Benchmarking Matrix Multiplication using MPI/Multithreading.
    -   All benchmarks are done in IBM's Blue-Gene Cluster at [RPI](https://research.rpi.edu/cci).

---

-   **CSCI 4310 - Networking in the Linux Kernel** (C Language)
    -   **_Homework 1 & Homework 2_**:
        -   Develop a system call to read multiply line from socket
        -   Benchmarking with user-space function call
    -   **_Project_**：
        -   Develop a TCP option to change threshold behavior when using Reno Congestion Control Algorithm.
        -   Behavior observed on Wireshark and kernel log.

---

-   **ECSE 4900 - Multidisciplinary Capstone Design** (Python/JavaScript/HTML)
    -   Write a backend server to relay p2p messages in Python
    -   Integrated in team project(Django)

---

## Research/Work Experience (Full History)

### 2019 Jan - 2019 May, as a Programmer

-   Working under supervision of Prof. Meng Wang and her PhDs to implement a Error Correction Algorithm in C#.
-   Rely on multi-threading to improve I/O throughput and CPU utility.
-   Therefore, reducing total running time from over a day to around 3 mins.

---

## Other Course Taken:

| Code      | Course Name                         |
| --------- | ----------------------------------- |
| 18709     | Advanced Cloud Computing            |
| 15619     | Cloud Computing                     |
| 18741     | Computer Network                    |
| 18749     | Build a Reliable Distributed System |
| CSCI 4380 | Database System                     |
`;

class About extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: "resume" };

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        let content;

        if (activeItem === "bio") {
            content = <Bio />;
        } else if (activeItem === "resume") {
            content = <Resume />;
        } else if (activeItem === "others") {
            content = <Others />;
        }

        return (
            <div>
                <NavigationBar isLoggedIn={true} />
                <Container>
                    <Grid celled="internally">
                        <Grid.Row>
                            <Grid.Column width={13}>
                                <Segment
                                    size="large"
                                    style={{ backgroundColor }}
                                >
                                    {content}
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Menu
                                    vertical
                                    fluid
                                    pointing
                                    secondary
                                    style={{ backgroundColor }}
                                >
                                    <Menu.Item
                                        name="bio"
                                        active={activeItem === "bio"}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name="resume"
                                        active={activeItem === "resume"}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name="others"
                                        active={activeItem === "others"}
                                        onClick={this.handleItemClick}
                                    />
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

function Bio() {
    return (
        <>
            <Markdown plugins={[gfm]} children={BioText} />
        </>
    );
}

function Resume() {
    return (
        <>
            <Header size="huge">Resume</Header>{" "}
            <Image src={require("../static/about/Resume.jpg")} fluid />
        </>
    );
}

function Others() {
    return (
        <>
            <Markdown plugins={[gfm]} children={OthersText} />
        </>
    );
}

export default About;
