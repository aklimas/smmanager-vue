<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { router } from '@/router';

export default {
    name: 'ResetPasswordForm',
    data: function() {
        return {
            //Values
            password1: '',
            password2: '',

            //Validate
            valid: false,
            rules: {
                password: [(v) => !!v || 'E-mail is required'],
                passwordRepeat: [(v) => !!v || 'E-mail is required']
            },

            //Returns
            error : '',
            success: ''
        };
    },
    async created() {
        let success  = await useAuthStore().checkToken(this.$route.query.token);
        console.log(success);
        if (this.$route.query.token === undefined || success.data === false) {
            router.push({path: '/'})
        }
    },

    methods: {
        async onSave() {

            if(this.password1 === this.password2){
                if (this.$refs.form.validate()){

                    this.success = '';
                    this.error = '';
                    let error;
                    let success  = await useAuthStore().resetPassword(this.password1, this.$route.query.token)
                        .catch((error) => error);

                    if(success.status === 200){
                        this.success = success.data;
                        this.error = '';
                        router.push({path: '/'})
                    }
                }
            }else{
                this.error = 'Hasła muszą być jednakowe';
            }



        },

    }
};

</script>
<template>
    <v-form ref="form" class="mt-sm-13 mt-8"  v-model="valid" lazy-validation >
        <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Hasło</v-label>
        <VTextField type="password" v-model="password1" :rules="rules.password" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Powtórz hasło</v-label>
        <VTextField type="password" v-model="password2" :rules="rules.password" required></VTextField>
        <v-btn size="large" color="primary" block submit flat  @click="onSave">Ustaw nowe hasło</v-btn>

        <div v-if="error" class="mt-2">
            <v-alert color="error">{{ error }}</v-alert>
        </div>
        <div v-if="success" class="mt-2">
            <v-alert color="success">{{ success }}</v-alert>
        </div>

    </v-form>
</template>
