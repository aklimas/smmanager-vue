<script>
import axios from 'axios'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const baseUrl = `${import.meta.env.VITE_API_URL}`;
export default {
    components: { VueCropper },
    props: ['image_name'],
    data() {
        return {
            mime_type: '',
            cropedImage: '',
            autoCrop: false,
            selectedFile: '',
            image: '',
            dialog: false,
            files: '',
            baseUrl: `${import.meta.env.VITE_API_URL}`
        }
    },

    methods: {
        saveImage() {
            const userId = this.$route.params.user_id
            this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
            this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
                const formData = new FormData()
                formData.append('image', blob, 'name.jpeg')
                axios
                    .post(`${baseUrl}/api/avatar/upload/` + authStore.user.id, formData, {headers: {Authorization: `Bearer ${useAuthStore().user.token}`}})
                    .then((response) => {

                        useAuthStore().user.avatar = response.data.avatar;
                        this.image_name = response.data.avatar;

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }, this.mime_type)
        },
        onFileSelect(e) {
            const file = e.target.files[0]
            this.mime_type = file.type
            console.log(this.mime_type)
            if (typeof FileReader === 'function') {
                this.dialog = true
                const reader = new FileReader()
                reader.onload = (event) => {
                    this.selectedFile = event.target.result
                    this.$refs.cropper.replace(this.selectedFile)
                }
                reader.readAsDataURL(file)
            } else {
                alert('Sorry, FileReader API not supported')
            }
        },
    },
}
</script>
<style scoped>
.fade-transition-enter-from, .fade-transition-leave-to {
    opacity: 1 !important;
}
.user {
    width: 140px;
    height: 140px;
    border-radius: 100%;
    border: 3px solid #2e7d32;
    position: relative;
}
.profile-img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
}
.icon {
    position: absolute;
    top: 10px;
    right: 0;
    background: #e2e2e2;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    text-align: center;
    color: #0000ff;
    font-size: 14px;
    cursor: pointer;
}
</style>

<template>
    <div>
        <v-avatar size="120">
            <img v-if="image_name" :src="baseUrl + image_name" width="120"  />
            <img v-else src="@/assets/images/profile/user-1.jpg" width="120"  />

            <v-icon class="icon primary white--text" @click="$refs.FileInput.click()">mdi-upload</v-icon>
            <input ref="FileInput" type="file" style="display: none;" @change="onFileSelect" />
        </v-avatar>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-text>
                    <VueCropper v-show="selectedFile" ref="cropper" :src="selectedFile" alt="Wybierz zdjęcie"
                                :viewMode="3" :aspectRadio="1"
                                drag-mode="crop"></VueCropper>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="primary" @click="saveImage(), (dialog = false)">Kadruj</v-btn>
                    <v-btn color="primary" text @click="dialog = false">Anuluj</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
