<template>
    <CButton
        color="success"
        @click=" () => {
            visibleLiveDemo = true
        } ">Show</CButton>
    <CModal
        alignment="center"
        :visible="visibleLiveDemo"
        @close=" () => {
            visibleLiveDemo = false
        } ">
        <CModalHeader
            dismiss
            @close=" () => {
                visibleLiveDemo = false
            }">
            <CModalTitle>Show</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow class="mb-3">
                <CFormLabel for="nama" class="col-sm-4 col-form-label">Nama</CFormLabel>
                <div class="col-sm-8">
                    <CFormInput
                        v-model="akun.name"
                        id="nama"
                        type="text"
                        readonly plain-text/>
                </div>
            </CRow>
            <CRow class="mb-3">
                <CFormLabel for="nama" class="col-sm-4 col-form-label">Username</CFormLabel>
                <div class="col-sm-8">
                    <CFormInput
                        v-model="akun.username"
                        id="nama"
                        type="text"
                        readonly plain-text/>
                </div>
            </CRow>
            <CRow class="mb-3">
                <CFormLabel for="nama" class="col-sm-4 col-form-label">Dibuat tanggal</CFormLabel>
                <div class="col-sm-8">
                    <CFormInput
                        v-model="akun.created_at"
                        id="nama"
                        type="text"
                        readonly plain-text/>
                </div>
            </CRow>
            <CRow class="mb-3">
                <CFormLabel for="nama" class="col-sm-4 col-form-label">Terakhir Diubah Tanggal</CFormLabel>
                <div class="col-sm-8">
                    <CFormInput
                        v-model="akun.updated_at"
                        id="nama"
                        type="text"
                        readonly plain-text/>
                </div>
            </CRow>
        </CModalBody>
            <CModalFooter>
                <CButton
                    color="secondary"
                    @click=" () => {
                        visibleLiveDemo = false
                    }">
                    Close
                </CButton>
            </CModalFooter>
    </CModal>
</template>
<script>
import { onMounted, ref } from '@vue/runtime-core'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/id'

export default {
    name: 'Show',
    props: {
        id: Number
    },
    setup(props) {
        const visibleLiveDemo = ref(false)
        const akun = ref('')

        onMounted(() => {
            get()
            console.log(akun)
        })

        function get(){
            axios.defaults.headers.get['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
            axios.get(`http://localhost:8000/api/akun/${props.id}`)
            .then((res) => {
                akun.value = res.data
                akun.value.created_at = moment(akun.value.created_at, "Asia/Jakarta").format('LL')
                akun.value.updated_at = moment(akun.value.updated_at, "Asia/Jakarta").format('LL')
            }).catch((err) => {
                console.log(err)
            })
        }

        return {
            visibleLiveDemo, akun, get
        }
    },
}
</script>