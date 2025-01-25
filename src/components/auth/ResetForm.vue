<script>
import { useAuthStore } from '@/stores/auth';

export default {
    name: 'ResetForm',
    data: function() {
        return {
            //Values
            email: '',

            //Validate
            valid: false,
            rules: {
                email: [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']
            },

            //Returns
            error : '',
            success: ''
        };
    },
    methods: {
        async onSave() {
                if (this.$refs.form.validate()){
                    this.success = '';
                    this.error = '';
                    let error;
                    let success  = await useAuthStore().remindPassword(this.email).catch((error) => error);

                    console.log(error);

                    if(success.status === 200){
                        this.success = success.data;
                        this.error = '';
                    }
                }

        },

    }
};

</script>
<template>
    <v-form ref="form" class="mt-sm-13 mt-8"  v-model="valid" lazy-validation >
        <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Email</v-label>
        <VTextField v-model="email" :rules="rules.email" required></VTextField>
        <v-btn size="large" color="primary" block submit flat  @click="onSave">Zapomniałem hasła</v-btn>

        <div v-if="error" class="mt-2">
            <v-alert color="error">{{ error }}</v-alert>
        </div>
        <div v-if="success" class="mt-2">
            <v-alert color="success">{{ success }}</v-alert>
        </div>
    </v-form>
</template>
