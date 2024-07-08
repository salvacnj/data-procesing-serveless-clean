# MQTT Data Capture and Processing Module

This project focuses on the implementation of a module for capturing and processing data received via MQTT. It includes provisioning infrastructure on AWS using CDK. The implementation is approached in two distinct ways:

## Implementation Approaches

### 1. Declarative CDK Approach

The first approach captures and stores data in DynamoDB solely with declarative CDK code. In this approach, a table in DynamoDB (`deviceRawDataTable`) is defined along with an IoT rule that has an action to store the received messages. This option presents a limitation in data processing, restricting us to the SQL modifications allowed by AWS. More details on AWS IoT SQL reference can be found [here](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sql-reference.html).

### 2. Lambda Function with Clean Architecture

The second approach uses a Lambda function to carry out the data processing. It is implemented in TypeScript, applying the Clean Architecture design approach. This method allows for greater complexity in implementation while ensuring the code remains flexible, maintainable, and scalable. For a brief explanation of Clean Architecture, refer to [this article by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Project Structure

The project is organized as follows:

- **.vscode/**: Contains Visual Studio Code configuration files.
- **bin/**: CDK application entry point.
- **cdk.out/**: Generated output from the CDK deployment.
- **lib/**: Contains the CDK stack definition.
- **node_modules/**: Node.js dependencies.
- **src/**: Source code for the Lambda function and other application logic.
- **test/**: Contains test files.
  - **use-cases.test.ts**: Test cases for different use cases.
- **.gitignore**: Specifies files to be ignored by Git.
- **.npmignore**: Specifies files to be ignored by npm.
- **cdk.json**: CDK project configuration.
- **jest.config.js**: Jest configuration for running tests.
- **package-lock.json**: Automatically generated file that describes the exact tree of dependencies.
- **package.json**: Contains project metadata and dependencies.
- **README.md**: Project overview and documentation (this file).
- **tsconfig.json**: TypeScript configuration file.

## Getting Started

### Prerequisites

- AWS account with necessary permissions.
- AWS CDK installed.
- Node.js and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mqtt-data-capture.git
   cd mqtt


## CDK

The `cdk.json` file tells the CDK Toolkit how to execute your app.

### Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
# data-procesing-serveless-clean
