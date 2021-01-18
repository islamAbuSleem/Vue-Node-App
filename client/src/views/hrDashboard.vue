<template>
  <div class="dashboard">
    <div>
      <template>
        <div class="text-center">
          <v-snackbar
            color="success"
            class="mt-5 modal"
            v-model="snackbar"
            :timeout="timeout"
            v-if="snackbar"
            absolute
            top
            text
          >
            {{ text }}
          </v-snackbar>
        </div>
      </template>
    </div>
    <div class="edit-user-page">
      <editUser
        :user="userData"
        v-if="show"
        @close="close"
        @save="save"
      ></editUser>
    </div>
    <div class="actions">
      <v-row>
        <v-col>
          <v-btn class="m-auto" color="error" @click="createUser">
            Create user
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <template>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          class="data-table"
          :headers="headers"
          :items-per-page="5"
          :search="search"
          :items="items"
          item-key="userId"
          :expanded.sync="expanded"
          show-expand
          @click:row="clicked"
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="text-xs-right">
              <v-icon
                color="grey darken-2"
                class="edit-icon"
                @click="editUser(item)"
                >mdi-square-edit-outline
              </v-icon>
              <div class="sp-details datatable-cell-wrapper">
                <v-row>
                  <v-col cols="12" sm="4" class="p-5">
                    <span>الاسم</span>
                    <p>{{ item.name }}</p>
                  </v-col>
                  <v-col cols="12" sm="4" class="p-5">
                    <span>رقم الموظف</span>
                    <p>{{ item.userId }}</p>
                  </v-col>
                  <v-col cols="12" sm="4" class="p-5">
                    <span>الايميل</span>
                    <p>{{ item.email }}</p>
                  </v-col>
                  <v-col cols="12" sm="4" class="p-5">
                    <span>الاداره</span>
                    <p>{{ item.dept }}</p>
                  </v-col>
                  <v-col cols="12" sm="4" class="p-5">
                    <span>التيم</span>
                    <p>{{ item.team }}</p>
                  </v-col>
                  <v-col cols="12" sm="4" class="p-5">
                    <span>الدور</span>
                    <p>{{ item.role }}</p>
                  </v-col>
                  <v-col cols="12" sm="4" class="p-5">
                    <span>الرصيد</span>
                    <p>{{ +item.normal + +item.urgent }}</p>
                  </v-col>
                  <v-col cols="12" sm="4" class="p-5">
                    <span>اعتيادي</span>
                    <p>{{ item.normal }}</p>
                  </v-col>
                  <v-col cols="12" sm="4" class="p-5">
                    <span>عارضه</span>
                    <p>{{ item.urgent }}</p>
                  </v-col>
                </v-row>
              </div>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </div>
</template>

<script>
import getUsers from "../services/userOperations";
import editUser from "../components/editUser";
import getDayOff from "../services/dayOffoperations";
export default {
  components: {
    editUser,
  },
  data() {
    return {
      snackbar: false,
      timeout: 1200,
      text: "User Saved Successfully",
      userData: JSON.parse(window.localStorage.getItem("userData")) || "",
      search: "",
      expanded: [],
      show: JSON.parse(window.localStorage.getItem("editUser")) || false,
      headers: [
        {
          text: "الاسم",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "رقم الموظف", value: "userId" },
        { text: "الاداره", value: "dept" },
        { text: "الفريق", value: "team" },
      ],
      items: [],
    };
  },
  created() {
    getUsers.getAllUsers().then((res) => {
      this.items = res.data;
    });
  },
  methods: {
    clicked(value) {
      const index = this.expanded.indexOf(value);
      if (index === -1) {
        this.expanded.push(value);
      } else {
        this.expanded.splice(index, 1);
      }
    },
    editUser(item) {
      this.show = true;
      window.localStorage.setItem("editUser", JSON.stringify(true));
      this.userData = item;
      window.localStorage.setItem("userData", JSON.stringify(item));
    },
    close() {
      this.show = false;
      window.localStorage.setItem("editUser", JSON.stringify(false));
      window.localStorage.removeItem("userData");
    },
    save(data) {
      getDayOff.updateDayOffCount(data.userId, data).then((res) => {
        console.log(res);
        this.snackbar = true;
        this.close();
      });
    },
    createUser() {
        this.$router.push({name: 'register'})
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding-top: 30px;
}
.datatable-cell-wrapper {
  width: inherit;
  position: relative;
  z-index: 4;
  padding: 0 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.data-table {
  position: relative;
}
td {
  box-shadow: inset 0px 1px 8px -5px rgba(50, 50, 50, 0.75),
    inset 0px -4px 3px -5px rgba(50, 50, 50, 0.75) !important;
  background-color: #eee;
}
.edit-icon {
  position: absolute;
  right: 5px;
  cursor: pointer;
  z-index: 9;
}
.edit-user-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal {
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
  padding-top: 20%;
}
</style>