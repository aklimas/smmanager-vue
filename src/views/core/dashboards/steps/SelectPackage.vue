<script>
import { packagesStore } from '@/stores/core/packages';
import { useAuthStore } from '@/stores/auth';
import { errorMessage, successMessage } from '@/stores/notifications';
import PackageCard from '@/components/packages/PackageCard.vue';


export default {
    name: 'SelectPackages',
    components: {
        PackageCard
    },
    data: function() {
        return {

            store: packagesStore()
        };
    },
    async mounted() {
        await this.store.publish();
        this.loading = false;
    },
    methods: {
        async buy(item) {

            let dataToPost = {
                user: useAuthStore().user.id,
                package: item.id,
                duration: '14D',
                continue: true
            };

            await this.store.buy(dataToPost)
                .then((response) => {

                    console.log(response);

                    if(response.status == 201){
                        successMessage('Konto zostało uruchomione');
                        this.$router.push('/payment-card'); // Redirect to another page on success
                    } else {
                        errorMessage('Przepraszamy. Problemy techniczne.');
                    }
                    
                    //useAuthStore().user.expiration = response.data.expiration;
                }).catch((error) => {
                    errorMessage(error);
                });
        }
    }
};
</script>


<template>
    <v-row class="pt-3">
        <v-col cols="12" md="4" v-for="card in store.packagesPublish" :key="card.title">
            <PackageCard :card="card" :features="store.features" @buy="buy" />
        </v-col>
    </v-row>
</template>
<style scoped lang="scss">

/*--------------------------------------------------------------
# Pricing Section
--------------------------------------------------------------*/
.pricing .pricing-item {
    background-color: rgba(var(--accent-color-rgb), 0.04);
    padding: 40px 40px;
    height: 100%;
    border-radius: 15px;
}

.pricing h3 {
    font-weight: 600;
    margin-bottom: 15px;
    font-size: 20px;
}

.pricing h4 {
    color: var(--accent-color);
    font-size: 48px;
    font-weight: 700;
    font-family: var(--heading-font);
    margin-bottom: 0;
}

.pricing h4 sup {
    font-size: 28px;
}

.pricing h4 span {
    color: rgba(var(--default-color-rgb), 0.5);
    font-size: 18px;
    font-weight: 500;
}

.pricing .description {
    font-size: 14px;
}

.pricing .cta-btn {
    background-color: var(--default-color);
    color: var(--contrast-color);
    display: block;
    text-align: center;
    padding: 10px 35px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
    font-family: var(--heading-font);
    transition: 0.3s;
    margin-top: 20px;
    margin-bottom: 6px;
}

.pricing .cta-btn:hover {
    background: var(--accent-color);
    color: var(--contrast-color);
}

.pricing ul {
    padding: 0;
    list-style: none;
    color: rgba(var(--default-color-rgb), 0.7);
    text-align: left;
    line-height: 20px;
}

.pricing ul li {
    padding: 10px 0;
    display: flex;
    align-items: center;
}

.pricing ul li:last-child {
    padding-bottom: 0;
}

.pricing ul i {
    color: #059652;
    font-size: 24px;
    padding-right: 3px;
}

.pricing ul .na {
    color: rgba(var(--default-color-rgb), 0.4);
}

.pricing ul .na i {
    color: rgba(var(--default-color-rgb), 0.4);
}

.pricing ul .na span {
    text-decoration: line-through;
}

.pricing .featured {
    position: relative;
}

.pricing .featured .popular {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: var(--accent-color);
    color: var(--contrast-color);
    padding: 5px 15px;
    margin: 0;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 400;
}

.pricing .featured .cta-btn {
    background: var(--accent-color);
    color: var(--contrast-color);
}

@media (max-width: 992px) {
    .pricing .box {
        max-width: 60%;
        margin: 0 auto 30px auto;
    }
}

@media (max-width: 767px) {
    .pricing .box {
        max-width: 80%;
        margin: 0 auto 30px auto;
    }
}

@media (max-width: 420px) {
    .pricing .box {
        max-width: 100%;
        margin: 0 auto 30px auto;
    }
}

</style>