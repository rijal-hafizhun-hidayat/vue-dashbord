<template>
    <CCol :xs="12">
        <CCard class="mb-4">
            <CCardHeader>
                <strong>Create Akun</strong>
            </CCardHeader>
            <CCardBody>
                <CRow class="mb-3">
                    <CFormLabel for="nama" class="col-sm-2 col-form-label">
                        Nama
                    </CFormLabel>
                    <div class="col-sm-10">
                        <CFormInput
                        v-model="akun.name"
                        id="nama"
                        type="text"
                        />
                    </div>
                </CRow>
                <CRow class="mb-3">
                    <CFormLabel for="gender" class="col-sm-2 col-form-label">
                        Role
                    </CFormLabel>
                    <div class="col-sm-10">
                        <CFormSelect v-model="akun.level" @change="set($event)" aria-label="Default select example">
                            <option selected value="">-- pilih --</option>
                            <option value="1">Admin</option>
                            <option value="0">Biasa</option>
                        </CFormSelect>
                    </div>
                </CRow>
                <CRow class="mb-3">
                    <CFormLabel for="username" class="col-sm-2 col-form-label">
                        Username
                    </CFormLabel>
                    <div class="col-sm-10">
                        <CFormInput
                        id="username"
                        v-model="akun.username"
                        type="text"
                        disabled readonly
                        />
                    </div>
                </CRow>
                <CRow class="mb-3">
                    <CFormLabel for="password" class="col-sm-2 col-form-label">
                        Password
                    </CFormLabel>
                    <div class="col-sm-10">
                        <CFormInput
                        v-model="akun.password"
                        id="password"
                        type="text"
                        disabled readonly
                        />
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
export default {
    name: 'Create',
    setup(){
        const akun = reactive({
            name: null,
            username: null,
            password: null,
            level: null
        })

        function set(event){
            let role = event.target.value

            if( role == 1){
                akun.username = akun.name.split(" ").join("")
                akun.password = Math.random().toString(36).slice(-8)+'@admin'
            }
            else{
                akun.username = akun.name.split(" ").join("")
                akun.password = Math.random().toString(36).slice(-8)
            }            
        }

        function insert(){
            axios.defaults.headers.post['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
            axios.post(`http://localhost:8000/api/register`, {
                name: akun.name,
                username: akun.username,
                password: akun.password,
                level: akun.level
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }

        return {
            akun, set, insert
        }
    }
}
</script>