# **Pizza-shop App**

## **App description:**

This online pizza shop is full-stack web application based on **_NextJS_** with **_TypeScript_** + **_Zustand_** + **_PostgreSQL_** via **_Prisma ORM_**.
*  The **_shadcn_** library was used for some ui components (checkbox, drawer, dialog, popover, slider, select, sheet and etc.)
*  Element styles were mostly written using **_tailwind_** lib.
*  **_zustand_** was used as the state manager.
*  The service **_resend.com_** api was used for sending emails when registering a new user, placing an order and making a successful payment.
*  The application has adaptations for mobile phones and desktop screens.

### **header**

![Screenshot of the header](/assets/screenshots/header.png) <br />
The header includes a product search input, user profile button and shopping cart button. <br />
Information about the total amount and quantity of items in the shopping cart is stored in the **_Zustand_** state manager. <br />
Just below is navigation by product categories and sorting by name and price in ascending / descending order.

### **main**

![Screenshot of the main_page](/assets/screenshots/main_page.jpg) <br />
In the main part of the page on the left there is filtering by product characteristics, price, and ingredients. <br />
There is a list of products to the right. <br />
All product data is stored in the data base provided by **_[vercel.com]_**. <br />
The search, filtering and sorting is performed via the **_Prisma ORM_** on the server side. <br />
All the selected parameters are displayed in the url query string via **_qs_** lib and **_useSearchParams_** hook.

### **product card**

![Screenshot of the product_card](/assets/screenshots/product_card.png) <br />
For each product you can find its description and for each pizza you can select parameters - the thickness of the dough, its diameter and ingredients. <br />
Each product has its own page with its own url endpoint.

### **cart and payment**

![Screenshot of the cart](/assets/screenshots/cart_drawer.png) <br />
The selected items are added to the shopping cart drawer component, where you can also decrease / increase the number of specific pizzas, remove it from the cart, and completely empty the cart. <br />
![Screenshot of the checkout_page](/assets/screenshots/checkout.png) <br />
The order checkout is placed on a separate page where you need to fill in the delivery information before payment. <br />
I used **_react-hook-form_** lib and **_zod_** validation for all forms. <br />
The **_dadata.ru_** api service is used as directory of addresses. <br />
After the order is placed, it enters the database and has the "pending" status. <br />
All orders are created by using **_Nextjs server actions_**. <br />
![Screenshot of the payment_page](/assets/screenshots/payment.png) <br />
![Screenshot of the success_payment page](/assets/screenshots/payment_success.png) <br />
The **_yookassa api_** service was used for the test payment. <br />
After a successful purchase you are redirected to a homepage and order status changing on "succeeded". <br />
A successful order also receives a PaymentID from yookassa response. <br />
![Screenshot of the orders_history](/assets/screenshots/orders_history.png) <br />
Then the current order is included in the **orders history** in the user's profile with the current _order status_. <br />
All data is stored in data base.

### **login and sign_up**

![Screenshot of the login_modal](/assets/screenshots/sign_in.png) ![Screenshot of the registration modal](/assets/screenshots/sign_up.png) <br />
Authorization and registration works using **_NextAuth.js_** lib. These input fields are checked for validity by **_zod_** lib. <br />
There is also authorization via **_github_** and **_google_**. <br />
User registration provided by **_Nextjs server action_**. <br />
After successful registration, the new user receives an email with link for validation via **_resend.com_** api. <br />
You cannot log in to the site without validation. <br />
When creating a new user, his password is encrypted using the **_bcrypt_** library.

### **stories**

![Screenshot of the stories](/assets/screenshots/stories.png) <br />
A library **_react-insta-stories_** was used to implement instagram-style stories on the main page. <br />

## **The following basic skills have been worked out:**

*  Using the useState, useEffect, useRef and other hooks;
*  Using onClick and onSubmit events on elements;
*  Import icons, libraries, hooks and components;
*  Using conditional rendering with the ternary operator;
*  Working with props and context;
*  Using data fetching;
*  Using Zustand for for storing site data;
*  Using a TypeScript;
*  Using NextAuth.js for login and registration;
*  Using a postgreSQL database via Prisma ORM for storing user, product, order, cart data;
*  Using a page routing with endpoints;
*  Making adaptations for different screens;
*  Using a <Skeleton/> components as a content loader;
*  Creating and using a custom hooks;
*  Sorting and searching for items using query params of URL.
*  Creating a shopping cart and its management;
*  Using a payment system to pay for goods;
*  Using layouts of Components;
