<template>
  <div class="main-container">
    <a-card title="amoCRM Test" :bordered="false">
      <template #extra>
        <a-space>
          <a-popover
            v-if="search.length > 0 && search.length < 3"
            placement="left"
          >
            <template #content> Поиск работает от 3 символов </template>
            <WarningOutlined style="color: #fa9528" />
          </a-popover>

          <a-input
            v-model:value="search"
            placeholder="Найти..."
            style="width: 200px"
          >
            <template #suffix>
              <search-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </template>
          </a-input>
        </a-space>
      </template>
      <a-table
        :columns="columns"
        :data-source="leads"
        :expand-column-width="100"
        :expandRowByClick="true"
        :loading="loader"
        :pagination="{
          pageSize: 8,
          showSizeChanger: false,
        }"
        :scroll="{ y: 400 }"
      >
        <template #expandedRowRender="{ record }">
          <a-space v-if="record.contact">
            <a-avatar :size="24">
              <user-outlined style="color: #fff" />
            </a-avatar>
            <p style="margin: 0">
              {{ record.contact.name }}
            </p>
            <a
              :href="`tel:${((record?.contact as Contact)?.custom_fields_values?.find((item) => item.field_code == 'PHONE' )?.values[0]?.value) ?? ''}`"
            >
              <PhoneOutlined />
            </a>
            <a
              :href="`mailto:${((record?.contact as Contact)?.custom_fields_values?.find((item) => item.field_code == 'EMAIL' )?.values[0]?.value) ?? ''}`"
            >
              <MailOutlined />
            </a>
          </a-space>
          <p v-else>Без контакта</p>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <span>
              <a-tag :color="record.status.color" class="lead-status">
                {{ record.status.name }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'responsibleUser'">
            <span>
              <a-avatar
                :size="24"
                style="background-color: rgb(24, 144, 255); margin-right: 8px"
              >
                <user-outlined style="color: #fff" />
              </a-avatar>
              {{ record.responsibleUser }}
            </span>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  SearchOutlined,
  PhoneOutlined,
  MailOutlined,
  WarningOutlined,
} from "@ant-design/icons-vue";
import { getContacts, getLeads, getPipelines, getUsers } from "./api/request";
import { ref, watch } from "vue";
import type { Ref } from "vue";
import type {
  Contact,
  ContactCustomField,
  Lead,
  Status,
  User,
} from "./api/types";
import moment from "moment";
import { Pagination } from "ant-design-vue";

const search = ref("");
let searchTimer: number | undefined = undefined;
const leads: Ref<Lead[]> = ref([]);
const statuses: { [key: string]: Status[] } = {};
const users: Ref<User[]> = ref([]);
const contacts: Ref<Contact[]> = ref([]);
const loader = ref(true);

const loadPipelines = () => {
  return new Promise((resolve) => {
    getPipelines()
      .then((data) => {
        if (data) {
          data._embedded.pipelines.map((pipeline) => {
            statuses[pipeline.id] = pipeline._embedded.statuses;
          });
        }
      })
      .finally(() => resolve(true));
  });
};

const loadUsers = () => {
  return new Promise((resolve) => {
    getUsers()
      .then((data) => {
        if (data) {
          users.value = data._embedded.users;
        }
      })
      .finally(() => resolve(true));
  });
};

const loadContacts = () => {
  return new Promise((resolve) => {
    getContacts()
      .then((data) => {
        if (data) {
          contacts.value = data._embedded.contacts;
        }
      })
      .finally(() => resolve(true));
  });
};

const loadLeads = (search?: string) => {
  loader.value = true;
  getLeads(search)
    .then((data) => {
      if (data) {
        leads.value = [];
        data._embedded.leads.map((lead) =>
          leads.value.push({
            key: lead.id,
            name: lead.name,
            price: lead.price.toLocaleString("ru-RU").replace(/,/g, " "),
            status: statuses[lead.pipeline_id].find(
              (status) => status.id == lead.status_id
            ),
            responsibleUser:
              users.value.find((user) => user.id == lead.responsible_user_id)
                ?.name ?? "",
            date: moment(lead.created_at * 1000).format("DD.MM.YYYY HH:MM"),
            contact: contacts.value.find(
              (contact) => contact.id == lead._embedded?.contacts?.[0]?.id
            ),
          })
        );
      }
    })
    .finally(() => {
      loader.value = false;
    });
};

Promise.all([loadPipelines(), loadUsers(), loadContacts()]).then(() => {
  loadLeads();
});

watch(search, (oldSearch, newSearch) => {
  clearTimeout(searchTimer);
  if (newSearch.length >= 3)
    searchTimer = setTimeout(() => {
      loadLeads(newSearch);
    }, 1500);
});

const columns = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Бюджет",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Статус",
    key: "status",
  },
  {
    title: "Ответственный",
    key: "responsibleUser",
  },
  {
    title: "Дата создания",
    dataIndex: "date",
    key: "date",
  },
];
</script>

<style scoped>
.main-container {
  padding: 32px 16px;
}
.lead-status {
  color: rgb(102, 102, 102);
}
</style>
