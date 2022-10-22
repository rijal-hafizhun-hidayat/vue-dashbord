<template>
    <CCol :xs="12">
        <CCard class="mb-4">
            <CCardHeader>
                <strong>Edit Profile</strong>
            </CCardHeader>
            <CCardBody>
                <CRow class="mb-3">
                    <CFormLabel for="nama" class="col-sm-2 col-form-label">
                        Nama
                    </CFormLabel>
                    <div class="col-sm-10">
                        <CFormInput
                        id="nama"
                        type="text"
                        v-model="data.name"
                        />
                    </div>
                </CRow>
                <CRow class="mb-3">
                    <CFormLabel for="gender" class="col-sm-2 col-form-label">
                        Gender
                    </CFormLabel>
                    <div class="col-sm-10">
                        <CFormSelect v-model="data.gender" v-if="data.gender == 1">
                            <option selected value="1">Laki-laki</option>
                            <option value="0">Perempuan</option>
                        </CFormSelect>
                        <CFormSelect v-model="data.gender" v-else>
                            <option value="1">Laki-laki</option>
                            <option selected value="0">Perempuan</option>
                        </CFormSelect>
                    </div>
                </CRow>
                <div class="mb-3">
                    <CButton @click="update" color="primary" class="px-4">Update</CButton>
                </div>
            </CCardBody>
        </CCard>
    </CCol>
</template>
<script>
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from '@vue/runtime-core'

export default {
    name: 'Edit',
    setup() {

        const route = useRoute()
        const router = useRouter()

        const akun = ref('')

        onMounted(() => {
            get()
        })

        function get(){
            axios.defaults.headers.get['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
            axios.get(`http://localhost:8000/api/akun/${route.params.id}`)
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }

        return {
            route, router, get
        }
        
    },
}
</script>