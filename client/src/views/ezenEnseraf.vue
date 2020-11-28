<template>
<div class="duty">
    <form action="" method="POST">
        <h2 class="text-center">إذن</h2>
        <v-row>
            <v-col cols="3">
                <v-select :items="deprt" label="الاداره" class="m-auto" reverse>
                </v-select>
            </v-col>
            <v-col cols="3" class="ml-auto">
                <v-text-field :rules="rules" label="كود الموظف" justify-right reverse></v-text-field>

            </v-col>
            <v-col cols="6" class="ml-auto">
                <v-text-field :rules="rules" label="اسم مقدم الطلب" justify-right reverse></v-text-field>
            </v-col>
        </v-row>
        <h3 class="text-right">ارجو من سيادتكم التكرم بالموافقه علي اذن</h3>

        <v-row>
            <v-col cols="3" class="ml-auto">
                <v-menu v-model="menu2" :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field label=" بتاريخ" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reverse></v-text-field>
                    </template>
                    <v-date-picker no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="3">
                <v-text-field :rules="rules" label="وذلك يوم" hint="بالايام" justify-right reverse></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field :rules="rules" label="اجازه لمده" hint="بالايام" justify-right reverse></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-select :items="deprt" label="التوقيت" class="m-auto" reverse>
                </v-select>
            </v-col>
        </v-row>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            means: ["قطار", "عربه الشركه", "تاكسي", "طائره"]
        }
    }
}
</script>

<style lang="scss" scoped>
.duty {
    margin: 3% auto;
    border: 1px solid #ccc;
    background-color: #fafafa;
    border-radius: 5px;
    padding: 5%;
}
</style>
