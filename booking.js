// Booking System JavaScript - Petal Hair Designs

// Service data with pricing
const services = [
  {
    id: "haircut-basic",
    name: "Basic Haircut",
    price: 65,
    duration: "45 min",
    description: "Professional cut and style with wash and blow-dry",
  },
  {
    id: "haircut-premium",
    name: "Premium Cut & Style",
    price: 95,
    duration: "60 min",
    description: "Luxury cut with consultation, wash, treatment, and styling",
  },
  {
    id: "color-highlights",
    name: "Highlights",
    price: 145,
    duration: "120 min",
    description: "Professional foil highlights with toner and style",
  },
  {
    id: "color-full",
    name: "Full Colour",
    price: 125,
    duration: "90 min",
    description: "Complete colour transformation with professional products",
  },
  {
    id: "color-balayage",
    name: "Balayage",
    price: 185,
    duration: "150 min",
    description: "Hand-painted highlights for natural, sun-kissed look",
  },
  {
    id: "treatment-deep",
    name: "Deep Conditioning Treatment",
    price: 45,
    duration: "30 min",
    description: "Intensive moisture and repair treatment",
  },
  {
    id: "treatment-keratin",
    name: "Keratin Treatment",
    price: 285,
    duration: "180 min",
    description: "Smoothing treatment for frizz-free, manageable hair",
  },
  {
    id: "bridal-trial",
    name: "Bridal Hair Trial",
    price: 85,
    duration: "75 min",
    description: "Complete bridal hair styling consultation and trial",
  },
  {
    id: "bridal-wedding",
    name: "Wedding Day Hair",
    price: 165,
    duration: "90 min",
    description: "Professional bridal styling for your special day",
  },
  {
    id: "styling-updo",
    name: "Special Event Updo",
    price: 75,
    duration: "60 min",
    description: "Elegant updo styling for special occasions",
  },
];

// Staff data
const staff = [
  {
    id: "sarah",
    name: "Sarah Mitchell",
    specialty: "Colour Specialist",
    experience: "12 years",
    avatar: "🎨",
  },
  {
    id: "emma",
    name: "Emma Johnson",
    specialty: "Bridal Stylist",
    experience: "8 years",
    avatar: "👰",
  },
  {
    id: "maria",
    name: "Maria Rodriguez",
    specialty: "Cut & Style Expert",
    experience: "15 years",
    avatar: "✂️",
  },
  {
    id: "any",
    name: "Any Available Stylist",
    specialty: "All Services",
    experience: "Varies",
    avatar: "✨",
  },
];

// Time slots (in 24-hour format)
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

// Booking state
let bookingData = {
  selectedServices: [],
  selectedStaff: null,
  selectedDate: null,
  selectedTime: null,
  customerInfo: {},
  totalPrice: 0,
};

// Initialize booking system
document.addEventListener("DOMContentLoaded", function () {
  initializeServices();
  initializeStaff();
  initializeDatePicker();
  initializeTimeSlots();
  initializeFormValidation();
  initializeFormSubmission();

  // Check for pre-selected service from URL parameter
  checkForPreselectedService();
});

// Initialize service selection
function initializeServices() {
  const serviceContainer = document.querySelector(".service-selection");

  services.forEach((service) => {
    const serviceElement = createServiceElement(service);
    serviceContainer.appendChild(serviceElement);
  });
}

// Create service element
function createServiceElement(service) {
  const serviceDiv = document.createElement("div");
  serviceDiv.className = "service-option";
  serviceDiv.dataset.serviceId = service.id;
  serviceDiv.setAttribute("role", "checkbox");
  serviceDiv.setAttribute("aria-checked", "false");
  serviceDiv.setAttribute("tabindex", "0");
  serviceDiv.setAttribute("aria-labelledby", `service-name-${service.id}`);
  serviceDiv.setAttribute("aria-describedby", `service-desc-${service.id}`);

  serviceDiv.innerHTML = `
    <div class="service-checkbox" aria-hidden="true"></div>
    <div class="service-name" id="service-name-${service.id}">${service.name}</div>
    <div class="service-description" id="service-desc-${service.id}">${service.description}</div>
    <div class="service-footer">
      <div class="service-duration">${service.duration}</div>
      <div class="service-price">$${service.price}</div>
    </div>
  `;

  serviceDiv.addEventListener("click", () => toggleService(service.id));
  serviceDiv.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleService(service.id);
    }
  });

  return serviceDiv;
}

