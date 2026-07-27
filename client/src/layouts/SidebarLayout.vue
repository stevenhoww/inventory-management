<template>
  <div class="saas-layout">
    <SidebarNav :items="navItems" />
    <div class="layout-main">
      <HeaderBar :page-title="pageTitle" :user="currentUser" />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import { useAuth } from '../composables/useAuth'
import SidebarNav from '../components/SidebarNav.vue'
import HeaderBar from '../components/HeaderBar.vue'

export default {
  name: 'SidebarLayout',
  components: { SidebarNav, HeaderBar },
  setup() {
    const route = useRoute()
    const { t } = useI18n()
    const { currentUser } = useAuth()

    const navItems = ref([
      { id: 'dashboard', label: t('nav.overview'), icon: '▦', to: '/' },
      { id: 'inventory', label: t('nav.inventory'), icon: '📦', to: '/inventory' },
      { id: 'orders', label: t('nav.orders'), icon: '🛒', to: '/orders' },
      { id: 'spending', label: t('nav.finance'), icon: '💰', to: '/spending' },
      { id: 'demand', label: t('nav.demandForecast'), icon: '📈', to: '/demand' },
      { id: 'restocking', label: t('nav.restocking'), icon: '📥', to: '/restocking' },
      { id: 'reports', label: 'Reports', icon: '📊', to: '/reports' }
    ])

    const pageTitle = computed(() => {
      const titles = {
        '/': t('dashboard.title'),
        '/inventory': t('inventory.title'),
        '/orders': t('orders.title'),
        '/spending': t('finance.title'),
        '/demand': t('demand.title'),
        '/restocking': t('restocking.title'),
        '/reports': 'Reports'
      }
      return titles[route.path] || 'Dashboard'
    })

    return { navItems, pageTitle, currentUser }
  }
}
</script>

<style scoped>
.saas-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  max-width: 1600px;
  width: 100%;
}

@media (max-width: 768px) {
  .saas-layout {
    flex-direction: column;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>
