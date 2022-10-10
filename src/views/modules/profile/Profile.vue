<template>
    <Crow>
        <div class="loader-spinner">
            <loading v-model:active="isLoading"
                :can-cancel="true"
                :on-cancel="onCancel"
                :is-full-page="fullPage"/>
        </div>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="( profile, index ) in profiles" :key="profile.id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ profile.name }}</CTableDataCell>
                                <CTableDataCell v-if="profile.gender == 1">Laki-laki</CTableDataCell>
                                <CTableDataCell v-else>Perempuan</CTableDataCell>
                                <CTableDataCell>
                                    <CButtonGroup role="group" aria-label="Basic mixed styles example">
                                        <CButton @click="destroy(profile.id, index)" color="danger">Delete</CButton>
                                        <CButton color="warning">Edit</CButton>
                                        <CButton color="success">Show</CButton>
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

export default {
    name:'Profile',
    components: { Loading },
    setup(){
        const profiles = ref([])
        let isLoading = ref(false)
        let fullPage = ref(true)

        //console.log(localStorage.getItem('token'))

        onMounted(() => {
            getData()
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
            axios.defaults.headers.delete['Authorization'] = `Bearer ${localStorage.getItem('token')}`
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
                console.log(err)
            })
        }

        return {
            profiles, isLoading, fullPage, getData, destroy
        }
    }
}
</script>