// Toggle service selection
function toggleService(serviceId) {
  const serviceElement = document.querySelector(
    `[data-service-id="${serviceId}"]`
  );
  const service = services.find((s) => s.id === serviceId);

  if (serviceElement.classList.contains("selected")) {
    // Remove service
    serviceElement.classList.remove("selected");
    serviceElement.setAttribute("aria-checked", "false");
    bookingData.selectedServices = bookingData.selectedServices.filter(
      (s) => s.id !== serviceId
    );
  } else {
    // Add service
    serviceElement.classList.add("selected");
    serviceElement.setAttribute("aria-checked", "true");
    bookingData.selectedServices.push(service);
  }

  updateSelectedServices();
  updateBookingSummary();
  validateForm();
}

// Update selected services display
function updateSelectedServices() {
  const serviceList = document.querySelector(".service-list");
  const totalPriceElement = document.querySelector(".price-amount");

  serviceList.innerHTML = "";
  bookingData.totalPrice = 0;

  bookingData.selectedServices.forEach((service) => {
    const serviceItem = document.createElement("div");
    serviceItem.className = "service-item";
    serviceItem.innerHTML = `
      <span class="name">${service.name}</span>
      <span class="price">$${service.price}</span>
    `;
    serviceList.appendChild(serviceItem);
    bookingData.totalPrice += service.price;
  });

  totalPriceElement.textContent = `$${bookingData.totalPrice}`;
}

// Initialize staff selection
function initializeStaff() {
  const staffContainer = document.querySelector(".staff-selection");

  staff.forEach((member) => {
    const staffElement = createStaffElement(member);
    staffContainer.appendChild(staffElement);
  });
}

// Create staff element
function createStaffElement(member) {
  const staffDiv = document.createElement("div");
  staffDiv.className = "staff-option";
  staffDiv.dataset.staffId = member.id;
  staffDiv.setAttribute("role", "radio");
  staffDiv.setAttribute("aria-checked", "false");
  staffDiv.setAttribute("tabindex", "0");
  staffDiv.setAttribute("aria-labelledby", `staff-name-${member.id}`);

  staffDiv.innerHTML = `
    <div class="staff-avatar" aria-hidden="true">${member.avatar}</div>
    <div class="staff-name" id="staff-name-${member.id}">${member.name}</div>
    <div class="staff-specialty">${member.specialty}</div>
    <div class="staff-experience">${member.experience} experience</div>
  `;

  staffDiv.addEventListener("click", () => selectStaff(member.id));
  staffDiv.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectStaff(member.id);
    }
  });

  return staffDiv;
}

// Select staff member
function selectStaff(staffId) {
  // Remove previous selection
  document.querySelectorAll(".staff-option").forEach((el) => {
    el.classList.remove("selected");
    el.setAttribute("aria-checked", "false");
  });

  // Add new selection
  const staffElement = document.querySelector(`[data-staff-id="${staffId}"]`);
  staffElement.classList.add("selected");
  staffElement.setAttribute("aria-checked", "true");

  bookingData.selectedStaff = staff.find((s) => s.id === staffId);
  updateBookingSummary();
  validateForm();
}

// Initialize date picker
function initializeDatePicker() {
  const dateInput = document.getElementById("appointmentDate");

  // Set minimum date to today
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  dateInput.min = tomorrow.toISOString().split("T")[0];

  // Set maximum date to 3 months from now
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 3);
  dateInput.max = maxDate.toISOString().split("T")[0];

  dateInput.addEventListener("change", function () {
    bookingData.selectedDate = this.value;
    updateTimeSlots();
    updateBookingSummary();
    validateForm();
  });
}

