# Full Page Slider – A Gutenberg Block Plugin for WordPress

Full Page Slider is a test block plugin. This plugin utilizes **Composer** for PHP class autoloading and **Node.js** for asset bundling and block building.

It is developed using the structure recommended by WordPress using **@wordpress/scripts**.

A zipped install-ready file <mark>full-page-slider.zip</mark> is also included here which can be installed directly.


---

## Getting Started

The plugin has been tested to work on minimum of **PHP 7.4** and **WordPress 6.6.2** installed on the system. Please use the latest version of PHP and WordPress if possible.

Follow the steps below to set up the plugin for development or deployment.

### 1. Clone the Repository

```bash
git clone https://github.com/salimshrestha98/full-page-slider.git
cd full-page-slider
```

### 2. Install PHP Dependencies via Composer
```bash
composer install
```

### 3. Install Javascript Dependencies via npm
```bash
npm install
```

### 4. Build
```bash
npm run build
OR
npm start
```

### 5. Activate Plugin
Activate the plugin from WordPress admin dashboard.


## How to Use the block:

1. Create a new author profile from the **Author Profiles** menu.
2. Add a new post and insert an **Author Profile** block.
3. Choose the settings as you like and publish/update the post.
4. The author profile now will now be rendered on the frontend.

*Note: The block is rendered dynamically. So, any update to the author profile will be reflected on the frontend immediately.*