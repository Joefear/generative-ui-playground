/**
 * Gallery Templates for A2UI Widget Builder
 * Pre-built widget examples users can start from
 */

import type { A2UIComponent, SavedWidget } from "../hooks/useWidgetStorage";

export interface GalleryTemplate {
  id: string;
  name: string;
  description: string;
  tags: string[];
  components: A2UIComponent[];
  data: Record<string, unknown>;
}

export const galleryTemplates: GalleryTemplate[] = [
  // 1. Contact Form
  {
    id: "contact-form",
    name: "Contact Form",
    description: "A simple contact form with name, email, phone, and message fields.",
    tags: ["form", "contact", "input"],
    components: [
      {
        type: "Column",
        children: [
          { type: "Text", variant: "h2", text: "Contact Us" },
          { type: "Text", variant: "body", text: "Fill out the form below and we'll get back to you." },
          { type: "TextField", label: "Name", placeholder: "Your full name" },
          { type: "TextField", label: "Email", placeholder: "your@email.com", inputType: "email" },
          { type: "TextField", label: "Phone", placeholder: "(555) 123-4567" },
          { type: "TextField", label: "Message", placeholder: "How can we help?", multiline: true },
          { type: "Button", label: "Send Message" },
        ],
      },
    ],
    data: {},
  },

  // 2. User Profile Card
  {
    id: "user-profile",
    name: "User Profile Card",
    description: "A profile card with avatar, name, bio, and social stats.",
    tags: ["profile", "user", "social", "card"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Column",
            children: [
              { type: "Image", src: "{{avatar}}", size: "avatar" },
              { type: "Text", variant: "h3", text: "{{name}}" },
              { type: "Text", variant: "caption", text: "{{role}}" },
              { type: "Text", variant: "body", text: "{{bio}}" },
              { type: "Divider" },
              {
                type: "Row",
                children: [
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h4", text: "{{followers}}" },
                      { type: "Text", variant: "caption", text: "Followers" },
                    ],
                  },
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h4", text: "{{following}}" },
                      { type: "Text", variant: "caption", text: "Following" },
                    ],
                  },
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h4", text: "{{posts}}" },
                      { type: "Text", variant: "caption", text: "Posts" },
                    ],
                  },
                ],
              },
              { type: "Button", label: "Follow" },
            ],
          },
        ],
      },
    ],
    data: {
      avatar: "https://i.pravatar.cc/150?u=demo",
      name: "Sarah Chen",
      role: "Product Designer",
      bio: "Creating beautiful interfaces that make people smile. Design systems enthusiast.",
      followers: "2.4K",
      following: "891",
      posts: "156",
    },
  },

  // 3. Flight Status
  {
    id: "flight-status",
    name: "Flight Status",
    description: "Real-time flight tracking with departure/arrival info and status.",
    tags: ["travel", "flight", "status", "tracking"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Column",
            children: [
              {
                type: "Row",
                children: [
                  { type: "Icon", icon: "flight" },
                  { type: "Text", variant: "h4", text: "{{flightNumber}}" },
                  { type: "Text", variant: "caption", text: "{{status}}" },
                ],
              },
              { type: "Divider" },
              {
                type: "Row",
                children: [
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h2", text: "{{departure.code}}" },
                      { type: "Text", variant: "body", text: "{{departure.city}}" },
                      { type: "Text", variant: "caption", text: "{{departure.time}}" },
                    ],
                  },
                  { type: "Icon", icon: "arrow_forward" },
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h2", text: "{{arrival.code}}" },
                      { type: "Text", variant: "body", text: "{{arrival.city}}" },
                      { type: "Text", variant: "caption", text: "{{arrival.time}}" },
                    ],
                  },
                ],
              },
              { type: "Divider" },
              {
                type: "Row",
                children: [
                  { type: "Text", variant: "caption", text: "Gate: {{gate}}" },
                  { type: "Text", variant: "caption", text: "Terminal: {{terminal}}" },
                ],
              },
            ],
          },
        ],
      },
    ],
    data: {
      flightNumber: "UA 1234",
      status: "On Time",
      departure: { code: "SFO", city: "San Francisco", time: "10:30 AM" },
      arrival: { code: "JFK", city: "New York", time: "6:45 PM" },
      gate: "B24",
      terminal: "2",
    },
  },

  // 4. Todo List
  {
    id: "todo-list",
    name: "Todo List",
    description: "A simple task list with checkboxes and add functionality.",
    tags: ["productivity", "tasks", "list", "checkbox"],
    components: [
      {
        type: "Column",
        children: [
          { type: "Text", variant: "h3", text: "My Tasks" },
          {
            type: "Row",
            children: [
              { type: "TextField", placeholder: "Add a new task..." },
              { type: "Button", label: "Add" },
            ],
          },
          {
            type: "List",
            items: "{{tasks}}",
            itemTemplate: {
              type: "Row",
              children: [
                { type: "CheckBox", checked: "{{item.completed}}" },
                { type: "Text", variant: "body", text: "{{item.title}}" },
              ],
            },
          },
        ],
      },
    ],
    data: {
      tasks: [
        { title: "Review pull requests", completed: true },
        { title: "Update documentation", completed: false },
        { title: "Team standup meeting", completed: false },
        { title: "Deploy to staging", completed: false },
      ],
    },
  },

  // 5. Login Form
  {
    id: "login-form",
    name: "Login Form",
    description: "A standard login form with email, password, and remember me option.",
    tags: ["auth", "login", "form", "security"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Column",
            children: [
              { type: "Text", variant: "h2", text: "Sign In" },
              { type: "Text", variant: "body", text: "Welcome back! Please enter your details." },
              { type: "TextField", label: "Email", placeholder: "Enter your email", inputType: "email" },
              { type: "TextField", label: "Password", placeholder: "••••••••", inputType: "password" },
              {
                type: "Row",
                children: [
                  { type: "CheckBox", label: "Remember me" },
                  { type: "Text", variant: "body", text: "Forgot password?" },
                ],
              },
              { type: "Button", label: "Sign In" },
              {
                type: "Row",
                children: [
                  { type: "Text", variant: "caption", text: "Don't have an account?" },
                  { type: "Text", variant: "body", text: "Sign up" },
                ],
              },
            ],
          },
        ],
      },
    ],
    data: {},
  },

  // 6. Product Card
  {
    id: "product-card",
    name: "Product Card",
    description: "E-commerce product card with image, price, rating, and add to cart.",
    tags: ["ecommerce", "product", "shopping", "card"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Column",
            children: [
              { type: "Image", src: "{{image}}", size: "largeFeature" },
              { type: "Text", variant: "caption", text: "{{category}}" },
              { type: "Text", variant: "h4", text: "{{name}}" },
              {
                type: "Row",
                children: [
                  { type: "Icon", icon: "star" },
                  { type: "Text", variant: "body", text: "{{rating}}" },
                  { type: "Text", variant: "caption", text: "({{reviews}} reviews)" },
                ],
              },
              {
                type: "Row",
                children: [
                  { type: "Text", variant: "h3", text: "${{price}}" },
                  { type: "Text", variant: "caption", text: "${{originalPrice}}" },
                ],
              },
              { type: "Button", label: "Add to Cart" },
            ],
          },
        ],
      },
    ],
    data: {
      image: "https://picsum.photos/300/200?random=1",
      category: "Electronics",
      name: "Wireless Noise-Canceling Headphones",
      rating: "4.8",
      reviews: "2,451",
      price: "249.99",
      originalPrice: "349.99",
    },
  },

  // 7. Weather Widget
  {
    id: "weather-widget",
    name: "Weather Widget",
    description: "Current weather conditions with temperature and forecast.",
    tags: ["weather", "forecast", "temperature"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Column",
            children: [
              {
                type: "Row",
                children: [
                  { type: "Icon", icon: "{{icon}}", size: 48 },
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h1", text: "{{temperature}}°" },
                      { type: "Text", variant: "body", text: "{{condition}}" },
                    ],
                  },
                ],
              },
              { type: "Text", variant: "h4", text: "{{location}}" },
              { type: "Divider" },
              {
                type: "Row",
                children: [
                  {
                    type: "Column",
                    children: [
                      { type: "Icon", icon: "water_drop" },
                      { type: "Text", variant: "caption", text: "{{humidity}}%" },
                    ],
                  },
                  {
                    type: "Column",
                    children: [
                      { type: "Icon", icon: "air" },
                      { type: "Text", variant: "caption", text: "{{wind}} mph" },
                    ],
                  },
                  {
                    type: "Column",
                    children: [
                      { type: "Icon", icon: "visibility" },
                      { type: "Text", variant: "caption", text: "{{visibility}} mi" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    data: {
      icon: "wb_sunny",
      temperature: 72,
      condition: "Sunny",
      location: "San Francisco, CA",
      humidity: 65,
      wind: 12,
      visibility: 10,
    },
  },

  // 8. Event Card
  {
    id: "event-card",
    name: "Event Card",
    description: "Event details with date, time, location, and RSVP button.",
    tags: ["event", "calendar", "rsvp", "social"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Column",
            children: [
              { type: "Image", src: "{{image}}", size: "header" },
              {
                type: "Row",
                children: [
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h3", text: "{{day}}" },
                      { type: "Text", variant: "caption", text: "{{month}}" },
                    ],
                  },
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h4", text: "{{title}}" },
                      {
                        type: "Row",
                        children: [
                          { type: "Icon", icon: "schedule" },
                          { type: "Text", variant: "caption", text: "{{time}}" },
                        ],
                      },
                      {
                        type: "Row",
                        children: [
                          { type: "Icon", icon: "location_on" },
                          { type: "Text", variant: "caption", text: "{{location}}" },
                        ],
                      },
                    ],
                  },
                ],
              },
              { type: "Text", variant: "body", text: "{{description}}" },
              {
                type: "Row",
                children: [
                  { type: "Text", variant: "caption", text: "{{attendees}} attending" },
                  { type: "Button", label: "RSVP" },
                ],
              },
            ],
          },
        ],
      },
    ],
    data: {
      image: "https://picsum.photos/400/150?random=2",
      day: "15",
      month: "MAR",
      title: "Tech Meetup 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Innovation Hub, Downtown",
      description: "Join us for an evening of talks, networking, and demos from local startups.",
      attendees: 142,
    },
  },

  // 9. Music Player
  {
    id: "music-player",
    name: "Music Player",
    description: "Audio player with album art, track info, and playback controls.",
    tags: ["music", "audio", "player", "media"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Column",
            children: [
              { type: "Image", src: "{{albumArt}}", size: "largeFeature" },
              { type: "Text", variant: "h4", text: "{{track}}" },
              { type: "Text", variant: "caption", text: "{{artist}}" },
              { type: "Slider", value: "{{progress}}", min: 0, max: 100 },
              {
                type: "Row",
                children: [
                  { type: "Text", variant: "caption", text: "{{currentTime}}" },
                  { type: "Text", variant: "caption", text: "{{duration}}" },
                ],
              },
              {
                type: "Row",
                children: [
                  { type: "Icon", icon: "shuffle" },
                  { type: "Icon", icon: "skip_previous" },
                  { type: "Icon", icon: "{{playIcon}}", size: 48 },
                  { type: "Icon", icon: "skip_next" },
                  { type: "Icon", icon: "repeat" },
                ],
              },
            ],
          },
        ],
      },
    ],
    data: {
      albumArt: "https://picsum.photos/300/300?random=3",
      track: "Midnight City",
      artist: "M83",
      progress: 35,
      currentTime: "1:24",
      duration: "4:03",
      playIcon: "pause",
    },
  },

  // 10. Order Summary
  {
    id: "order-summary",
    name: "Order Summary",
    description: "Shopping cart summary with items, subtotal, tax, and total.",
    tags: ["ecommerce", "cart", "checkout", "summary"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Column",
            children: [
              { type: "Text", variant: "h3", text: "Order Summary" },
              { type: "Divider" },
              {
                type: "List",
                items: "{{items}}",
                itemTemplate: {
                  type: "Row",
                  children: [
                    { type: "Text", variant: "body", text: "{{item.name}} x{{item.qty}}" },
                    { type: "Text", variant: "body", text: "${{item.price}}" },
                  ],
                },
              },
              { type: "Divider" },
              {
                type: "Row",
                children: [
                  { type: "Text", variant: "body", text: "Subtotal" },
                  { type: "Text", variant: "body", text: "${{subtotal}}" },
                ],
              },
              {
                type: "Row",
                children: [
                  { type: "Text", variant: "body", text: "Shipping" },
                  { type: "Text", variant: "body", text: "${{shipping}}" },
                ],
              },
              {
                type: "Row",
                children: [
                  { type: "Text", variant: "body", text: "Tax" },
                  { type: "Text", variant: "body", text: "${{tax}}" },
                ],
              },
              { type: "Divider" },
              {
                type: "Row",
                children: [
                  { type: "Text", variant: "h4", text: "Total" },
                  { type: "Text", variant: "h4", text: "${{total}}" },
                ],
              },
              { type: "Button", label: "Checkout" },
            ],
          },
        ],
      },
    ],
    data: {
      items: [
        { name: "Wireless Headphones", qty: 1, price: "249.99" },
        { name: "Phone Case", qty: 2, price: "29.99" },
        { name: "USB-C Cable", qty: 3, price: "12.99" },
      ],
      subtotal: "349.96",
      shipping: "9.99",
      tax: "28.80",
      total: "388.75",
    },
  },

  // 11. Notification Card
  {
    id: "notification-card",
    name: "Notification Card",
    description: "Alert notification with icon, title, message, and action buttons.",
    tags: ["notification", "alert", "message"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Row",
            children: [
              { type: "Icon", icon: "{{icon}}", size: 32 },
              {
                type: "Column",
                children: [
                  { type: "Text", variant: "h5", text: "{{title}}" },
                  { type: "Text", variant: "body", text: "{{message}}" },
                  { type: "Text", variant: "caption", text: "{{time}}" },
                  {
                    type: "Row",
                    children: [
                      { type: "Button", label: "{{primaryAction}}" },
                      { type: "Button", label: "{{secondaryAction}}" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    data: {
      icon: "notifications",
      title: "New Comment",
      message: "Sarah Chen commented on your post: \"This is amazing work!\"",
      time: "2 minutes ago",
      primaryAction: "Reply",
      secondaryAction: "Dismiss",
    },
  },

  // 12. Chat Message
  {
    id: "chat-message",
    name: "Chat Message",
    description: "A chat bubble with avatar, name, timestamp, and message content.",
    tags: ["chat", "message", "communication"],
    components: [
      {
        type: "Row",
        children: [
          { type: "Image", src: "{{avatar}}", size: "avatar" },
          {
            type: "Card",
            children: [
              {
                type: "Column",
                children: [
                  {
                    type: "Row",
                    children: [
                      { type: "Text", variant: "h5", text: "{{name}}" },
                      { type: "Text", variant: "caption", text: "{{time}}" },
                    ],
                  },
                  { type: "Text", variant: "body", text: "{{message}}" },
                ],
              },
            ],
          },
        ],
      },
    ],
    data: {
      avatar: "https://i.pravatar.cc/50?u=chat",
      name: "Alex Rivera",
      time: "10:32 AM",
      message: "Hey! Just checking in on the project. How are things going with the new feature?",
    },
  },

  // 13. Restaurant Card
  {
    id: "restaurant-card",
    name: "Restaurant Card",
    description: "Restaurant listing with image, name, cuisine, rating, and distance.",
    tags: ["food", "restaurant", "listing", "local"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Row",
            children: [
              { type: "Image", src: "{{image}}", size: "mediumFeature" },
              {
                type: "Column",
                children: [
                  { type: "Text", variant: "h4", text: "{{name}}" },
                  { type: "Text", variant: "caption", text: "{{cuisine}}" },
                  {
                    type: "Row",
                    children: [
                      { type: "Icon", icon: "star" },
                      { type: "Text", variant: "body", text: "{{rating}}" },
                      { type: "Text", variant: "caption", text: "({{reviews}})" },
                    ],
                  },
                  {
                    type: "Row",
                    children: [
                      { type: "Icon", icon: "location_on" },
                      { type: "Text", variant: "caption", text: "{{distance}}" },
                      { type: "Text", variant: "caption", text: "• {{priceLevel}}" },
                    ],
                  },
                  { type: "Text", variant: "caption", text: "{{status}}" },
                ],
              },
            ],
          },
        ],
      },
    ],
    data: {
      image: "https://picsum.photos/120/120?random=4",
      name: "Sakura Japanese Kitchen",
      cuisine: "Japanese • Sushi • Asian",
      rating: "4.6",
      reviews: "328 reviews",
      distance: "0.8 mi",
      priceLevel: "$$",
      status: "Open until 10:00 PM",
    },
  },

  // 14. Step Counter
  {
    id: "step-counter",
    name: "Step Counter",
    description: "Fitness tracker showing steps, goal progress, distance, and calories.",
    tags: ["fitness", "health", "tracker", "steps"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Column",
            children: [
              { type: "Text", variant: "caption", text: "Today's Activity" },
              { type: "Text", variant: "h1", text: "{{steps}}" },
              { type: "Text", variant: "body", text: "steps" },
              { type: "Slider", value: "{{progress}}", min: 0, max: 100, disabled: true },
              { type: "Text", variant: "caption", text: "Goal: {{goal}} steps" },
              { type: "Divider" },
              {
                type: "Row",
                children: [
                  {
                    type: "Column",
                    children: [
                      { type: "Icon", icon: "directions_walk" },
                      { type: "Text", variant: "h5", text: "{{distance}}" },
                      { type: "Text", variant: "caption", text: "Distance" },
                    ],
                  },
                  {
                    type: "Column",
                    children: [
                      { type: "Icon", icon: "local_fire_department" },
                      { type: "Text", variant: "h5", text: "{{calories}}" },
                      { type: "Text", variant: "caption", text: "Calories" },
                    ],
                  },
                  {
                    type: "Column",
                    children: [
                      { type: "Icon", icon: "timer" },
                      { type: "Text", variant: "h5", text: "{{activeMinutes}}" },
                      { type: "Text", variant: "caption", text: "Minutes" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    data: {
      steps: "7,842",
      progress: 78,
      goal: "10,000",
      distance: "3.2 mi",
      calories: "312",
      activeMinutes: "47",
    },
  },

  // 15. Countdown Timer
  {
    id: "countdown-timer",
    name: "Countdown Timer",
    description: "Event countdown showing days, hours, minutes, and event name.",
    tags: ["timer", "countdown", "event"],
    components: [
      {
        type: "Card",
        children: [
          {
            type: "Column",
            children: [
              { type: "Text", variant: "caption", text: "COUNTDOWN TO" },
              { type: "Text", variant: "h3", text: "{{eventName}}" },
              {
                type: "Row",
                children: [
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h2", text: "{{days}}" },
                      { type: "Text", variant: "caption", text: "Days" },
                    ],
                  },
                  { type: "Text", variant: "h2", text: ":" },
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h2", text: "{{hours}}" },
                      { type: "Text", variant: "caption", text: "Hours" },
                    ],
                  },
                  { type: "Text", variant: "h2", text: ":" },
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h2", text: "{{minutes}}" },
                      { type: "Text", variant: "caption", text: "Minutes" },
                    ],
                  },
                  { type: "Text", variant: "h2", text: ":" },
                  {
                    type: "Column",
                    children: [
                      { type: "Text", variant: "h2", text: "{{seconds}}" },
                      { type: "Text", variant: "caption", text: "Seconds" },
                    ],
                  },
                ],
              },
              { type: "Text", variant: "caption", text: "{{date}}" },
            ],
          },
        ],
      },
    ],
    data: {
      eventName: "Product Launch",
      days: "12",
      hours: "08",
      minutes: "45",
      seconds: "23",
      date: "March 15, 2024",
    },
  },
];
