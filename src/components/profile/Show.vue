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
                        id="nama"
                        type="text"
                        v-model="data.name"
                        readonly plain-text/>
                </div>
                </CRow>
            <CRow class="mb-3">
                <CFormLabel for="gender" class="col-sm-4 col-form-label">Gender</CFormLabel>
                <div class="col-sm-8">
                    <CFormInput
                        v-if="data.gender == 1"
                        id="gender"
                        type="text"
                        value="Laki-laki"
                        readonly plain-text/>

                    <CFormInput
                        v-else
                        id="gender"
                        type="text"
                        value="Perempuan"
                        readonly plain-text/>
                </div>
            </CRow>
            <CRow class="mb-3">
                <CFormLabel for="created_at" class="col-sm-4 col-form-label">Di Tambah Tanggal</CFormLabel>
                <div class="col-sm-8">
                    <CFormInput
                        v-model="data.created_at"
                        id="gender"
                        type="text"
                        readonly plain-text/>
                </div>
            </CRow>
            <CRow class="mb-3">
                <CFormLabel for="created_at" class="col-sm-4 col-form-label">Di Tambah Tanggal</CFormLabel>
                <div class="col-sm-8">
                    <CFormInput
                        v-model="data.updated_at"
                        id="gender"
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
import { ref } from '@vue/reactivity'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
import moment from 'moment'
import 'moment/locale/id'

export default {
    name: 'Show',
    props: {
        id: Number
    },

    setup(props){
        const data = ref('')
        const visibleLiveDemo = ref(false)

        onMounted(() => {
            moment.locale('id')
            show()
        })

        function show(){
            axios.get(`http://localhost:8000/api/profile/${props.id}`)
            .then((res) => {
                data.value = res.data.data
                data.value.created_at = moment(data.value.created_at, "Asia/Jakarta").format('LL')
                data.value.updated_at = moment(data.value.updated_at, "Asia/Jakarta").format('LL')
            }).catch((err) => {
                console.log(err)
            })
        }
        return {
            visibleLiveDemo, data, show
        }
    }
}
</script>