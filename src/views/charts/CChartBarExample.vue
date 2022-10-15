<template>
  <CChartBar :data="defaultData" />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'
import { ref } from '@vue/reactivity'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'CChartBarExample',
  components: { CChartBar },
  setup(){
    let val = ''

    onMounted(() => {
      get()
      //console.log(val)
    })

    function get(){
      axios.get(`http://localhost:8000/api/chart`)
      .then((res) => {
        let jumlah = res.data
        val = jumlah.map(a => a.total);
        console.log(val)
      }).catch((err) => {
        console.log(err)
      })
    }

    return {
      val, get
    }
  },

  computed: {
    defaultData() {
      console.log(this.val)
      return {
        labels: [
          'Perempuan',
          'Laki-laki',
        ],
        datasets: [
          {
            label: 'Jumlah',
            backgroundColor: ['#f87979', '#7b79f8'],
            data: [40, 20],
          },
        ],
      }
    },
  },
}
</script>
