//@ts-ignore
import api from "./index.js";
import type {
  GetContactsResponse,
  GetLeadsResponse,
  GetPipelinesResponse,
  GetUsersResponse,
} from "./types.js";

export const getLeads = (search?: string) => {
  return new Promise<GetLeadsResponse>((response) => {
    response(api.get("/api/v4/leads", { with: "contacts", query: search }));
  });
};

export const getContacts = () => {
  return new Promise<GetContactsResponse>((response) => {
    response(api.get("/api/v4/contacts"));
  });
};

export const getPipelines = () => {
  return new Promise<GetPipelinesResponse>((response) => {
    response(api.get(`/api/v4/leads/pipelines`));
  });
};

export const getUsers = () => {
  return new Promise<GetUsersResponse>((response) => {
    response(api.get("/api/v4/users"));
  });
};
