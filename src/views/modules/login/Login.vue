  <template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol :md="5">
            <CCardGroup>
              <CCard class="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p class="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Username"
                        v-model="data.username"
                      />
                    </CInputGroup>
                    <CInputGroup class="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        v-model="data.password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol :xs="6">
                        <CButton @click="login" color="primary" class="px-4">Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from '@vue/reactivity'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import Swal from 'sweetalert2/dist/sweetalert2.js'

  export default {
    name: 'Login',
    setup(){
      let data = reactive({
        username: null,
        password: null
      })

      const error = reactive({
        username: null,
        password: null
      })

      const route = useRouter()

      localStorage.clear();

      function login(){
        axios.get(`http://localhost:8000/sanctum/csrf-cookie`)
        .then((res) => {
          axios.post(`http://localhost:8000/api/login`, {
            username: data.username,
            password: data.password
          })
          .then((res) => {
            //console.log(res.data.token)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('loggedIn', true)
            
            return route.push({ name: 'profile' })
          }).catch((err) => {
            if(err.response.data.status == false){
              // console.log(err.response.data.message)
              return Swal.fire({
                title: 'Failed',
                text: err.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }

            error.username = err.response.data.errors.username
            error.password = err.response.data.errors.password
            return Swal.fire({
                title: 'Failed',
                text: [err.response.data.errors.username, err.response.data.errors.password],
                icon: 'error',
                confirmButtonText: 'Ok',
            })
          })
        }).catch((err) => {
          console.log(err)
        })
      }
        return {
          data, route, error, login
        }
    },
  }
  </script>  