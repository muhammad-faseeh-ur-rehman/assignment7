let orders = [
    {
        orderId: 1001,
        customer: {
            name: "Ali",
            city: "Multan"
        },
        products: [
            { name: "Laptop", price: 100000, quantity: 1 },
            { name: "Mouse", price: 2000, quantity: 2 }
        ],
        status: "pending",
        discountRate: 10,
        taxRate: 15
    },
    {
        orderId: 1002,
        customer: {
            name: "Ahmed",
            city: "Lahore"
        },
        products: [
            { name: "Laptop", price: 100000, quantity: 1 },
            { name: "Keyboard", price: 5000, quantity: 1 }
        ],
        status: "delivered",
        discountRate: 5,
        taxRate: 15
    },
    {
        orderId: 1003,
        customer: {
            name: "Ali",
            city: "Multan"
        },
        products: [
            { name: "Mouse", price: 2000, quantity: 3 }
        ],
        status: "pending",
        discountRate: 0,
        taxRate: 15
    }
];

function calculateOrder(order) {
    const subtotal = order.products.reduce((sum, product) =>
        sum + product.price * product.quantity, 0
    );
    const discount = subtotal * (order.discountRate / 100);
    const taxableAmount = subtotal - discount;
    const tax = taxableAmount * (order.taxRate / 100);
    const finalTotal = taxableAmount + tax;
    return {
        subtotal,
        discount,
        tax,
        finalTotal
    };
}
function totalRevenue() {
    return orders
        .filter(order => order.status !== "cancelled")
        .reduce((total, order) =>
            total + calculateOrder(order).finalTotal, 0
        );
}

function highestValueOrder() {
    return orders.reduce((highest, order) =>
        calculateOrder(order).finalTotal >
            calculateOrder(highest).finalTotal
            ? order
            : highest
    );
}
function customerTotalSpending(customerName) {
    return orders
        .filter(order =>
            order.customer.name.toLowerCase() === customerName.toLowerCase() &&
            order.status !== "cancelled"
        )
        .reduce((total, order) =>
            total + calculateOrder(order).finalTotal, 0
        );
}
function pendingOrders() {
    return orders.filter(order => order.status === "pending");
}
function deliveredOrders() {
    return orders.filter(order => order.status === "delivered");
}
function changeOrderStatus(orderId, newStatus) {
    const order = orders.find(order => order.orderId === orderId);
    if (!order) return "Order not found.";
    const validStatuses = ["pending", "processing", "delivered", "cancelled"];
    if (!validStatuses.includes(newStatus)) {
        return "Invalid status.";
    }
    order.status = newStatus;
    return "Status updated.";
}
function cancelOrder(orderId) {
    const order = orders.find(order => order.orderId === orderId);
    if (!order) return "Order not found.";
    if (order.status === "delivered") return "Delivered order cannot be cancelled.";
    order.status = "cancelled";
    return "Order cancelled.";
}
function bestSellingProduct() {
    const sales = {};
    orders.forEach(order => {
        if (order.status === "cancelled") return;
        order.products.forEach(product => {
            sales[product.name] =
                (sales[product.name] || 0) + product.quantity;
        });
    });
    return Object.entries(sales)
        .sort((a, b) => b[1] - a[1])[0];
}
function bestCustomer() {
    const customers = {};
    orders.forEach(order => {
        if (order.status === "cancelled") return;
        const name = order.customer.name;
        customers[name] =
            (customers[name] || 0) + calculateOrder(order).finalTotal;
    });
    return Object.entries(customers)
        .sort((a, b) => b[1] - a[1])[0];
}
function revenueByCity() {
    return orders.reduce((result, order) => {
        if (order.status === "cancelled") return result;
        const city = order.customer.city;
        result[city] =
            (result[city] || 0) + calculateOrder(order).finalTotal;
        return result;
    }, {});
}
function getCustomerReport(customerName) {
    const customerOrders = orders.filter(order =>
        order.customer.name.toLowerCase() === customerName.toLowerCase()
    );
    const activeOrders = customerOrders.filter(order =>
        order.status !== "cancelled"
    );
    return {
        customer: customerName,
        totalOrders: customerOrders.length,
        totalSpent: activeOrders.reduce((sum, order) =>
            sum + calculateOrder(order).finalTotal, 0
        ),
        delivered: customerOrders.filter(order =>
            order.status === "delivered"
        ).length,
        pending: customerOrders.filter(order =>
            order.status === "pending"
        ).length
    };
}
console.log("Order 1001:", calculateOrder(orders[0]));
console.log("Total Revenue:", totalRevenue());
console.log("Highest Order:", highestValueOrder());
console.log("Ali Spending:", customerTotalSpending("Ali"));
console.log("Pending:", pendingOrders());
console.log("Delivered:", deliveredOrders());
console.log(changeOrderStatus(1001, "processing"));
console.log("Best Selling:", bestSellingProduct());
console.log("Best Customer:", bestCustomer());
console.log("Revenue By City:", revenueByCity());
console.log("Ali Report:", getCustomerReport("Ali"));
