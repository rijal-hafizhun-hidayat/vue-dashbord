<template>
  <CRow>
    <CCol :xs="3">
      <CWidgetStatsA class="mb-4" color="primary">
        <template #value
          >26K
          <span class="fs-6 fw-normal">
            (-12.4% <CIcon icon="cil-arrow-bottom" />)
          </span>
        </template>
        <template #title>Users</template>
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
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </template>
        <template #chart>
          <CChart
            type="bar"
            class="mt-3 mx-3"
            style="height: 70px"
            :data="{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
                'January',
                'February',
                'March',
                'April',
              ],
              datasets: [
                {
                  label: 'jumlah',
                  backgroundColor: 'rgba(255,255,255,.2)',
                  borderColor: 'rgba(255,255,255,.55)',
                  data: [
                    78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67,
                    82,
                  ],
                  barPercentage: 0.6,
                },
              ],
            }"
            :options="{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                    drawTicks: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    display: false,
                    drawBorder: false,
                    drawTicks: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
            }"
          />
        </template>
      </CWidgetStatsA>
    </CCol>
  </CRow>
</template>

<script>
import { CChart } from '@coreui/vue-chartjs'
export default {
  name: 'WidgetsStatsA',
  components: {
    CChart,
  },
}
</script>
