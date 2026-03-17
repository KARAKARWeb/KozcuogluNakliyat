// GraphQL Schema Definition

export const typeDefs = `
  type Query {
    services(limit: Int, offset: Int): [Service!]!
    service(id: ID, slug: String): Service
    regions(limit: Int, offset: Int): [Region!]!
    region(id: ID, slug: String): Region
    blogPosts(limit: Int, offset: Int): [BlogPost!]!
    blogPost(id: ID, slug: String): BlogPost
    reviews(limit: Int, offset: Int): [Review!]!
    messages(limit: Int, offset: Int): [Message!]!
  }

  type Mutation {
    createService(input: ServiceInput!): Service!
    updateService(id: ID!, input: ServiceInput!): Service!
    deleteService(id: ID!): Boolean!
    
    createBlogPost(input: BlogPostInput!): BlogPost!
    updateBlogPost(id: ID!, input: BlogPostInput!): BlogPost!
    deleteBlogPost(id: ID!): Boolean!
    
    createReview(input: ReviewInput!): Review!
    updateReview(id: ID!, input: ReviewInput!): Review!
    deleteReview(id: ID!): Boolean!
    
    createMessage(input: MessageInput!): Message!
  }

  type Service {
    id: ID!
    title: String!
    slug: String!
    content: String!
    excerpt: String
    image: String
    icon: String
    category: String
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Region {
    id: ID!
    title: String!
    slug: String!
    district: String!
    type: String!
    content: String!
    image: String
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type BlogPost {
    id: ID!
    title: String!
    slug: String!
    content: String!
    excerpt: String
    image: String
    category: String
    tags: [String!]
    author: String!
    isPublished: Boolean!
    publishedAt: String
    createdAt: String!
    updatedAt: String!
  }

  type Review {
    id: ID!
    name: String!
    email: String!
    rating: Int!
    comment: String!
    status: String!
    createdAt: String!
  }

  type Message {
    id: ID!
    name: String!
    email: String!
    phone: String
    subject: String
    message: String!
    status: String!
    createdAt: String!
  }

  input ServiceInput {
    title: String!
    slug: String!
    content: String!
    excerpt: String
    image: String
    icon: String
    category: String
    isActive: Boolean
  }

  input BlogPostInput {
    title: String!
    slug: String!
    content: String!
    excerpt: String
    image: String
    category: String
    tags: [String!]
    author: String
    isPublished: Boolean
  }

  input ReviewInput {
    name: String!
    email: String!
    rating: Int!
    comment: String!
  }

  input MessageInput {
    name: String!
    email: String!
    phone: String
    subject: String
    message: String!
  }
`;
