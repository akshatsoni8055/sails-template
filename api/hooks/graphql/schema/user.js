const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    profiles: [Profile!]
    profile(id: ID!): Profile
    me: Profile
  }

  type Profile {
    id: ID!
    name: String
    username: String!
    email: String!
    password: String
    role: String
    pic: String
    cover: String
    addresses: [Addresses]
    business: Business
  }

  type Business {
    id: ID!
    owner: String
    isVerified: Boolean
    category: String
    title: String
    description: String
    timing: Timing
  }

  type Timing {
    mon: String
    tue: String
    wed: String
    thu: String
    fri: String
    sat: String
    sun: String
  }

  type Addresses {
    id: ID!
    state: String
    apartmentNo: String
    street: String
    colony: String
    city: String
    country: String
    pin: Int
    landmark: String
    phone: String
  }
`;
