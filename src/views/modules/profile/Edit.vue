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
import { onMounted, reactive } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'Edit',
    setup(){

        const route = useRoute()
        const router = useRouter()

        const data = reactive({
            name: null,
            gender: null
        })


        onMounted(() => {
            show()
        })

        function show(){
            axios.get(`http://localhost:8000/api/profile/${route.params.id}`)
            .then((res) => {
                data.name = res.data.data.name
                data.gender = res.data.data.gender
            }).catch((err) => {
                console.log(err)
            })
        }

        function update(){
            //console.log(data)
            axios.defaults.headers.put['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
            axios.put(`http://localhost:8000/api/profile/${route.params.id}`,{
                name: data.name,
                gender: data.gender
            })
            .then((res) => {
                Swal.fire({
                    title: 'Success',
                    text: 'update profile data complete',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })

                return router.push({ name: 'Data' })
                
            }).catch((err) => {
                console.log(err)
            })
        }

        return{
            route, router, data, show, update
        }
    }
}
</script>