import { gql } from "@apollo/client";
import axios from "axios";

export const GET_PROJECT_LIST_AXIOS = async () => {
  const res = await axios.get("/api", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  return res.data;
};

export const GET_PROJECT_BY_ID_AXIOS = async (id: string) => {
  const res = await axios.get(`/api?filters[id][$eq]=${id}&populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  return res.data;
};

export const GET_PROJECTS_LIST = gql`
  query Projects {
    projects(pagination: { limit: 100 }, sort: "createdAt:desc") {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query ProjectById($id: ID!) {
    project(id: $id) {
      data {
        id
        attributes {
          description
          title
          area
          location
          photos(pagination: { limit: 100 }) {
            data {
              id
              attributes {
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;