// Initialize time slots
function initializeTimeSlots() {
  const timeGrid = document.querySelector(".time-grid");

  timeSlots.forEach((time) => {
    const timeSlot = document.createElement("div");
    timeSlot.className = "time-slot";
    timeSlot.dataset.time = time;
    timeSlot.textContent = formatTime(time);
    timeSlot.setAttribute("role", "radio");
    timeSlot.setAttribute("aria-checked", "false");
    timeSlot.setAttribute("tabindex", "0");
    timeSlot.setAttribute("aria-label", `${formatTime(time)} time slot`);

    timeSlot.addEventListener("click", () => selectTimeSlot(time));
    timeSlot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectTimeSlot(time);
      }
    });

    timeGrid.appendChild(timeSlot);
  });
}

// Format time for display (compact: 9am, 9:30am)
function formatTime(time24) {
  const [h, m] = time24.split(":");
  const hour = parseInt(h, 10);
  const hour12 = hour % 12 || 12;
  const ampm = hour < 12 ? "am" : "pm";
  const minutes = m === "00" ? "" : `:${m}`;
  return `${hour12}${minutes}${ampm}`;
}

// Select time slot
function selectTimeSlot(time) {
  const timeSlot = document.querySelector(`[data-time="${time}"]`);

  if (timeSlot.classList.contains("unavailable")) {
    return;
  }

  // Remove previous selection
  document.querySelectorAll(".time-slot").forEach((el) => {
    el.classList.remove("selected");
    el.setAttribute("aria-checked", "false");
  });

  // Add new selection
  timeSlot.classList.add("selected");
  timeSlot.setAttribute("aria-checked", "true");

  bookingData.selectedTime = time;
  updateBookingSummary();
  validateForm();
}

// Update time slots based on selected date
function updateTimeSlots() {
  const selectedDate = new Date(bookingData.selectedDate);
  const today = new Date();
  const isToday = selectedDate.toDateString() === today.toDateString();
  const currentHour = today.getHours();

  document.querySelectorAll(".time-slot").forEach((slot) => {
    const time = slot.dataset.time;
    const slotHour = parseInt(time.split(":")[0]);

    // Mark past times as unavailable if it's today
    if (isToday && slotHour <= currentHour) {
      slot.classList.add("unavailable");
    } else {
      slot.classList.remove("unavailable");
    }

    // Simulate some random unavailable slots for demo
    if (Math.random() < 0.2) {
      slot.classList.add("unavailable");
    }
  });
}

// Update booking summary
function updateBookingSummary() {
  const summaryDetails = document.querySelector(".summary-details");
  summaryDetails.innerHTML = "";

  // Services
  if (bookingData.selectedServices.length > 0) {
    bookingData.selectedServices.forEach((service) => {
      addSummaryItem("Service", `${service.name} - $${service.price}`);
    });
  }

  // Staff
  if (bookingData.selectedStaff) {
    addSummaryItem("Stylist", bookingData.selectedStaff.name);
  }

  // Date
  if (bookingData.selectedDate) {
    const date = new Date(bookingData.selectedDate);
    addSummaryItem(
      "Date",
      date.toLocaleDateString("en-AU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }

  // Time
  if (bookingData.selectedTime) {
    addSummaryItem("Time", formatTime(bookingData.selectedTime));
  }

  // Total
  if (bookingData.totalPrice > 0) {
    const totalItem = document.createElement("div");
    totalItem.className = "summary-item summary-total";
    totalItem.innerHTML = `
      <span class="summary-label">Total</span>
      <span class="summary-value">$${bookingData.totalPrice}</span>
    `;
    summaryDetails.appendChild(totalItem);
  }
}

// Add summary item
function addSummaryItem(label, value) {
  const summaryDetails = document.querySelector(".summary-details");
  const item = document.createElement("div");
  item.className = "summary-item";
  item.innerHTML = `
    <span class="summary-label">${label}</span>
    <span class="summary-value">${value}</span>
  `;
  summaryDetails.appendChild(item);
}

// Initialize form validation
function initializeFormValidation() {
  const form = document.getElementById("bookingForm");
  const inputs = form.querySelectorAll("input[required], textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("invalid")) {
        validateField(input);
      }
      updateCustomerInfo();
      validateForm();
    });
  });
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim();
  const fieldType = field.type;
  let isValid = true;
  let errorMessage = "";

  // Clear previous validation
  field.classList.remove("valid", "invalid");
  const errorElement = field.parentElement.querySelector(".error-message");

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required";
  }
  // Email validation
  else if (fieldType === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    }
  }
  // Phone validation
  else if (fieldType === "tel" && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid phone number";
    }
  }
  // Name validation
  else if ((field.id === "firstName" || field.id === "lastName") && value) {
    const nameRegex = /^[a-zA-Z\s\-']{2,}$/;
    if (!nameRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid name (minimum 2 characters)";
    }
  }

  // Apply validation result
  field.classList.add(isValid ? "valid" : "invalid");
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }

  return isValid;
}

