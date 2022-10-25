<template>
    <Crow>
        <div class="loader-spinner">
            <loading v-model:active="isLoading"
                :can-cancel="true"
                :on-cancel="onCancel"
                :is-full-page="fullPage"/>
        </div>
        <CCol :xs="12">
            <router-link v-if="role == 1" :to="{ name: 'create.data' }" class="btn btn-primary mb-4">Tambah</router-link>
            <CCard class="mb-4">
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                                <CTableHeaderCell v-if="role == 1" scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="( profile, index ) in profiles" :key="profile.id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ profile.name }}</CTableDataCell>
                                <CTableDataCell v-if="profile.gender == 1">Laki-laki</CTableDataCell>
                                <CTableDataCell v-else>Perempuan</CTableDataCell>
                                <CTableDataCell v-if="role == 1">
                                    <CButtonGroup role="group" aria-label="Basic mixed styles example">
                                        <CButton @click="destroy(profile.id, index)" color="danger">Delete</CButton>
                                        <router-link :to="{ name: 'edit.data', params: { id: profile.id }}" class="btn btn-warning">Edit</router-link>
                                        <Show :id="profile.id"/>
                                    </CButtonGroup>
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </CCol>
    </Crow>
    
</template>
<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Show from '@/components/profile/Show.vue';

export default {
    name:'Profile',
    components: { Loading, Show },
    setup(){
        const profiles = ref([])
        const isLoading = ref(false)
        const fullPage = ref(true)
        const role = ref(sessionStorage.getItem('role'))

        //console.log(localStorage.getItem('token'))

        onMounted(() => {
            getData()
            console.log(role)
        })

        function getData(){
            isLoading.value = true
            axios.get(`http://localhost:8000/api/profile`)
            .then((res) => {
                profiles.value = res.data.data
            }).catch((err) => {
                console.log(err)
            })

            setTimeout(() => {
                isLoading.value = false
            }, 1000)
        }

        function destroy(id, index){
            axios.delete(`http://localhost:8000/api/profile/${id}`)
            .then((res) => {
                profiles.value.splice(index, 1)
                return Swal.fire({
                    title: 'Success',
                    text: 'destroy profile data complete',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }).catch((err) => {
                return Swal.fire({
                    title: 'Error',
                    text: 'Gagal Hapus Data',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
        }

        return {
            profiles, isLoading, fullPage, role, getData, destroy
        }
    }
}
</script>