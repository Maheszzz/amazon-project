document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const progressLabels = document.querySelectorAll('.progress-label');
    const progressBar = document.querySelector('.progress-bar');
    const deliveryDateElement = document.querySelector('.delivery-date');
    const productImage = document.querySelector('.product-image');

    // Order status simulation (can be replaced with real data from backend)
    let currentStatus = 'Shipped';
    const orderDetails = {
        productName: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        quantity: 1,
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        statusUpdates: {
            Preparing: new Date('2023-06-10'),
            Shipped: new Date('2023-06-11'),
            Delivered: null
        }
    };

    // Initialize tracking UI
    function initializeTracking() {
        // Set initial product info
        document.querySelectorAll('.product-info')[0].textContent = orderDetails.productName;
        document.querySelectorAll('.product-info')[1].textContent = `Quantity: ${orderDetails.quantity}`;
        productImage.src = orderDetails.image;

        // Set initial status
        updateStatusDisplay(currentStatus);
        updateProgressBar(currentStatus);
        setupStatusHoverEffects();
    }

    // Update status display
    function updateStatusDisplay(status) {
        progressLabels.forEach(label => {
            label.classList.remove('current-status');
            if (label.textContent.trim() === status) {
                label.classList.add('current-status');
            }
        });

        if (status === 'Delivered' && orderDetails.statusUpdates.Delivered) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            deliveryDateElement.textContent = `Delivered on ${orderDetails.statusUpdates.Delivered.toLocaleDateString('en-US', options)}`;
        }
    }

    // Update progress bar
    function updateProgressBar(status) {
        const statusOrder = ['Preparing', 'Shipped', 'Delivered'];
        const progress = (statusOrder.indexOf(status) / (statusOrder.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Simulate delivery completion (for demonstration)
    function simulateDelivery() {
        if (currentStatus !== 'Delivered') {
            orderDetails.statusUpdates.Delivered = new Date();
            currentStatus = 'Delivered';
            updateStatusDisplay(currentStatus);
            updateProgressBar(currentStatus);
            
            // Add delivery confirmation effects
            progressBar.classList.add('delivered');
            deliveryDateElement.classList.add('delivered');
        }
    }

    // Hover effects for status updates
    function setupStatusHoverEffects() {
        progressLabels.forEach(label => {
            label.addEventListener('mouseover', () => {
                if (!label.classList.contains('current-status')) {
                    label.style.opacity = '0.7';
                }
            });
            
            label.addEventListener('mouseout', () => {
                label.style.opacity = '1';
            });
        });
    }

    // Event listener for simulated delivery (for demonstration)
    document.addEventListener('keypress', (e) => {
        if (e.key === 'd' && currentStatus !== 'Delivered') {
            simulateDelivery();
        }
    });

    // Initialize the tracking interface
    initializeTracking();

    // Automatic status simulation (for demonstration)
    setTimeout(() => {
        currentStatus = 'Shipped';
        updateStatusDisplay(currentStatus);
        updateProgressBar(currentStatus);
    }, 3000);

    setTimeout(simulateDelivery, 6000);
});
