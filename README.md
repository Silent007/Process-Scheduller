<h2> CPU Process Scheduling | Simulator </h2>

This is an excellent simulator for understanding scheduling algorithms.

This application is specially designed to simulate the short term scheduler
in an operating system. Realize that a real operating system CPU scheduler will
probably use multi level feedback queues, process aging, and any number of combinations
of the algorithms used here, but the application serves as a way to percieve the algorithms visually.


<h5> Scheduling </h5>

The objective of multiprogramming is to have some process running at all times, to maximize CPU utilization.
The objective of time sharing is to switch the CPU among processes so frequently. In uniprocessor only one
process is running. A process migrates between various scheduling queues throughout its lifetime.The process
of selecting processes from among these queues is carried out by a scheduler. The aim of processor scheduling
is to assign processes to be executed by the processor. Scheduling affects the performance of the system,
because it determines which process will wait and which will progress.


<h5> Scheduling Algorithms </h5>


Scheduling algorithms or scheduling policies are mainly used for short-term scheduling. The main objective of
short-term scheduling is to allocate processor time in such a way as to optimize one or more aspects of system behavior.
For these scheduling algorithms assume only a single processor is present. Scheduling algorithms decide which of the processes
in the ready queue is to be allocated to the CPU is basis on the type of scheduling policy and whether that policy is either
preemptive or non-preemptive. For scheduling arrival time and service time are also will play a role.

List of scheduling algorithms are as follows:

 -	First-come, first-served scheduling (FCFS) algorithm
 -	Shortest Job First Scheduling (SJF) algorithm
 -	Shortest Remaining time (SRT) algorithm
 -	Round-Robin Scheduling algorithm


<h5> Technology Stack </h5>

This App is built using modern web technologies like :

 - HTML5 that comprises javascript and css3
 - HTML5 canvas that allows to display scriptable renderings of 2D shapes and bitmap images
 - jQuery Mobile that is a framework for creating mobile web applications

<h5> Download & Run </h5>

This simulator is written in javascript and latest html5 canvas, so it will run on any browser supporting html5 canvas.