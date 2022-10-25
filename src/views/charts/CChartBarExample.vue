<template>
  <canvas id="myChart" width="100" height="50"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';
import { reactive, ref } from '@vue/reactivity'
import axios from 'axios'
import { computed, onMounted } from '@vue/runtime-core'
export default {
  name: 'CChartBarExample',
  setup(){

    onMounted(() => {
      get()
      //console.log(val)
    })

    function get(){
      axios.get(`http://localhost:8000/api/chart`)
      .then((res) => {
        let jumlah = res.data
        let val = jumlah.map(a => a.total);
        chart(val)
      }).catch((err) => {
        console.log(err)
      })
    }

    function chart(val){
      const ctx = document.getElementById('myChart')
      let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Perempuan', 'Laki-laki'],
                    datasets: [{
                        label: 'Jumlah',
                        data: val,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                            
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            myChart;
    }

    return {
      get, chart
    }
  }

  // computed: {
  //   defaultData() {
  //     console.log(this.val)
  //     return {
  //       labels: [
  //         'Perempuan',
  //         'Laki-laki',
  //       ],
  //       datasets: [
  //         {
  //           label: 'Jumlah',
  //           backgroundColor: ['#f87979', '#7b79f8'],
  //           data: [40, 20],
  //         },
  //       ],
  //     }
  //   },
  // },
}
</script>
