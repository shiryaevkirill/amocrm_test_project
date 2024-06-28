export type LeadResponse = {
  id: number;
  name: string;
  price: number;
  status_id: number;
  created_at: number;
  responsible_user_id: number;
  pipeline_id: number;
  _embedded: {
    contacts: { id: number }[];
  };
};

export type GetLeadsResponse = {
  _embedded: {
    leads: LeadResponse[];
  };
};

export type GetPipelinesResponse = {
  _embedded: {
    pipelines: Pipeline[];
  };
};

export type GetUsersResponse = {
  _embedded: {
    users: User[];
  };
};

export type GetContactsResponse = {
  _embedded: {
    contacts: Contact[];
  };
};

export type Contact = {
  id: number;
  name: string;
  custom_fields_values: ContactCustomField[];
};

export type ContactCustomField = {
  field_code: string;
  values: { value: string }[];
};

export type Lead = {
  key: number;
  name: string;
  price: string;
  status?: Status;
  responsibleUser: string;
  date: string;
  contact?: Contact;
};

export type Pipeline = {
  id: number;
  _embedded: {
    statuses: Status[];
  };
};

export type Status = {
  id: number;
  name: string;
  color: string;
};

export type User = {
  id: number;
  name: string;
};
