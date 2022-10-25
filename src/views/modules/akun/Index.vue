<template>
    <Crow>
        <div class="loader-spinner">
            <loading v-model:active="isLoading"
                :can-cancel="true"
                :on-cancel="onCancel"
                :is-full-page="fullPage"/>
        </div>
        <CCol :xs="12">
            <router-link :to="{ name: 'create.akun' }" class="btn btn-primary mb-4">Tambah</router-link>
            <CCard class="mb-4">
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="( akun, index ) in akuns" :key="akun.id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ akun.name }}</CTableDataCell>
                                <CTableDataCell>{{ akun.username }}</CTableDataCell>
                                <CTableDataCell>
                                    <CButtonGroup role="group" aria-label="Basic mixed styles example">
                                        <CButton @click="destroy(akun.id, index)" color="danger">Delete</CButton>
                                        <router-link :to="{ name: 'edit.akun', params: { id: akun.id }}" class="btn btn-warning">Edit</router-link>
                                        <Show :id="akun.id"/>
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
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Show from '@/components/akun/Show.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'akun',
    components: { Loading, Show },
    setup(){

        const akuns = ref([])
        const isLoading = ref(false)

        onMounted(() => {
            get()
        })

        function get(){
            isLoading.value = true
            axios.defaults.headers.get['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
            axios.get(`http://localhost:8000/api/akun`)
            .then((res) => {
                akuns.value = res.data.data
            }).catch((err) => {
                console.log(err)
            })

            setTimeout(() => {
                isLoading.value = false
            }, 1000)
        }

        function destroy(id, index){
            axios.defaults.headers.delete['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
            axios.delete(`http://localhost:8000/api/akun/${id}`)
            .then((res) => {
                akuns.value.splice(index, 1)
                return Swal.fire({
                    title: 'Success',
                    text: 'Delete Akun Complete',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }).catch((err) => {
                console.log(err)
            })
        }

        return {
            akuns, isLoading, get, destroy
        }
    }
}
</script>