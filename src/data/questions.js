export const questions = [
  {
    id: 1,
    question: "Which AWS service is used for storing objects?",
    options: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "Amazon S3" },
      { id: "c", text: "Amazon RDS" },
      { id: "d", text: "Amazon VPC" }
    ],
    correctAnswer: "b",
    explanation: "Amazon S3 (Simple Storage Service) is an object storage service that offers industry-leading scalability, data availability, security, and performance. It's designed for storing and retrieving any amount of data from anywhere on the web."
  },
  {
    id: 2,
    question: "Which AWS service is used for running virtual servers in the cloud?",
    options: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "Amazon S3" },
      { id: "c", text: "Amazon DynamoDB" },
      { id: "d", text: "Amazon CloudFront" }
    ],
    correctAnswer: "a",
    explanation: "Amazon EC2 (Elastic Compute Cloud) provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers, allowing you to run virtual servers in the cloud."
  },
  {
    id: 3,
    question: "Which AWS service is used for managed relational database service?",
    options: [
      { id: "a", text: "Amazon DynamoDB" },
      { id: "b", text: "Amazon Redshift" },
      { id: "c", text: "Amazon RDS" },
      { id: "d", text: "Amazon ElastiCache" }
    ],
    correctAnswer: "c",
    explanation: "Amazon RDS (Relational Database Service) makes it easy to set up, operate, and scale a relational database in the cloud. It provides cost-efficient and resizable capacity while automating time-consuming administration tasks such as hardware provisioning, database setup, patching, and backups."
  },
  {
    id: 4,
    question: "Which AWS service provides a virtual network dedicated to your AWS account?",
    options: [
      { id: "a", text: "Amazon Route 53" },
      { id: "b", text: "Amazon VPC" },
      { id: "c", text: "AWS Direct Connect" },
      { id: "d", text: "Amazon CloudFront" }
    ],
    correctAnswer: "b",
    explanation: "Amazon VPC (Virtual Private Cloud) lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways."
  },
  {
    id: 5,
    question: "Which AWS service is used for NoSQL database?",
    options: [
      { id: "a", text: "Amazon RDS" },
      { id: "b", text: "Amazon Redshift" },
      { id: "c", text: "Amazon DynamoDB" },
      { id: "d", text: "Amazon Aurora" }
    ],
    correctAnswer: "c",
    explanation: "Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale. It's a fully managed, multiregion, multimaster, durable database with built-in security, backup and restore, and in-memory caching for internet-scale applications."
  }
];
