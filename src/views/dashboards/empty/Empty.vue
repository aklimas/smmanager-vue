<script setup lang="ts">
import { ref } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { useAuthStore } from '@/stores/auth';
const page = ref({ title: "Empty" });
const breadcrumbs = ref([
  {
    text: "Panel",
    disabled: false,
    href: "#",
  },
]);



</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <pre>{{useAuthStore().user?.roles}}</pre>
    {{useAuthStore().checkRoles(['ROLE_USER'])}}
</template>
