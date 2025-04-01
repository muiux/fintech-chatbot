## Deployment Plan (AWS)

To deploy the application on AWS, follow this architecture:

### Backend

1. **Application Deployment**

   - Deploy the FastAPI backend using **AWS Fargate (ECS)** for a serverless containerized approach, or **EC2** for more control over the instances.
   - Use **Application Load Balancer (ALB)** for handling traffic distribution.

2. **Database**

   - Use **Amazon RDS (MySQL)** to store and manage chat history with automated backups and scaling.
   - Enable **Multi-AZ deployment** for high availability and failover support.

3. **Environment Variables & Secrets**
   - Store sensitive information like database credentials, API keys, and JWT secrets in **AWS Secrets Manager** for secure retrieval by the application.

### Frontend

1. **Application Hosting**

   - Deploy the React (Vite) frontend using **AWS Amplify** for an automated CI/CD pipeline.
   - Alternatively, use **Amazon S3** to store static files and serve them via **CloudFront** for global low-latency access.

2. **Routing & SSL**
   - Use **Amazon Route 53** for custom domain management.
   - Enable **SSL/TLS certificates via AWS Certificate Manager (ACM)** for secure HTTPS access.

### Infrastructure

1. **Infrastructure as Code (IaC)**

   - Use **Terraform** or **AWS CloudFormation** to define and automate infrastructure provisioning.
   - Implement **IAM roles and security policies** to manage permissions securely.

2. **Container Management**
   - Store and manage Docker images in **Amazon Elastic Container Registry (ECR)** for seamless deployment to ECS or EC2.

This architecture ensures scalability, security, and automation for deploying the application on AWS efficiently.

## Approach & Architectural Decisions

In this project, I implemented a Retrieval-Augmented Generation (RAG) system and developed a custom chat UI. Below are the key architectural decisions and approaches I took:

1. RAG Integration

- First, I retrieved relevant data from the Pinecone vector database. The returned results included a score indicating the relationship between the input query and the vector data. If the score is below 0.3, I fall back to generating a response using the model's own knowledge.

- For AI-powered responses, I leveraged the Gemini model. I refined the prompt multiple times to enhance the quality of the responses, using data retrieved from Pinecone to ensure more accurate and context-aware outputs.

2. Chat UI

- I designed a simple chat UI inspired by ChatGPT. One of the key features I implemented was infinite scrolling, allowing for smooth, continuous conversations without the need for pagination. This optimized the user experience by eliminating the need for manual scrolling.

- An additional feature I considered is supporting multiple chat sessions, similar to how ChatGPT operates. However, since the current setup uses infinite scrolling within a single session, this serves as an alternative to the multiple session approach. If desired, I can provide an updated version of the code that incorporates multiple chat sessions when the limit of one session is reached.
