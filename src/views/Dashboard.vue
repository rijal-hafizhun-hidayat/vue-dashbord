<template>
  <div>
    <WidgetsStatsA />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow>
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">Grafik Profile</h4>
                <div class="small text-medium-emphasis">January 2021</div>
              </CCol>
            </CRow>
            <CRow>
              <CChartBarExample />
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CChartBarExample from './charts/CChartBarExample'
import WidgetsStatsA from './widgets/WidgetsStatsTypeA.vue'

export default {
  name: 'Dashboard',
  components: {
    CChartBarExample,
    WidgetsStatsA,
  },
  setup() {
    

    return {
      
    }
  },
}
</script>
