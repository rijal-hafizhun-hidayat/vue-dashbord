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
                        @change="setUsername()"
                        id="nama"
                        type="text"
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
                        Role
                    </CFormLabel>
                    <div class="col-sm-10">
                        <CFormSelect v-model="akun.level" @change="setRole($event)" aria-label="Default select example">
                            <option selected value="">-- pilih --</option>
                            <option value="1">Admin</option>
                            <option value="0">Biasa</option>
                        </CFormSelect>
                        <div v-if="e.level">
                            <div class="alert alert-danger mt-1" role="alert">
                                {{ e.level[0] }}
                            </div>
                        </div>
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
                        <div v-if="e.username">
                            <div class="alert alert-danger mt-1" role="alert">
                                {{ e.username[0] }}
                            </div>
                        </div>
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
                        <div v-if="e.password">
                            <div class="alert alert-danger mt-1" role="alert">
                                {{ e.password[0] }}
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
        const akun = reactive({
            name: null,
            username: null,
            password: null,
            level: null
        })

        const e = ref([])

        const route = useRouter()

        function setUsername(){
            akun.username = akun.name.split(" ").join("")
        }

        function setRole(event){
            let role = event.target.value

            if( role == 1){
                //akun.username = akun.name+'@admin'
                akun.password = Math.random().toString(36).slice(-8)+'@admin'
            }
            else{
                //akun.username = akun.name.split(" ").join("")
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
                Swal.fire({
                    title: 'Success',
                    text: 'insert profile data complete',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })

                return route.push({ name: 'Akun' })
            }).catch((err) => {
                e.value = err.response.data.errors
            })
        }

        return {
            akun, route, e, setRole, setUsername, insert
        }
    }
}
</script>