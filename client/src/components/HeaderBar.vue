<template>
  <header class="header-bar">
    <div class="header-left">
      <h1 class="page-title">{{ pageTitle }}</h1>
    </div>

    <div class="header-right">
      <button class="icon-btn" title="Search" aria-label="Search">
        🔍
      </button>
      <button class="icon-btn" title="Notifications" aria-label="Notifications">
        🔔
      </button>
      <div class="user-menu">
        <div class="user-avatar-placeholder">{{ user.initials }}</div>
        <div class="user-info">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-role">{{ user.role }}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    pageTitle: { type: String, default: 'Dashboard' },
    user: {
      type: Object,
      default: () => ({ name: 'User', role: 'Admin', initials: 'U' })
    }
  }
}
</script>

<style scoped>
.header-bar {
  height: 64px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  gap: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.header-left {
  flex: 1;
  min-width: 0;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.025em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  background: #f1f5f9;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.user-menu:hover {
  background: #f1f5f9;
}

.user-avatar-placeholder {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.user-name {
  font-weight: 600;
  color: #0f172a;
  font-size: 0.875rem;
}

.user-role {
  color: #64748b;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .header-bar {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .user-info {
    display: none;
  }

  .icon-btn {
    padding: 0.375rem;
  }
}
</style>
