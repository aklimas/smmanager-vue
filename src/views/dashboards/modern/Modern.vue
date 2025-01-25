<script setup lang="ts">
import { ref } from "vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import CongratulationCard from "@/components/dashboards/modern/CongratulationCard.vue";
import Purchases from "@/components/dashboards/modern/Purchases.vue";
import TotalEarnings from "@/components/dashboards/modern/TotalEarnings.vue";
import RevenueUpdates from "@/components/dashboards/modern/RevenueUpdates.vue";
import MonthlyEarnings from "@/components/dashboards/modern/MonthlyEarnings.vue";
import Customers from "@/components/dashboards/modern/Customers.vue";
import TotalSales from "@/components/dashboards/modern/TotalSales.vue";
import ProductPerformance from "@/components/dashboards/modern/ProductPerformance.vue";
import TheProfileCard from '@/components/dashboards/analytical/TheProfileCard.vue';
import TheMyContacts from '@/components/dashboards/analytical/TheMyContacts.vue';
import TheActivityTimeline from '@/components/dashboards/analytical/TheActivityTimeline.vue'
import TheBlogCard from "@/components/dashboards/minimal/TheBlogCard.vue";
import WeeklyStats from "@/components/dashboards/minimal/WeeklyStats.vue";
import MedicalProBranding from "@/components/dashboards/minimal/MedicalProBranding.vue";

const page = ref({ title: "Pulpit" });
const breadcrumbs = ref([
    {
        text: "Panel",
        disabled: false,
        href: "#",
    },
    {
        text: "Pulpit",
        disabled: true,
        href: "#",
    },
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <!---Congratulation card---->
        <v-col cols="12" sm="12" lg="12">
            <CongratulationCard />
        </v-col>
<!--        &lt;!&ndash;-Purchase / Total earnings&#45;&#45;&ndash;&gt;
        <v-col cols="12" sm="12" lg="7">
            <v-row>
                <v-col lg="5">
                    <Purchases />
                </v-col>
                <v-col lg="7">
                    <TotalEarnings />
                </v-col>
            </v-row>
        </v-col>
        &lt;!&ndash;-Revenue updates&#45;&#45;&ndash;&gt;
        <v-col cols="12" sm="12" lg="8">
            <RevenueUpdates />
        </v-col>
        &lt;!&ndash;-Monthly earnings / Customers&#45;&#45;&ndash;&gt;
        <v-col cols="12" sm="12" lg="4">
            <MonthlyEarnings />
            <Customers />
        </v-col>
        &lt;!&ndash;-Total sales&#45;&#45;&ndash;&gt;
        <v-col cols="12" sm="12" lg="4">
            <TotalSales />
        </v-col>
        &lt;!&ndash;-Product performence&#45;&#45;&ndash;&gt;
        <v-col cols="12" sm="12" lg="8">
            <ProductPerformance />
        </v-col>
        &lt;!&ndash;-Profile card / My contact&#45;&#45;&ndash;&gt;
        <v-col cols="12" sm="12" lg="4">
            <TheProfileCard />
            <div class="mt-7"></div>
            <TheMyContacts />
        </v-col>
        &lt;!&ndash;-Activity timeline&#45;&#45;&ndash;&gt;
        <v-col cols="12" sm="12" lg="8">
            <TheActivityTimeline />
        </v-col>
        &lt;!&ndash;-Blog card&#45;&#45;&ndash;&gt;
        <v-col cols="12" lg="4">
            <TheBlogCard />
        </v-col>
        &lt;!&ndash;-Weekly stats&#45;&#45;&ndash;&gt;
        <v-col cols="12" lg="4">
            <WeeklyStats />
        </v-col>
        &lt;!&ndash;-Mediacal pro branding&#45;&#45;&ndash;&gt;
        <v-col cols="12" lg="4">
            <MedicalProBranding />
        </v-col>-->
    </v-row>
</template>
