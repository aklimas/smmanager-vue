<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ref, shallowRef } from 'vue';
import {  UserCircleIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';
import ProfilePhoto from '@/components/apps/user-profile/ProfilePhoto.vue';

export default {
    name: 'Users',
    components: { ProfilePhoto, UiParentCard, BaseBreadcrumb },
    data: function() {
        return {
            tab: null,
            items:[
                { tab: 'Profil', icon: UserCircleIcon, href: '/apps/user/profile' },
                /*{ tab: 'Pracownicy', icon: UsersIcon, href: '/employees' },*/
                /*  { tab: 'Friends', icon: UsersIcon, href: '/apps/user/profile/friends' },
                  { tab: 'Gallery', icon: PhotoIcon, href: '/apps/user/profile/gallery' }*/
            ],
            authStore: useAuthStore()
        }
    }
}
</script>

<template>
    <v-card elevation="10" class="overflow-hidden" >
<!--        <img :src="profileBg" alt="profile" class="w-100" />-->
        <div style="margin-top: 120px;">
            <v-row class="mt-1">
                <v-col cols="12" lg="4" sm="12" class="order-sm-second">
<!--                    <div class="px-4 py-1">
                        <v-row class="justify-center">
                            <v-col cols="4" class="text-center">
                                <FileDescriptionIcon size="20" />
                                <h4 class="text-h4">-</h4>
                                <h6 class="text-h6 font-weight-regular">Posts</h6>
                            </v-col>
                            <v-col cols="4" class="text-center">
                                <UserCircleIcon size="20" />
                                <h4 class="text-h4">-</h4>
                                <h6 class="text-h6 font-weight-regular">Followers</h6>
                            </v-col>
                            <v-col cols="4" class="text-center">
                                <UserCheckIcon size="20" />
                                <h4 class="text-h4">-</h4>
                                <h6 class="text-h6 font-weight-regular">Following</h6>
                            </v-col>
                        </v-row>
                    </div>-->
                </v-col>
                <v-col cols="12" lg="4" sm="12" class="d-flex justify-center order-sml-first">
                    <div class="text-center top-spacer">
                        <div class="avatar-border">
                            <ProfilePhoto :image_name="authStore.user?.avatar"></ProfilePhoto>
                        </div>
                        <h5 class="text-h5 mt-3">{{ authStore.user?.firstName }} {{  authStore.user?.lastName }}</h5>
<!--                        <span class="text-h6 font-weight-regular">Designer</span>-->
                    </div>



                </v-col>
                <v-col cols="12" lg="4" class="d-flex align-center justify-center justify-lg-end order-sm-third">
<!--                    <div class="d-flex align-center justify-space-between px-10 py-1 gap-3">
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-facebook"
                            ><BrandFacebookIcon size="16"
                        /></v-btn>
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-twitter"
                            ><BrandTwitterIcon size="16"
                        /></v-btn>
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-dribbble"
                            ><BrandDribbbleIcon size="16"
                        /></v-btn>
                        <v-btn icon variant="flat" size="x-small" color="primary" class="btn-brand-youtube"
                            ><BrandYoutubeIcon size="16"
                        /></v-btn>
                        <v-btn variant="flat" color="primary">Add to Story</v-btn>
                    </div>-->
                </v-col>
               <v-col md="12" class="order-sm-last">
                    <v-tabs v-model="tab" color="primary" dark class="profiletab bg-grey100">
                        <v-tab v-for="item in items" :key="item.tab" :to="item.href">
                            <component :is="item.icon" size="18" stroke-width="1.5" class="mr-2"></component>
                            {{ item.tab }}
                        </v-tab>
                    </v-tabs>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>
<style lang="scss">
.avatar-border {
    background-image: linear-gradient(rgb(80, 178, 252), rgb(244, 76, 102));
    border-radius: 50%;
    width: 130px;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    overflow: visible;
    .userImage {
        border: 1px solid rgb(255, 255, 255);
    }
}

.top-spacer {
    margin-top: -95px;
}

.profiletab .v-slide-group__content {
    justify-content: end;
    .v-btn--variant-text .v-btn__overlay {
        background: transparent;
    }
}

@media (max-width: 1023px) {
    .order-sm-second {
        order: 2;
    }
    .order-sml-first {
        order: 1;
    }
    .order-sm-third {
        order: 3;
    }
    .order-sm-last {
        order: 4;
    }
}

.btn-brand-facebook {
    background-color: rgb(24, 119, 242) !important;
}

.btn-brand-twitter {
    background-color: rgb(29, 161, 242) !important;
}
.btn-brand-dribbble {
    background-color: rgb(234, 76, 137) !important;
}
.btn-brand-youtube {
    background-color: rgb(205, 32, 31) !important;
}
</style>
