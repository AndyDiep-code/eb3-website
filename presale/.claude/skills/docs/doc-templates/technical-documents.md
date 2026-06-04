# Technical Documents Template

<!--
AI TEMPLATE INSTRUCTIONS:
- Replace all {{PLACEHOLDER}} values with project-specific content
- Delete sections not applicable to the project
- Add ASCII diagrams for visual clarity
- Keep technical accuracy - this is a reference document
- Remove this instruction block after customization
- Use mermaidjs to add diagrams to the document
- Update all TODOs with project-specific content
-->

## System Overview Architecture

- System summary

// TODO:

- Primary Stakeholders/Users

// TODO:

- Main features:

// TODO:

- Design:
  The platform architecture is documented using the C4 model (Context, Containers, Components, Code), which provides a hierarchical set of diagrams for visualizing software architecture at different levels of abstraction.

- C4 Model Levels:

  - Level 1 (Context): System in scope and its relationships with users and external systems with pure business-oriented information

  - Level 2 (Container): High-level technology choices and how containers communicate

  - Level 3 (Component): Internal structure of containers, showing components and their responsibilities

  - Level 4 (Code): Class-level details (deferred to implementation phase)

- Design Principles:

// TODO: Use drawio or mermaidjs to draw all of your C4 diagram

### System Context Diagram

```
// TODO: Your C1 Business-oriented diagram here

// Tips: Focus on major business context(s) of your system/platform
```

(![Sample C1 Diagram](image.png))

// Explanation in words
The System Context diagram shows the platform and its interactions with external actors and systems.

#### Actors/Users

// TODO: Describe main type of users interacting with the platform

#### External Systems

// TODO:

### System Containers Diagram

![Sample C2 Diagram](image-1.png)

```
// TODO: Your C2 Major containers diagram here ( BE, FE, ..) and how they are communicating to each other

// Tips: can split into multiple diagrams for better and cleaner visualized information
```

The Container diagram decomposes the D-Risk AI system into applications, data stores, showing technology choices and inter-container communication.

#### Frontend Containers

// TODO: Frontend application description, technologies used

#### Backend Containers

// TODO: Backend application description, technologies used

#### Container Communication

// TODO:
Protocol: HTTPS
Format: GraphQL queries/mutations
Authentication: JWT Bearer token
API Server → AI Server (REST/HTTPS)
SSL/TLS encryption
Containers → Database (PostgreSQL Protocol)
Asynchronous job queue
Decouples services for background processing
Messages: notification jobs, report generation, export
Containers → Cache (Redis Protocol)
Binary protocol (RESP)
Connection pooling

### System Component Diagram

![alt text](image-2.png)

```
// TODO: Your C3 Components diagram here

// Tips: Decompose your container diagram to all smaller components that reside in it, including their responsibilities and the technology/implementation details.
```

## Infrastructure and Deployment Diagram

![Infrastructure diagram](image-3.png)

![Deployment diagram](image-4.png)

## Coding Convention

- Follow [Company Common Coding Standards](https://gitlab.enouvo.com/development-team/team-standards/-/tree/main/sections/coding-conventions?ref_type=heads)
- Project technical specific conventions

## Development Setup

- Acknowledged [Team Standards](https://gitlab.enouvo.com/development-team/team-standards)
- Step-by-step checklist items to help new members catching up fast to start the project successfully

// TODO: Sample steps

- [] Prerequisites
- [] Required Software
- [] Verify Git installation
- [] Verify Docker installation
- [] Recommended IDEs installation
- [] Required IDE Plugins/Extensions
- [] Project Setup and started in local successfully
- [] Roles and privileges ackowledged
- [] Environment information acknowledged
