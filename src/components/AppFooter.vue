<template>
  <CFooter>
    <div>
      <a href="#" target="_blank">Profile-App</a>
      <span class="ms-1"
        >&copy; {{ new Date().getFullYear() }} creativeLabs.</span
      >
    </div>
    <div class="ms-auto">
      <span class="me-1">Powered by</span>
      <a href="https://coreui.io/vue" target="_blank">CoreUI for Vue</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>
