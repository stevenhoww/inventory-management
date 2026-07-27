<template>
  <nav class="sidebar" :class="{ collapsed: isCollapsed, mobile: isMobileOpen }">
    <!-- Logo Area -->
    <div class="sidebar-header">
      <div class="logo-container" @click="toggleCollapse">
        <div class="logo-icon">CC</div>
        <span v-if="!isCollapsed" class="logo-text">Catalyst</span>
      </div>
      <button class="collapse-btn mobile-toggle-close" @click="closeMobile" aria-label="Close sidebar">
        ✕
      </button>
    </div>

    <!-- Navigation Items -->
    <ul class="nav-list">
      <li v-for="item in items" :key="item.id" class="nav-item">
        <router-link
          :to="item.to"
          :class="['nav-link', { active: isActive(item.to) }]"
          :title="isCollapsed ? item.label : ''"
          @click="closeMobileIfNeeded"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span v-if="!isCollapsed" class="nav-label">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>

    <!-- Divider -->
    <div class="nav-divider"></div>

    <!-- Bottom Section -->
    <div class="sidebar-bottom">
      <button class="nav-link" title="Settings" @click="closeMobileIfNeeded">
        <span class="nav-icon">⚙️</span>
        <span v-if="!isCollapsed" class="nav-label">Settings</span>
      </button>
      <button class="nav-link" title="Help" @click="closeMobileIfNeeded">
        <span class="nav-icon">?</span>
        <span v-if="!isCollapsed" class="nav-label">Help</span>
      </button>
    </div>
  </nav>

  <!-- Mobile Overlay -->
  <div v-if="isMobileOpen" class="sidebar-overlay" @click="closeMobile"></div>

  <!-- Mobile Menu Button -->
  <button class="mobile-menu-btn" @click="toggleMobile" aria-label="Toggle menu">
    ☰
  </button>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SidebarNav',
  props: {
    items: { type: Array, required: true }
  },
  setup() {
    const route = useRoute()
    const isCollapsed = ref(false)
    const isMobileOpen = ref(false)
    const isMobile = ref(false)

    // Load collapsed state from localStorage
    if (typeof window !== 'undefined') {
      isCollapsed.value = localStorage.getItem('sidebar-collapsed') === 'true'
      isMobile.value = window.innerWidth < 768

      window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768
        if (window.innerWidth >= 768) {
          isMobileOpen.value = false
        }
      })
    }

    const toggleCollapse = () => {
      if (!isMobile.value) {
        isCollapsed.value = !isCollapsed.value
        localStorage.setItem('sidebar-collapsed', isCollapsed.value)
      }
    }

    const toggleMobile = () => {
      isMobileOpen.value = !isMobileOpen.value
    }

    const closeMobile = () => {
      isMobileOpen.value = false
    }

    const closeMobileIfNeeded = () => {
      if (isMobile.value) {
        isMobileOpen.value = false
      }
    }

    const isActive = (path) => route.path === path

    return {
      isCollapsed,
      isMobileOpen,
      isMobile,
      toggleCollapse,
      toggleMobile,
      closeMobile,
      closeMobileIfNeeded,
      isActive
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  height: 64px;
  min-height: 64px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  flex: 1;
  min-width: 0;
  user-select: none;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.logo-text {
  font-weight: 700;
  color: #0f172a;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.collapse-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s;
}

.collapse-btn:hover {
  color: #0f172a;
}

.nav-list {
  list-style: none;
  padding: 1rem 0;
  flex: 1;
  overflow-y: auto;
}

.nav-item {
  margin: 0.25rem 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 0.95rem;
  font-weight: 500;
}

.nav-link:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.nav-link.active {
  color: #2563eb;
  background: #eff6ff;
  border-left-color: #2563eb;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  font-size: 1.1rem;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.nav-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 1rem 0;
}

.sidebar-bottom {
  padding: 0.5rem 0;
  border-top: 1px solid #e2e8f0;
}

.sidebar.collapsed .nav-label {
  display: none;
}

/* Mobile Styles */
.mobile-menu-btn {
  display: none;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  z-index: 99;
}

.mobile-toggle-close {
  display: none;
}

.sidebar-overlay {
  display: none;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-toggle-close {
    display: flex;
  }

  .collapse-btn {
    display: none;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 250px;
    z-index: 1001;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.mobile {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .sidebar.collapsed {
    width: 250px;
  }
}
</style>
