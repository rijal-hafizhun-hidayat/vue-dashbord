<template>
    <CCol :xs="12">
        <CCard class="mb-4">
            <CCardHeader>
                <strong>Create Profile</strong>
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
                        <div v-if="e.name">
                            <div class="alert alert-danger mt-1" role="alert">
                                {{ e.name[0] }}
                            </div>
                        </div>
                    </div>
                </CRow>
                <CRow class="mb-3">
                    <CFormLabel for="gender" class="col-sm-2 col-form-label">
                        Gender
                    </CFormLabel>
                    <div class="col-sm-10">
                        <CFormSelect v-model="data.gender" aria-label="Default select example">
                            <option selected value="">Open this select menu</option>
                            <option value="1">Laki-laki</option>
                            <option value="0">Perempuan</option>
                        </CFormSelect>
                        <div v-if="e.gender">
                            <div class="alert alert-danger mt-1" role="alert">
                                {{ e.gender[0] }}
                            </div>
                        </div>
                    </div>
                </CRow>
                <div class="mb-3">
                    <CButton @click="insert" color="primary" class="px-4">Submit</CButton>
                </div>
            </CCardBody>
        </CCard>
    </CCol>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useRouter } from 'vue-router'

export default {
    name: 'Create',
    setup(){
        const data = reactive({
            name: null,
            gender: null
        })

        const e = ref([])

        const route = useRouter()

        function insert(){
            axios.defaults.headers.post['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
            axios.post(`http://localhost:8000/api/profile`, {
                name: data.name,
                gender: data.gender
            })
            .then((res) => {
                Swal.fire({
                    title: 'Success',
                    text: 'insert profile data complete',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })

                return route.push({ name: 'Data' })
            }).catch((err) => {
                e.value = err.response.data.errors
                console.log(e)
            })
        }

        return {
            data, e, insert
        }
    }
}
</script>