// Update customer info in booking data
function updateCustomerInfo() {
  bookingData.customerInfo = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    specialRequests: document.getElementById("specialRequests").value.trim(),
  };
}

// Validate entire form
function validateForm() {
  const submitBtn = document.querySelector(".submit-btn");
  let isValid = true;

  // Check if services are selected
  if (bookingData.selectedServices.length === 0) {
    isValid = false;
  }

  // Check if staff is selected
  if (!bookingData.selectedStaff) {
    isValid = false;
  }

  // Check if date is selected
  if (!bookingData.selectedDate) {
    isValid = false;
  }

  // Check if time is selected
  if (!bookingData.selectedTime) {
    isValid = false;
  }

  // Check required customer info fields
  const requiredFields = ["firstName", "lastName", "email", "phone"];
  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field.value.trim() || field.classList.contains("invalid")) {
      isValid = false;
    }
  });

  // Enable/disable submit button
  submitBtn.disabled = !isValid;

  return isValid;
}

// Initialize form submission
function initializeFormSubmission() {
  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      showNotification(
        "Please complete all required fields correctly.",
        "error"
      );
      return;
    }

    submitBooking();
  });
}

// Submit booking
function submitBooking() {
  const submitBtn = document.querySelector(".submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoader = submitBtn.querySelector(".btn-loader");

  // Show loading state
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  // Update customer info
  updateCustomerInfo();

  // Simulate API call
  setTimeout(() => {
    // Generate booking reference
    const bookingRef = generateBookingReference();

    // Show success modal
    showSuccessModal(bookingRef);

    // Reset form
    resetForm();

    // Remove loading state
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }, 2000);
}

// Generate booking reference
function generateBookingReference() {
  const prefix = "EHD";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 3).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Show success modal
function showSuccessModal(bookingRef) {
  const modal = document.getElementById("successModal");
  const bookingRefElement = document.getElementById("bookingRef");

  bookingRefElement.textContent = bookingRef;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeSuccessModal();
    }
  });

  // Close modal with escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeSuccessModal();
    }
  });
}

// Close success modal
function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Reset form
function resetForm() {
  // Reset booking data
  bookingData = {
    selectedServices: [],
    selectedStaff: null,
    selectedDate: null,
    selectedTime: null,
    customerInfo: {},
    totalPrice: 0,
  };

  // Reset form elements
  document.getElementById("bookingForm").reset();

  // Reset service selections
  document.querySelectorAll(".service-option").forEach((el) => {
    el.classList.remove("selected");
  });

  // Reset staff selection
  document.querySelectorAll(".staff-option").forEach((el) => {
    el.classList.remove("selected");
  });

  // Reset time slot selection
  document.querySelectorAll(".time-slot").forEach((el) => {
    el.classList.remove("selected");
  });

  // Reset validation classes
  document.querySelectorAll("input, textarea").forEach((el) => {
    el.classList.remove("valid", "invalid");
  });

  // Update displays
  updateSelectedServices();
  updateBookingSummary();
  validateForm();
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "error" ? "#dc3545" : "#28a745"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 3000;
    animation: slideInRight 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Check for pre-selected service from URL parameter
function checkForPreselectedService() {
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedServiceId = urlParams.get("service");

  if (preselectedServiceId) {
    // Find the service element and select it
    const serviceElement = document.querySelector(
      `[data-service-id="${preselectedServiceId}"]`
    );

    if (serviceElement) {
      // Simulate a click on the service to select it
      serviceElement.click();

      // Scroll to the service selection section
      const serviceSection = document.querySelector(".service-selection");
      if (serviceSection) {
        serviceSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Optional: Remove the URL parameter to clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }
}
