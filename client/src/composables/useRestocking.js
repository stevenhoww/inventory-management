import { ref, computed } from 'vue'

// Shared restocking state (singleton pattern)
const budget = ref(5000)
const submittedOrders = ref([])

export function useRestocking() {
  // Calculate recommendations based on demand forecasts and inventory
  const calculateRecommendations = (demandForecasts, inventoryItems, currentBudget) => {
    const recommendations = []

    for (const forecast of demandForecasts) {
      // Find matching inventory item by SKU
      const inventoryItem = inventoryItems.find(item => item.sku === forecast.item_sku)

      if (!inventoryItem) continue

      // Calculate quantity needed: forecasted demand minus current stock
      const quantityNeeded = Math.max(1, forecast.forecasted_demand - inventoryItem.quantity_on_hand)

      // Calculate cost
      const totalCost = quantityNeeded * inventoryItem.unit_cost

      // Only include if within budget
      if (totalCost <= currentBudget) {
        recommendations.push({
          sku: forecast.item_sku,
          name: forecast.item_name,
          forecasted_demand: forecast.forecasted_demand,
          current_stock: inventoryItem.quantity_on_hand,
          quantity_to_order: quantityNeeded,
          unit_cost: inventoryItem.unit_cost,
          total_cost: totalCost,
          trend: forecast.trend,
          selected: true,
          category: inventoryItem.category,
          warehouse: inventoryItem.warehouse
        })
      }
    }

    // Sort by forecasted demand descending (highest first)
    return recommendations.sort((a, b) => b.forecasted_demand - a.forecasted_demand)
  }

  // Submit an order
  const submitOrder = (selectedItems) => {
    const timestamp = Date.now()
    const today = new Date()
    const deliveryDate = new Date(today.getTime() + (7 + Math.random() * 8) * 24 * 60 * 60 * 1000) // 7-14 days

    const totalValue = selectedItems.reduce((sum, item) => sum + item.total_cost, 0)

    const order = {
      id: `submitted-${timestamp}`,
      order_number: `RST-${timestamp}`,
      customer: 'Internal Restocking',
      items: selectedItems.map(item => ({
        sku: item.sku,
        name: item.name,
        quantity: item.quantity_to_order,
        unit_price: item.unit_cost
      })),
      status: 'Submitted',
      order_date: today.toISOString().split('T')[0],
      expected_delivery: deliveryDate.toISOString().split('T')[0],
      total_value: Math.round(totalValue * 100) / 100,
      is_submitted_order: true,
      submitted_at: new Date().toISOString()
    }

    submittedOrders.value.unshift(order)
    return order
  }

  // Get all submitted orders
  const getSubmittedOrders = computed(() => submittedOrders.value)

  // Clear submitted orders (useful for testing)
  const clearSubmittedOrders = () => {
    submittedOrders.value = []
  }

  return {
    // State
    budget,
    submittedOrders: getSubmittedOrders,

    // Methods
    calculateRecommendations,
    submitOrder,
    clearSubmittedOrders
  }
}
