# **Pizza-shop App**

## **App description:**

This online pizza shop is full-stack web application based on **_NextJS_** with **_TypeScript_** + **_Zustand_** + **_PostgreSQL_** via **_Prisma ORM_**.
*  The **_shadcn_** library was used for some ui components (checkbox, drawer, dialog, popover, slider, select, sheet and etc.)
*  Element styles were mostly written using **_tailwind_** lib.
*  **_zustand_** was used as the state manager.
*  The service **_resend.com_** api was used for sending emails when registering a new user, placing an order and making a successful payment.
*  The application has adaptations for mobile phones and desktop screens.

### **header**

![Screenshot of the header](/assets/screenshots/header.png)
The header includes a product search input, user profile button and shopping cart button.
Information about the total amount and quantity of items in the shopping cart is stored in the **_Zustand_** state manager.
Just below is navigation by product categories and sorting by name and price in ascending / descending order.

### **main**

![Screenshot of the main_page](/assets/screenshots/main_page.jpg)
In the main part of the page on the left there is filtering by product characteristics, price, and ingredients. 
There is a list of products to the right.
All product data is stored in the data base provided by **_[vercel.com]_**.
The search, filtering and sorting is performed via the **_Prisma ORM_** on the server side.
All the selected parameters are displayed in the url query string via **_qs_** lib and **_useSearchParams_** hook.

### **product card**

![Screenshot of the product_card](/assets/screenshots/product_card.png)
For each product you can find its description and for each pizza you can select parameters - the thickness of the dough, its diameter and ingredients.
Each product has its own page with its own url endpoint.

### **cart and payment**

![Screenshot of the cart](/assets/screenshots/cart_drawer.png)
The selected items are added to the shopping cart drawer component, where you can also decrease / increase the number of specific pizzas, remove it from the cart, and completely empty the cart.
![Screenshot of the checkout_page](/assets/screenshots/checkout.png)
The order checkout is placed on a separate page where you need to fill in the delivery information before payment.
I used **_react-hook-form_** lib and **_zod_** validation for all forms.
The **_dadata.ru_** api service is used as directory of addresses.
After the order is placed, it enters the database and has the "pending" status.
All orders are created by using **_Nextjs server actions_**.
![Screenshot of the payment_page](/assets/screenshots/payment.png)
![Screenshot of the success_payment page](/assets/screenshots/payment_success.png)
The **_yookassa api_** service was used for the test payment.
After a successful purchase you are redirected to a homepage and order status changing on "succeeded".
A successful order also receives a PaymentID from yookassa response.
![Screenshot of the orders_history](/assets/screenshots/orders_history.png)
Then the current order is included in the **orders history** in the user's profile with the current _order status_.
All data is stored in data base.

### **login and sign_up**

![Screenshot of the login_modal](/assets/screenshots/sign_in.png) ![Screenshot of the registration modal](/src/assets/screenshots/sign_up.png)
Authorization and registration works using **_NextAuth.js_** lib. These input fields are checked for validity by **_zod_** lib.
There is also authorization via **_github_** and **_google_**.
User registration provided by **_Nextjs server action_**.
After successful registration, the new user receives an email with link for validation via **_resend.com_** api. 
You cannot log in to the site without validation.
When creating a new user, his password is encrypted using the **_bcrypt_** library.

### **stories**

![Screenshot of the stories](/assets/screenshots/stories.png)
A library **_react-insta-stories_** was used to implement instagram-style stories on the main page.

## **The following basic skills have been worked out:**

1. Using the useState, useEffect, useRef and other hooks;
2. Using onClick and onSubmit events on elements;
3. Import icons, libraries, hooks and components;
4. Using conditional rendering with the ternary operator;
5. Working with props and context;
6. Using data fetching;
7. Using Zustand for for storing site data;
8. Using a TypeScript;
9. Using NextAuth.js for login and registration;
10. Using a postgreSQL database via Prisma ORM for storing user, product, order, cart data;
11. Using a page routing with endpoints;
12. Making adaptations for different screens;
13. Using a <Skeleton/> components as a content loader;
14. Creating and using a custom hooks;
15. Sorting and searching for items using query params of URL.
16. Creating a shopping cart and its management;
17. Using a payment system to pay for goods;
18. Using layouts of Components;
