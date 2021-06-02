# Yun Hong

Hi, this is Yun Hong. I am currently pursuing M.S. in ECE at CMU. My
concentration is in System (Embedded, Networking, and
HPC/Distributed). But I have a growing interest in web technology
(The beauty of "One page works everywhere"). I will graduate in 2022
Spring. I am looking for a SDE job in system/backend field
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

> Notice: Some repos are not public due to Academic Intigrity

### @**_CMU_**

-   **18709/15719 - Advanced Cloud Computing**

    -   **Project 1 - Advanced Auto-Scaling on AWS**

        -   Part1: Write a tereform to provision resources, and utilize cloudwatch to autoscaling resource.
            -   Autoscaing based on RPS measured by Load Balencer, or request per second.
            -   Measure the workload that one VM can handle without too much latency.
        -   Part2: Custumized cloudwatch of monitor reading send from the application.
            -   Autoscaing based on RPS measured by application, or request per second.
            -   Measure the workload that one VM can handle without too much latency.
        -   Part3: Serverless application, letting AWS to handle autoscaling.
            -   Configure just-enough resource for AWS Lambda Function
            -   Limit max number of VM that running this Lambda function
            -   Consider cold start, as well as setup during cold start.

    -   **Project 2 - Data Engineering on the Cloud**

        -   Part1&2: Write and optimize a Spark Program that does ETL
            -   Use RDD to store data.
            -   Use broadcast to reduce overhead introduced when give each partition shared resources they need.
            -   Use profiling provided by PySpark to analyze the bottleneck of program
            -   Remove/Combine redundant procedure
        -   Part3: Efficient iterative machine learning training.
            -   Partition data to allow parallelism
            -   Use inverted indices to combine features with its partiton
            -   Call relatively inexpensive actions, `count`, to force Spark to evaluate DAG
            -   Use Join to avoid OOM (Out of Memory) Error. Since there are too many features to fit in memory of single machine if using boardcast.

    -   **Project 3 - Resource scheduling in Kubernetes**
        -   Part1: Write a Kubernetes scheduler extender
            -   Use predication to filter pods that cannot be used for current job.
            -   Use priority to priorize jobs so that each job can get best resource under current situation
            -   Avoid blocking by making a machine a "express lane": only fast jobs can run on it
        -   Part2&3: Write job scheduling policies with Kubernetes
            -   Analyze FIFO with random resource allocation.
            -   Analyze FIFO with heterogeneous awareness.
            -   Analyze SJF with heterogeneous awareness.
            -   Design custom policy provides better resource utilization: run jobs that yields best performance per machine

---

-   **18613 - Intro to Computer System** (C Language)
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

### @**_RPI_**

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
| 15619     | Cloud Computing (Ongoing)           |
| 18741     | Computer Network (Ongoing)          |
| 18749     | Build a Reliable Distributed System |
| CSCI 4380 | Database System                     |
