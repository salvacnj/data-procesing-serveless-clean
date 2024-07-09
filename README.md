# MQTT Data Capture and Processing Module

This project focuses on the implementation of a module for capturing and processing data received via MQTT. It includes provisioning infrastructure on AWS using CDK. The implementation is approached in two distinct ways:

## Implementation Approaches

### 1. Declarative CDK Approach

The first approach captures and stores data in DynamoDB solely with declarative CDK code. In this approach, a table in DynamoDB (`deviceRawDataTable`) is defined along with an IoT rule that has an action to store the received messages. This option presents a limitation in data processing, restricting us to the SQL modifications allowed by AWS. More details on AWS IoT SQL reference can be found [here](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sql-reference.html).

### 2. Lambda Function with Clean Architecture

The second approach uses a Lambda function to carry out the data processing. It is implemented in TypeScript, applying the Clean Architecture design approach. This method allows for greater complexity in implementation while ensuring the code remains flexible, maintainable, and scalable. For a brief explanation of Clean Architecture, refer to [this article by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## What is AWS CDK?

The AWS Cloud Development Kit (CDK) is an open-source software development framework to define cloud infrastructure in code and provision it through AWS CloudFormation. It allows you to use programming languages like TypeScript, JavaScript, Python, Java, and C# to model and provision your application resources.

### Benefits of Using CDK

- **Code as Infrastructure**: Define your cloud resources using familiar programming languages.
- **High-Level Constructs**: Utilize pre-built constructs for common tasks, reducing boilerplate code.
- **Reusable Components**: Create and share reusable components across projects.
- **Automation**: Automate provisioning and deployment processes.
- **Safety**: Leverage the safety and consistency of AWS CloudFormation.

## What is Clean Architecture?

Clean Architecture is a software design philosophy that emphasizes separation of concerns, making the codebase more modular, testable, and maintainable. It structures the system into layers with distinct responsibilities, ensuring that business logic is independent of frameworks and external systems.

### Benefits of Clean Architecture

- **Separation of Concerns**: Divides the system into layers with specific roles, enhancing clarity.
- **Testability**: Makes it easier to test the core business logic without dependencies on external systems.
- **Flexibility**: Allows swapping out technologies with minimal impact on the business logic.
- **Maintainability**: Improves the ease of maintaining and updating the system.


## Project Structure

The project is organized as follows:

- **bin/**: CDK application entry point.
- **cdk.out/**: Generated output from the CDK deployment.
- **front-demo/**: Frontend demo project to demonstrate the device data fetching.
- **lib/**: Contains the CDK stack definition.
- **simulator/**: Bash script to inject mock device data into the MQTT broker.
- **src/**: Source code for the Lambda function and other application logic.
- **test/**: Contains test files.
  - **use-cases.test.ts**: Test cases for different use cases.
- **cdk.json**: CDK project configuration.
- **jest.config.js**: Jest configuration for running tests.
- **package.json**: Contains project metadata and dependencies.
- **tsconfig.json**: TypeScript configuration file.


## CDK

The `cdk.json` file tells the CDK Toolkit how to execute your app.

### Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
