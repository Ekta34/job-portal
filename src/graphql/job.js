import { gql } from '@apollo/client';

const jobFields = gql`
  fragment jobFields on Job {
    id
    title
    slug
    company {
      id
      name
      slug
    }
    remotes {
      id
      name
      type
      jobs {
        id
        title
      }
    }
    cities {
      id
      name
      country {
        id
        name
      }
    }
    countries {
      id
      name
    }
    locationNames
  }
`;

export const JOBS = gql`
  query jobs($input: JobsInput) {
    jobs(input: $input) {
      ...jobFields
    }
  }
  ${jobFields}
`;
