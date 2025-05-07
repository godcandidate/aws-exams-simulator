export const questions = [
  {
    id: 1,
    question:
      "A company needs to assess and audit all the configurations in their AWS account. It must enforce strict compliance by tracking all configuration changes made to any of its Amazon S3 buckets. Publicly accessible S3 buckets should also be identified automatically to avoid data breaches. Which of the following options will meet this requirement?",
    options: [
      { id: "a", text: "Use AWS Config to set up a rule in your AWS account." },
      {
        id: "b",
        text: "Use AWS CloudTrail and review the event history of your AWS account.",
      },
      { id: "c", text: "Use AWS IAM to generate a credential report." },
      {
        id: "d",
        text: "Use AWS Trusted Advisor to analyze your AWS environment.",
      },
    ],
    correctAnswer: "a",
    explanation:
      "AWS Config is the most suitable service for this requirement as it continuously monitors and records AWS resource configurations and allows you to automate the evaluation of recorded configurations against desired configurations. It can track changes to S3 bucket configurations, including permissions, and identify publicly accessible buckets through managed rules like 's3-bucket-public-read-prohibited' and 's3-bucket-public-write-prohibited'. This ensures compliance and helps prevent data breaches by flagging non-compliant configurations. AWS CloudTrail (option b) logs API calls but is not designed for continuous configuration monitoring or compliance evaluation. AWS IAM credential reports (option c) focus on user access, not resource configurations. AWS Trusted Advisor (option d) provides recommendations but lacks the detailed configuration tracking and rule-based compliance checks of AWS Config.",
  },
  {
    id: 2,
    question:
      "A company is building an internal application that serves as a repository for images uploaded by a couple of users. Whenever a user uploads an image, it would be sent to Kinesis Data Streams for processing before it is stored in an S3 bucket. If the upload was successful, the application will return a prompt informing the user that the operation was successful. The entire processing typically takes about 5 minutes to finish. Which of the following options will allow you to asynchronously process the request to the application from upload request to Kinesis, S3, and return a reply in the most cost-effective manner?",
    options: [
      {
        id: "a",
        text: "Use a combination of SQS to queue the requests and then asynchronously process them using On-Demand EC2 Instances.",
      },
      {
        id: "b",
        text: "Use a combination of Lambda and Step Functions to orchestrate service components and asynchronously process the requests.",
      },
      {
        id: "c",
        text: "Replace the Kinesis Data Streams with an Amazon SQS queue. Create a Lambda function that will asynchronously process the requests.",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Using AWS Lambda and Step Functions (option b) is the most cost-effective and efficient solution for asynchronously processing image uploads. Lambda is serverless, eliminating the need to manage infrastructure, and is billed only for execution time, which is ideal for sporadic workloads like this. Step Functions can orchestrate the workflow, coordinating between Kinesis Data Streams, S3, and Lambda, and handle the asynchronous nature of the 5-minute processing while ensuring a response is sent to the user upon completion. Option a, using SQS with On-Demand EC2 instances, incurs higher costs due to continuous EC2 running costs and requires manual scaling and management. Option c, replacing Kinesis with SQS, may not be suitable if Kinesis is required for real-time stream processing, and it doesn't address orchestration as effectively as Step Functions.",
  },
  {
    id: 3,
    question:
      "In Amazon S3 Standard - Infrequent Access storage class, which of the following statements are true?",
    options: [
      {
        id: "a",
        text: "It is designed for data that is accessed less frequently.",
      },
      {
        id: "b",
        text: "It provides high latency and low throughput performance.",
      },
      {
        id: "c",
        text: "It is designed for data that requires rapid access when needed.",
      },
      { id: "d", text: "Ideal to use for data archiving." },
      {
        id: "e",
        text: "It automatically moves data to the most cost-effective access tier without any operational overhead.",
      },
    ],
    correctAnswer: ["a", "c"],
    explanation:
      "Amazon S3 Standard - Infrequent Access (S3 Standard-IA) is designed for data that is accessed less frequently (option a) but requires rapid access when needed (option c). It offers the same low latency and high throughput as S3 Standard, making it suitable for infrequently accessed data like financial reports that need immediate availability. Option b is incorrect because S3 Standard-IA provides low latency and high throughput, not high latency or low throughput. Option d is incorrect as S3 Standard-IA is not ideal for archiving; S3 Glacier or S3 Glacier Deep Archive are better suited for that. Option e is incorrect because automatic tiering is a feature of S3 Intelligent-Tiering, not S3 Standard-IA.",
  },
  {
    id: 4,
    question:
      "A company has an application that continually sends encrypted documents to Amazon S3. The company requires that the configuration for data access is in line with their strict compliance standards. They should also be alerted if there is any risk of unauthorized access or suspicious access patterns. Which step is needed to meet the requirements?",
    options: [
      {
        id: "a",
        text: "Use Amazon Inspector to alert whenever a security violation is detected on S3.",
      },
      {
        id: "b",
        text: "Use Amazon Readputty to monitor malicious activity on S3.",
      },
      {
        id: "c",
        text: "Use Amazon Recognition to monitor and recognize patterns on S3.",
      },
      {
        id: "d",
        text: "Use AWS CloudTrail to monitor and detect access patterns on S3.",
      },
    ],
    correctAnswer: "d",
    explanation:
      "AWS CloudTrail (option d) is the best choice for monitoring and detecting access patterns on S3 to ensure compliance and identify unauthorized or suspicious activity. CloudTrail logs all API calls made to S3, including access requests, enabling the company to track who accessed the data, when, and how. Combined with Amazon CloudWatch or AWS Security Hub, it can generate alerts for suspicious patterns. Amazon Inspector (option a) is used for vulnerability assessment on EC2 instances, not S3. Amazon Readputty (option b) does not exist. Amazon Recognition (option c) is for image and video analysis, not access monitoring.",
  },
  {
    id: 5,
    question:
      "An insurance company utilizes SAP HANA for its day-to-day ERP operations. Since they can't migrate this database due to customer preferences, they need to integrate it with the current AWS workload in the VPC in which they are required to establish a site-to-site VPN connection. What needs to be configured outside of the VPC for them to have a successful site-to-site VPN connection?",
    options: [
      {
        id: "a",
        text: "An Internet-routable IP address (static) of the customer gateway's external interface for the on-premises network.",
      },
      { id: "b", text: "An EIP to the Virtual Private Gateway." },
      {
        id: "c",
        text: "The main route table in your VPC to route traffic through a NAT instance.",
      },
    ],
    correctAnswer: "a",
    explanation:
      "For a successful site-to-site VPN connection, an Internet-routable (static) IP address for the customer gateway's external interface on the on-premises network (option a) is required. This IP address is used by AWS to establish the VPN tunnel to the Virtual Private Gateway in the VPC. Option b is incorrect because the Virtual Private Gateway does not require an Elastic IP (EIP); AWS manages its connectivity. Option c is incorrect as the main route table configuration is within the VPC, not outside, and a NAT instance is not relevant for a site-to-site VPN.",
  },
  {
    id: 6,
    question:
      "A multinational company currently operates multiple AWS accounts to support its operations across various branches and business units. The company needs a more efficient and secure approach in managing its vast AWS infrastructure to avoid costly operational overhead. To address this, they plan to transition to a consolidated, multi-account architecture while integrating a centralized corporate directory service for authentication purposes. Which combination of options can be used to meet the above requirements?",
    options: [
      {
        id: "a",
        text: "Integrate AWS IAM Identity Center with the corporate directory service for centralized authentication. Configure a service control policy (SCP) to manage the AWS accounts.",
      },
      {
        id: "b",
        text: "Implement AWS Organizations to create a multi-account architecture that provides a consolidated view and centralized management of AWS accounts.",
      },
      {
        id: "c",
        text: "Establish an identity pool through Amazon Cognito and adjust the AWS IAM Identity Center settings to allow Amazon Cognito authentication.",
      },
      {
        id: "d",
        text: "Set up a new entity in AWS Organizations and configure its authentication system to utilize AWS Directory Service directly.",
      },
      {
        id: "e",
        text: "Utilize AWS CloudTrail to enable centralized logging and monitoring across all AWS accounts.",
      },
    ],
    correctAnswer: ["a", "b"],
    explanation:
      "AWS Organizations (option b) enables a multi-account architecture, providing centralized management, consolidated billing, and governance through Service Control Policies (SCPs). Integrating AWS IAM Identity Center with the corporate directory service (option a) allows centralized authentication, leveraging existing user identities for secure access across accounts. Option c is incorrect because Amazon Cognito is typically used for application-level authentication, not centralized AWS account management. Option d is incorrect as AWS Organizations does not directly integrate with AWS Directory Service for authentication; IAM Identity Center is the appropriate service. Option e, while useful for logging, does not address the multi-account architecture or authentication requirements.",
  },
  {
    id: 7,
    question:
      "A company has developed public APIs hosted in Amazon EC2 instances behind an Elastic Load Balancer. The APIs will be used by various clients from their respective on-premises data centers. A Solutions Architect received a report that the web service clients can only access trusted IP addresses whitelisted on their firewalls. What should you do to accomplish the above requirement?",
    options: [
      {
        id: "a",
        text: "Associate an Elastic IP address to an Application Load Balancer.",
      },
      {
        id: "b",
        text: "Associate an Elastic IP address to a Network Load Balancer.",
      },
      {
        id: "c",
        text: "Create a CloudFront distribution whose origin points to the private IP addresses of your web servers.",
      },
      {
        id: "d",
        text: "Create an Alias Record in Route 53 which maps to the DNS name of the load balancer.",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Associating an Elastic IP address to a Network Load Balancer (option b) provides static IP addresses that clients can whitelist on their firewalls. Network Load Balancers support Elastic IPs, ensuring consistent IPs for API access, which is critical for clients with strict firewall rules. Option a is incorrect because Application Load Balancers do not support Elastic IPs. Option c is incorrect as CloudFront uses dynamic edge location IPs, which are not suitable for whitelisting. Option d is incorrect because a Route 53 Alias Record does not provide static IPs; it resolves to the load balancer’s DNS, which may change.",
  },
  {
    id: 8,
    question:
      "A business has a network of surveillance cameras installed within the premises of its data center. Management wants to leverage Artificial Intelligence to monitor and detect unauthorized personnel entering restricted areas. Should an unauthorized person be detected, the security team must be alerted via SMS. Which solution satisfies the requirement?",
    options: [
      {
        id: "a",
        text: "Use Amazon Kinesis Video to stream live feeds from the cameras. Use Amazon Rekognition to detect authorized personnel. Set the phone numbers of the security as subscribers to an SNS topic.",
      },
      {
        id: "b",
        text: "Replace the existing cameras with AWS IoT. Upload a face detection model to the AWS IoT devices and send them over to AWS Control Tower for checking and notification.",
      },
      {
        id: "c",
        text: "Configure Amazon Elastic Transcoder to stream live feeds from the cameras. Use Amazon Kendra to detect authorized personnel. Set the phone numbers of the security as subscribers to an SNS topic.",
      },
      {
        id: "d",
        text: "Set up Amazon Managed Service for Prometheus to stream live feeds from the cameras. Use Amazon Fraud Detector to detect unauthorized personnel. Set the phone numbers of the security as subscribers to an SNS topic.",
      },
    ],
    correctAnswer: "a",
    explanation:
      "Using Amazon Kinesis Video Streams to stream live feeds, Amazon Rekognition for facial recognition to detect unauthorized personnel, and Amazon SNS to send SMS alerts (option a) is the most suitable solution. Kinesis Video Streams handles real-time video, Rekognition is designed for image and video analysis, including facial recognition, and SNS enables SMS notifications. Option b is impractical as replacing cameras with AWS IoT devices is unnecessary and AWS Control Tower is for governance, not notifications. Option c is incorrect because Elastic Transcoder is for media transcoding, not live streaming, and Kendra is for search, not personnel detection. Option d is incorrect as Prometheus is for metrics monitoring, and Fraud Detector is for fraud detection, not facial recognition.",
  },
  {
    id: 9,
    question:
      "A company has a serverless application made up of AWS Amplify, Amazon API Gateway, and a Lambda function. The application is connected to an Amazon RDS MySQL database instance inside a private subnet. A Lambda Function URL is also implemented as the dedicated HTTPS endpoint for the function. There are times during peak loads when the database throws a 'too many connections' error preventing the users from accessing the application. Which solution could the company take to resolve the issue?",
    options: [
      {
        id: "a",
        text: "Increase the memory allocation of the Lambda function.",
      },
      { id: "b", text: "Increase the return of API Gateway." },
      {
        id: "c",
        text: "Provision an RDS Proxy between the Lambda function and RDS database instance.",
      },
    ],
    correctAnswer: "c",
    explanation:
      "Provisioning an RDS Proxy (option c) resolves the 'too many connections' error by pooling and managing database connections, allowing Lambda functions to share connections efficiently during peak loads. RDS Proxy maintains persistent connections to the database, reducing the number of open connections and improving scalability. Option a, increasing Lambda memory, may improve performance but does not address database connection limits. Option b, increasing API Gateway return, is not a valid concept and does not solve the connection issue.",
  },
  {
    id: 10,
    question:
      "A media company hosts large volumes of archive data that are about 250 TB in size on their internal servers. They have decided to move these data to S3 because of its durability and redundancy. The company currently has a 100 Mbps dedicated line connecting their head office to the internet. Which of the following is the FASTEST and the MOST cost-effective way to import all these data to Amazon S3?",
    options: [
      {
        id: "a",
        text: "Establish an AWS Direct Connect connection then transfer the data over to S3.",
      },
      { id: "b", text: "Use AWS Snowmobile to transfer the data over to S3." },
      {
        id: "c",
        text: "Order multiple AWS Snowball devices to upload the files to Amazon S3.",
      },
      { id: "d", text: "Upload it directly to S3." },
    ],
    correctAnswer: "c",
    explanation:
      "Ordering multiple AWS Snowball devices (option c) is the fastest and most cost-effective way to transfer 250 TB of data to S3. Snowball is designed for large-scale data transfers, offering high-speed, offline data transfer without relying on internet bandwidth. A 100 Mbps connection (option d) would take months to transfer 250 TB, making it impractical. AWS Snowmobile (option b) is overkill, designed for petabyte-scale transfers, and is more expensive. AWS Direct Connect (option a) improves bandwidth but is costly to set up and still slower than Snowball for this volume.",
  },
  {
    id: 11,
    question:
      "A company is running a custom application in an Auto Scaling group of Amazon EC2 instances. Several instances are failing due to insufficient swap space. The Solutions Architect has been instructed to troubleshoot the issue and effectively monitor the available swap space of each EC2 instance. Which of the following options fulfills this requirement?",
    options: [
      {
        id: "a",
        text: "Create a CloudWatch dashboard and monitor the SwapUsed metric.",
      },
      {
        id: "b",
        text: "Enable detailed monitoring on each instance and monitor the SwapUtilization metric.",
      },
      {
        id: "c",
        text: "Create a new trail in AWS CloudTrail and configure Amazon CloudWatch Logs to monitor your trail logs.",
      },
      {
        id: "d",
        text: "Install the CloudWatch agent on each instance and monitor the SwapUtilization metric.",
      },
    ],
    correctAnswer: "d",
    explanation:
      "Installing the CloudWatch agent on each EC2 instance and monitoring the SwapUtilization metric (option d) is the correct solution. The CloudWatch agent allows for custom metrics, including swap space usage, which is not available in default CloudWatch metrics. This enables effective monitoring and troubleshooting of swap space issues. Option a is incorrect because SwapUsed is not a standard CloudWatch metric. Option b is incorrect as enabling detailed monitoring does not provide swap space metrics, and SwapUtilization requires the CloudWatch agent. Option c is incorrect because CloudTrail logs API activity, not system-level metrics like swap space.",
  },
  {
    id: 12,
    question:
      "An organization stores and manages financial records of various companies in its on-premises data center, which is almost out of space. The management decided to move all of their existing records to a cloud storage service. All future financial records will also be stored in the cloud. For additional security, all records must be prevented from being deleted or overwritten. Which of the following should you do to meet the above requirement?",
    options: [
      {
        id: "a",
        text: "Use AWS DataSync to move the data. Store all of your data in Amazon S3 and enable object lock.",
      },
      {
        id: "b",
        text: "Use AWS Storage Gateway to establish hybrid cloud storage. Store all of your data in Amazon EBS and enable object lock.",
      },
    ],
    correctAnswer: "a",
    explanation:
      "Using AWS DataSync to move the data and storing it in Amazon S3 with Object Lock enabled (option a) meets the requirement. DataSync efficiently transfers large volumes of data to S3, and S3 Object Lock ensures that records cannot be deleted or overwritten for a specified period, providing immutability for compliance. Option b is incorrect because Amazon EBS is block storage for EC2 instances, not suitable for long-term record storage, and does not support Object Lock, which is an S3 feature.",
  },
  {
    id: 13,
    question:
      "An organization needs to control the access for several S3 buckets. They plan to use a gateway endpoint to allow access to trusted buckets. Which of the following could help you achieve this requirement?",
    options: [
      { id: "a", text: "Generate a bucket policy for trusted VPCs." },
      { id: "b", text: "Generate an endpoint policy for trusted VPCs." },
    ],
    correctAnswer: "b",
    explanation:
      "Generating an endpoint policy for trusted VPCs (option b) is the correct approach. A VPC gateway endpoint for S3 allows resources in the VPC to access S3 without traversing the public internet, and an endpoint policy can restrict access to specific S3 buckets, ensuring only trusted buckets are accessible. Option a, a bucket policy, can control access but does not leverage the gateway endpoint’s capabilities for secure, private access within the VPC.",
  },
  {
    id: 14,
    question:
      "A software company has resources hosted in AWS and on-premises servers. You have been requested to create a decoupled architecture for applications which make use of both resources. Which of the following options are valid?",
    options: [
      {
        id: "a",
        text: "Use SQS to utilize both on-premises servers and EC2 instances for your decoupled application.",
      },
    ],
    correctAnswer: ["a"],
    explanation:
      "Using Amazon SQS (option a) is a valid approach for creating a decoupled architecture. SQS allows both on-premises servers and EC2 instances to send and receive messages asynchronously, enabling loose coupling between components. This ensures that the application can process tasks independently, improving scalability and resilience. The question lists only one option, but SQS is well-suited for this use case due to its ability to integrate with both AWS and on-premises environments.",
  },
  {
    id: 15,
    question:
      "For data privacy, a healthcare company has been asked to comply with the Health Insurance Portability and Accountability Act (HIPAA). The company stores all its backups on an Amazon S3 bucket. It is required that data stored on the S3 bucket must be encrypted. What is the best option to do this?",
    options: [
      {
        id: "a",
        text: "Enable Server-Side Encryption on an S3 bucket to make use of AES-256 encryption.",
      },
      {
        id: "b",
        text: "Store the data on EBS volumes with encryption enabled instead of using Amazon S3.",
      },
      {
        id: "c",
        text: "Enable Server-Side Encryption on an S3 bucket to make use of AES-128 encryption.",
      },
      { id: "d", text: "Store the data in encrypted EBS snapshots." },
      {
        id: "e",
        text: "Before sending the data to Amazon S3 over HTTPS, encrypt the data locally first using your own encryption keys.",
      },
    ],
    correctAnswer: ["a", "e"],
    explanation:
      "To comply with HIPAA, enabling Server-Side Encryption with AES-256 on the S3 bucket (option a) ensures that data is automatically encrypted at rest using AWS-managed keys, meeting security requirements with minimal overhead. Alternatively, encrypting data locally before uploading to S3 over HTTPS (option e) using customer-managed keys provides greater control and also satisfies HIPAA requirements. Option b and d are incorrect because EBS is not suitable for long-term backup storage compared to S3. Option c is incorrect as AES-128 is less secure than AES-256, which is preferred for HIPAA compliance.",
  },
  {
    id: 16,
    question:
      "A company has a requirement to move 80 TB data warehouse to the cloud. It would take 2 months to transfer the data given their current bandwidth allocation. Which is the most cost-effective service that would allow you to quickly upload their data into AWS?",
    options: [
      { id: "a", text: "Amazon S3 Multipart Upload" },
      { id: "b", text: "AWS Direct Connect" },
      { id: "c", text: "AWS Snowball Edge" },
      { id: "d", text: "AWS Snowmobile" },
    ],
    correctAnswer: "c",
    explanation:
      "AWS Snowball Edge (option c) is the most cost-effective and fastest way to transfer 80 TB of data to AWS. Snowball Edge devices are designed for large-scale data transfers, allowing offline data migration that bypasses slow internet connections. Given the 2-month transfer time over the current bandwidth, Snowball Edge significantly reduces transfer time. Option a, S3 Multipart Upload, is slow over limited bandwidth. Option b, AWS Direct Connect, is expensive and still limited by bandwidth. Option d, AWS Snowmobile, is designed for petabyte-scale transfers and is unnecessarily costly for 80 TB.",
  },
  {
    id: 17,
    question:
      "A company is hosting its web application in an Auto Scaling group of EC2 instances behind an Application Load Balancer. Recently, the Solutions Architect identified a series of SQL injection attempts and cross-site scripting attacks to the application, which had adversely affected their production data. Which of the following should the Architect implement to mitigate this kind of attack?",
    options: [
      {
        id: "a",
        text: "Using AWS Firewall Manager, set up security rules that block SQL injection and cross-site scripting attacks. Associate the rules to the Application Load Balancer.",
      },
      {
        id: "b",
        text: "Set up security rules that block SQL injection and cross-site scripting attacks in AWS Web Application Firewall (WAF). Associate the rules to the Application Load Balancer.",
      },
      {
        id: "c",
        text: "Use Amazon GuardDuty to prevent any further SQL grafting and cross-site scripting attacks in your application.",
      },
      {
        id: "d",
        text: "Block all the IP addresses where the SQL injection and cross-site scripting attacks originated using the Network Access Control List.",
      },
    ],
    correctAnswer: "b",
    explanation:
      "AWS Web Application Firewall (WAF) (option b) is designed to protect web applications from common attacks like SQL injection and cross-site scripting (XSS). By setting up WAF rules and associating them with the Application Load Balancer, the architect can filter malicious traffic before it reaches the application. Option a is incorrect because AWS Firewall Manager is used to manage firewall rules across accounts, not to directly block SQL injection or XSS. Option c is incorrect as Amazon GuardDuty is for threat detection, not real-time prevention. Option d is impractical as blocking IPs via NACLs is reactive and cannot scale to address dynamic attack patterns.",
  },
  {
    id: 18,
    question:
      "A company receives semi-structured and structured data from different sources, which are eventually stored in their Amazon S3 data lake. The Solutions Architect plans to use big data processing frameworks to analyze these data and access it using various business intelligence tools and standard SQL queries. Which of the following provides the MOST high-performing solution that fulfills this requirement?",
    options: [
      {
        id: "a",
        text: "Create an Amazon ECR cluster and store the processed data in Amazon Redshift.",
      },
      {
        id: "b",
        text: "Create an Amazon EC2 instance and store the processed data in Amazon EBS.",
      },
      {
        id: "c",
        text: "Use AWS Glue and store the processed data in Amazon S3.",
      },
      {
        id: "d",
        text: "Use Amazon Managed Service for Apache Flink Studio and store the processed data in Amazon DynamoDB.",
      },
    ],
    correctAnswer: "c",
    explanation:
      "AWS Glue (option c) is the most high-performing solution for processing semi-structured and structured data in an S3 data lake. Glue provides a serverless ETL (Extract, Transform, Load) service that can crawl data, create a catalog, and transform it for analysis. Combined with Amazon Athena, it enables SQL queries for business intelligence tools, leveraging S3’s scalability. Option a is incorrect because Amazon ECR is for container images, not data processing, and Redshift is a data warehouse, not ideal for raw data lakes. Option b is impractical as EC2 with EBS lacks the scalability and integration of Glue. Option d is unsuitable as Flink Studio is for real-time streaming, and DynamoDB is not optimized for SQL-based analytics.",
  },
  {
    id: 19,
    question:
      "A company launched a website that accepts high-quality photos and turns them into a downloadable video montage. The website offers a free and a premium account that guarantees faster processing. All requests by both free and premium members go through a single SQS queue and then processed by a group of EC2 instances that generate the videos. The company needs to ensure that the premium users who paid for the service have higher priority than the free members. How should the company re-design its architecture to address this requirement?",
    options: [
      {
        id: "a",
        text: "Create an SQS queue for free members and another one for premium members. Configure your EC2 instances to consume messages from the premium queue first and if it is empty, poll from the free members' SQS queue.",
      },
      {
        id: "b",
        text: "For the requests made by premium members, set a higher priority in the SQS queue so it will be processed first compared to the requests made by free members.",
      },
      {
        id: "c",
        text: "Use Amazon Kinesis to process the photos and generate the video montage in real-time.",
      },
    ],
    correctAnswer: "a",
    explanation:
      "Creating separate SQS queues for free and premium members (option a) allows the EC2 instances to prioritize processing premium queue messages, ensuring faster service for paying users. The instances can be configured to poll the premium queue first, falling back to the free queue when empty. Option b is incorrect because SQS does not support message-level priority within a single queue. Option c is incorrect as Kinesis is for real-time streaming, not batch processing like video montage creation, and does not address priority.",
  },
  {
    id: 20,
    question:
      "A GraphQL API hosted is hosted in an Amazon EKS cluster with Fargate launch type and deployed using AWS SAM. The API is connected to an Amazon DynamoDB table with an Amazon DynamoDB Accelerator (DAX) as its data store. Both resources are hosted in the us-east-1 region. The AWS IAM authenticator for Kubernetes is integrated into the EKS cluster for role-based access control (RBAC) and cluster authentication. A solutions architect must improve network security by preventing database calls from traversing the public internet. An automated cross-account backup for the DynamoDB table is also required for long-term retention. Which of the following should the solutions architect implement to meet the requirement?",
    options: [
      {
        id: "a",
        text: "Create a DynamoDB interface endpoint. Associate the endpoint to the appropriate route table.",
      },
      {
        id: "b",
        text: "Enable Point-in-Time Recovery (PITR) to restore the DynamoDB table to a particular point in time on the same or a different AWS account.",
      },
      {
        id: "c",
        text: "Create a DynamoDB interface endpoint. Set up a stateless rule using AWS Network Firewall to control all outbound traffic to only use the dynamodb.us-east-1.amazonaws.com endpoint. Integrate the DynamoDB table with Amazon Timestream to allow point-in-time recovery from a different AWS account.",
      },
      {
        id: "d",
        text: "Create a DynamoDB gateway endpoint. Set up a Network Access Control List (NACL) rule that allows outbound traffic to the dynamodb.us-east-1.amazonaws.com gateway endpoint. Use the built-in on-demand DynamoDB backups for cross-account backup and recovery.",
      },
      {
        id: "e",
        text: "Create a DynamoDB gateway endpoint. Associate the endpoint to the appropriate route table. Use AWS Backup to automatically copy the on-demand DynamoDB backups to another AWS account for disaster recovery.",
      },
    ],
    correctAnswer: "e",
    explanation:
      "Creating a DynamoDB gateway endpoint and associating it with the appropriate route table (part of option e) ensures that DynamoDB traffic stays within the AWS network, avoiding the public internet, enhancing security. AWS Backup for cross-account DynamoDB backups (also in option e) provides automated, long-term retention across accounts. Option a is incorrect because DynamoDB uses a gateway endpoint, not an interface endpoint. Option b addresses backups but not network security. Option c is incorrect as Timestream is for time-series data, not DynamoDB backups, and Network Firewall is unnecessary with a gateway endpoint. Option d is incorrect because NACLs are not needed for gateway endpoints, and on-demand backups lack automation.",
  },
  {
    id: 21,
    question:
      "A startup has multiple AWS accounts that are assigned to its development teams. Since the company is projected to grow rapidly, the management wants to consolidate all of its AWS accounts into a multi-account setup. To simplify the login process on the AWS accounts, the management wants to utilize its existing directory service for user authentication. Which combination of actions should a solutions architect recommend to meet these requirements?",
    options: [
      {
        id: "a",
        text: "Configure AWS IAM Identity Center (AWS Single Sign-On) for the organization and integrate it with the company's directory service using the Active Directory Connector.",
      },
      {
        id: "b",
        text: "On the master account, use AWS Organizations to create a new organization with all features turned on. Enable the organization's external authentication and point it to use the company's directory service.",
      },
      {
        id: "c",
        text: "Create an identity pool on Amazon Cognito and configure it to use the company's directory service. Configure AWS IAM Identity Center (AWS Single Sign-On) to accept Cognito authentication.",
      },
      {
        id: "d",
        text: "On the master account, use AWS Organizations to create a new organization with all features turned on. Invite the child accounts to this new organization.",
      },
      {
        id: "e",
        text: "Create Service Control Policies (SCP) in the organization to manage the child accounts.",
      },
    ],
    correctAnswer: ["a", "d"],
    explanation:
      "Configuring AWS IAM Identity Center (AWS Single Sign-On) and integrating it with the company’s directory service using Active Directory Connector (option a) enables centralized authentication, simplifying login across AWS accounts. Using AWS Organizations to create a new organization and inviting child accounts (option d) establishes a multi-account setup for consolidated management. Option b is incorrect as AWS Organizations does not directly support external authentication; IAM Identity Center handles this. Option c is incorrect because Cognito is for application authentication, not AWS account access. Option e is useful but not sufficient alone to meet authentication and consolidation requirements.",
  },
  {
    id: 22,
    question:
      "As part of the Business Continuity Plan of your company, your IT Director instructed you to set up an automated backup of all of the EBS Volumes for your EC2 instances as soon as possible. What is the fastest and most cost-effective solution to automatically back up all of your EBS Volumes?",
    options: [
      {
        id: "a",
        text: "Use Amazon Data Lifecycle Manager (Amazon DLM) to automate the creation of EBS snapshots.",
      },
      {
        id: "b",
        text: "For an automated solution, create a scheduled job that calls the 'create-snapshot' command via the AWS CLI to take a snapshot of production EBS volumes periodically.",
      },
      {
        id: "c",
        text: "Set your Amazon Storage Gateway with EBS volumes as the data source and store the backups in your on-premises servers through the storage gateway.",
      },
      {
        id: "d",
        text: "Use an EBS-cycle policy in Amazon S3 to automatically back up the EBS volumes.",
      },
    ],
    correctAnswer: "a",
    explanation:
      "Amazon Data Lifecycle Manager (DLM) (option a) is the fastest and most cost-effective solution for automating EBS volume backups. DLM allows you to schedule and manage snapshot creation with minimal setup, ensuring regular backups without manual intervention. Option b, using AWS CLI with scheduled jobs, is less efficient and requires more management. Option c, using Storage Gateway, is designed for hybrid storage, not EBS backups, and is unnecessarily complex. Option d is incorrect as there is no 'EBS-cycle policy' in S3 for EBS backups.",
  },
  {
    id: 23,
    question:
      "An Intelligence Agency developed a missile tracking application that is hosted on both development and production AWS accounts. The Intelligence agency's junior developer only has access to the development account. She has received security clearance to access the agency's production account but the access is only temporary and only write access to EC2 and S3 is allowed. Which of the following allows you to issue short-lived access tokens that act as temporary security credentials to allow access to your AWS resources?",
    options: [
      { id: "a", text: "Use AWS Security Token Service (STS)." },
      { id: "b", text: "Use AWS Cognito to issue JSON Web Tokens (JWT)." },
      { id: "c", text: "Use AWS IAM Identity Center." },
      { id: "d", text: "All of the given options are correct." },
    ],
    correctAnswer: "a",
    explanation:
      "AWS Security Token Service (STS) (option a) is the correct choice for issuing short-lived access tokens for temporary access to AWS resources. STS can provide temporary credentials with specific permissions (e.g., write access to EC2 and S3) for the junior developer, ensuring secure and limited access to the production account. Option b, AWS Cognito, is for user authentication in applications, not AWS resource access. Option c, AWS IAM Identity Center, is for centralized SSO, not temporary credentials. Option d is incorrect as only STS meets the requirement.",
  },
  {
    id: 24,
    question:
      "A solutions architect is designing a secure, cost-effective, and highly available storage solution for a company's data. One of the requirements is to ensure that the previous version of a file is preserved and can be retrieved if a modified version is uploaded. Additionally, the company must comply with strict regulatory requirements that mandate data retention in an immutable state for at least 3 years before being moved to an archive. Once archived, the data will only be accessed once a year. How should the solutions architect build the solution?",
    options: [
      {
        id: "a",
        text: "Create an S3 Standard bucket and enable S3 Object Lock in governance mode.",
      },
      {
        id: "b",
        text: "Create an S3 Standard bucket with object-level versioning enabled and configure a lifecycle rule that transfers files to Amazon S3 Glacier Deep Archive after 3 years.",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Creating an S3 Standard bucket with versioning enabled and a lifecycle rule to transfer files to S3 Glacier Deep Archive after 3 years (option b) meets the requirements. Versioning preserves previous file versions, and the lifecycle rule ensures cost-effective archiving for data accessed once a year. S3 Object Lock in governance mode (option a) provides immutability but does not automatically transition to an archive tier, and governance mode can be bypassed by privileged users, which may not meet strict regulatory requirements.",
  },
  {
    id: 25,
    question:
      "A digital media company shares static content to its premium users around the world and also to their partners who syndicate their media files. The company is looking for ways to reduce its server costs and securely deliver their data to their customers globally with low latency. Which combination of services should be used to provide the MOST suitable and cost-effective architecture?",
    options: [
      { id: "a", text: "Amazon S3" },
      { id: "b", text: "AWS Global Accelerator" },
      { id: "c", text: "AWS Lambda" },
      { id: "d", text: "Amazon CloudFront" },
      { id: "e", text: "AWS Fargate" },
    ],
    correctAnswer: ["a", "d"],
    explanation:
      "Using Amazon S3 and Amazon CloudFront (options a and d) provides the most suitable and cost-effective architecture. S3 is ideal for storing static content with high durability, and CloudFront, a CDN, delivers content globally with low latency by caching at edge locations, reducing server costs. Option b, AWS Global Accelerator, is for improving performance of non-cacheable content, not static files. Option c, AWS Lambda, is for compute tasks, not content delivery. Option e, AWS Fargate, is for containerized applications, not static content delivery.",
  },
  {
    id: 26,
    question:
      "A company plans to migrate all of their applications to AWS. The Solutions Architect suggested to store all the data to EBS volumes. The Chief Technical Officer is worried that EBS volumes are not appropriate for the existing workloads due to compliance requirements, downtime scenarios, and IOPS performance. Which of the following are valid points in proving that EBS is the best service to use for migration?",
    options: [
      {
        id: "a",
        text: "An EBS volume is off-instance storage that can persist independently from the life of an instance.",
      },
      {
        id: "b",
        text: "Amazon EBS provides the ability to create snapshots (backups) of any EBS volume and write a copy of the data in the volume to Amazon RDS, where it is stored redundantly in multiple Availability Zones.",
      },
      {
        id: "c",
        text: "EBS volumes support live configuration changes while in production which means that you can modify the volume type, volume size, and IOPS capacity without service interruptions.",
      },
      {
        id: "d",
        text: "When you create an EBS volume in an Availability Zone, it is automatically replicated on a separate AWS region to prevent data loss due to a failure of any single hardware component.",
      },
    ],
    correctAnswer: ["a", "c"],
    explanation:
      "EBS volumes are off-instance storage that persist independently from EC2 instances (option a), making them suitable for durable storage. They also support live configuration changes, allowing modifications to volume type, size, and IOPS without downtime (option c), addressing performance concerns. Option b is incorrect because EBS snapshots are stored in S3, not RDS. Option d is incorrect as EBS volumes are replicated within an Availability Zone, not across regions.",
  },
  {
    id: 27,
    question:
      "A company has two On-Demand EC2 instances inside the Virtual Private Cloud in the same Availability Zone but are deployed to different subnets. One EC2 instance is running a database and the other EC2 instance a web application that connects with the database. You need to ensure that these two instances can communicate with each other for the system to work properly. What are the things you have to check so that these EC2 instances can communicate inside the VPC?",
    options: [
      {
        id: "a",
        text: "Check if the default route is set to a NAT instance or Internet Gateway (IGW) for them to communicate.",
      },
      {
        id: "b",
        text: "Check if all security groups are set to allow the application host to communicate to the database on the right port and protocol.",
      },
      { id: "c", text: "Check if both instances are the same instance class." },
    ],
    correctAnswer: ["b"],
    explanation:
      "Checking security groups to ensure the web application can communicate with the database on the correct port and protocol (option b) is critical for intra-VPC communication. Security groups control traffic, and the database security group must allow inbound traffic from the web application’s security group. Option a is incorrect because a NAT instance or Internet Gateway is for external connectivity, not intra-VPC communication. Option c is irrelevant as instance class does not affect network communication.",
  },
  {
    id: 28,
    question:
      "A media company has two VPCs: VPC-1 and VPC-2 with peering connection between each other. VPC-1 only contains private subnets while VPC-2 only contains public subnets. The company uses a single AWS Direct Connect connection and a virtual interface to connect their on-premises network with VPC-1. Which of the following options increase the fault tolerance of the connection to VPC-1?",
    options: [
      {
        id: "a",
        text: "Establish another AWS Direct Connect connection and private virtual interface in the same AWS region as VPC-1.",
      },
      {
        id: "b",
        text: "Establish a hardware VPN over the Internet between VPC-1 and the on-premises network.",
      },
      {
        id: "c",
        text: "Establish a hardware VPN over the Internet between VPC-2 and the on-premises network.",
      },
      {
        id: "d",
        text: "Use the AWS VPN CloudHub to create a new AWS Direct Connect connection and private virtual interface in the same region as VPC-2.",
      },
      {
        id: "e",
        text: "Establish a new AWS Direct Connect connection and private virtual interface in the same region as VPC-2.",
      },
    ],
    correctAnswer: ["a", "b"],
    explanation:
      "Establishing another AWS Direct Connect connection and private virtual interface in the same region as VPC-1 (option a) increases fault tolerance by providing a redundant, high-bandwidth connection. Adding a hardware VPN over the Internet to VPC-1 (option b) provides a backup connection, enhancing resilience if Direct Connect fails. Option c is incorrect as a VPN to VPC-2 does not directly improve VPC-1 connectivity. Option d is incorrect because VPN CloudHub is for managing multiple VPNs, not Direct Connect. Option e is less effective as it connects to VPC-2, not directly to VPC-1.",
  },
  {
    id: 29,
    question:
      "A company developed a meal planning application that provides meal recommendations for the week as well as the food consumption of the users. The application resides on an EC2 instance which requires access to various AWS services for its day-to-day operations. Which of the following is the best way to allow the EC2 instance to access the S3 bucket and other AWS services?",
    options: [
      { id: "a", text: "Store the API credentials in the EC2 instance." },
      {
        id: "b",
        text: "Create a role in IAM and assign it to the EC2 instance.",
      },
      {
        id: "c",
        text: "Add the API Credentials in the Security Group and assign it to the EC2 instance.",
      },
      { id: "d", text: "Store the API credentials in a bastion host." },
    ],
    correctAnswer: "b",
    explanation:
      "Creating an IAM role and assigning it to the EC2 instance (option b) is the best practice for securely granting access to AWS services like S3. The role provides temporary credentials managed by AWS, eliminating the need to store sensitive credentials. Option a is insecure as storing credentials on the instance risks exposure. Option c is incorrect because security groups control network traffic, not API credentials. Option d is impractical and insecure as bastion hosts are for SSH access, not credential storage.",
  },
  {
    id: 30,
    question:
      "A media company wants to ensure that the images it delivers through Amazon CloudFront are compatible across various user devices. The company plans to serve images in WebP format to user agents that support it and return to JPEG format for those that don't. Additionally, they want to add a custom header to the response for tracking purposes. As a solution architect, what approach would you recommend to meet these requirements while minimizing operational overhead?",
    options: [
      {
        id: "a",
        text: "Create multiple CloudFront distributions, each serving a specific image format (WebP or JPEG). Route incoming requests based on the User-Agent header to the respective distribution using Amazon Route 53.",
      },
      {
        id: "b",
        text: "Implement an image conversion service on EC2 instances and integrate it with CloudFront. Use Lambda functions to modify the response headers and serve the appropriate format based on the User-Agent header.",
      },
      {
        id: "c",
        text: "Configure CloudFront behaviors to handle different image formats based on the User-Agent header. Use Lambda@Edge functions to modify the response headers and serve the appropriate format.",
      },
    ],
    correctAnswer: "c",
    explanation:
      "Configuring CloudFront behaviors and using Lambda@Edge functions (option c) minimizes operational overhead while meeting the requirements. Lambda@Edge can dynamically modify responses to serve WebP or JPEG based on the User-Agent header and add custom headers for tracking, all within the CloudFront distribution. Option a is inefficient due to the complexity of managing multiple distributions and Route 53 routing. Option b is less efficient as it requires managing EC2 instances for image conversion, increasing operational overhead.",
  },
];
