<template>
  <CRow>
    <CCol :xs="3">
      <CWidgetStatsA class="mb-4 pb-5" color="primary">
        <template #value>{{ result.count }}</template>
        <template #title>Jumlah Profile</template>
        <template #action>
          <CDropdown placement="bottom-end">
            <CDropdownToggle
              color="transparent"
              class="p-0 text-white"
              :caret="false"
            >
              <CIcon icon="cil-options" class="text-high-emphasis-inverse" />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#/data">Detail</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </template>
      </CWidgetStatsA>
    </CCol>
  </CRow>
</template>

<script>
import { CChart } from '@coreui/vue-chartjs'
import axios from 'axios'
import { onMounted, ref } from '@vue/runtime-core'
export default {
  name: 'WidgetsStatsA',
  components: {
    CChart,
  },

  setup(){

    const result = ref('')

    onMounted(() => {
      count()
      //console.log(result)
    })

    function count(){
      axios.get(`http://localhost:8000/api/count`)
      .then((res) => {
        result.value = res.data
      }).catch((err) => {
        console.log(err)
      })
    }

    return {
      result, count
    }
  }
}
</script>
