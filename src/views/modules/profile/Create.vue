<template>
    <CCol :xs="12">
        <CCard class="mb-4">
            <CCardHeader>
                <strong>Create</strong>
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
                        <CFormSelect v-model="data.gender" aria-label="Default select example">
                            <option selected value="">Open this select menu</option>
                            <option value="1">Laki-laki</option>
                            <option value="0">Perempuan</option>
                        </CFormSelect>
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
import { reactive } from '@vue/reactivity'
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

        const route = useRouter()

        function insert(){
            axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`
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
                console.log(err)
            })
        }

        return {
            data, insert
        }
    }
}
</script>