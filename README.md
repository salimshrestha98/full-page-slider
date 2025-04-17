# Super Blocks – A Gutenberg Block Plugin for WordPress

Super Blocks is a test block plugin. This plugin utilizes **Composer** for PHP class autoloading and **Node.js** for asset bundling and block building.

It is developed using the structure recommended by WordPress using **@wordpress/scripts**.

A zipped install-ready file <mark>super-blocks.zip</mark> is also included here which can be installed directly.


---

## Getting Started

Follow the steps below to set up the plugin for development or deployment.

### 1. Clone the Repository

```bash
git clone https://github.com/salimshrestha98/super-blocks.git
cd super-blocks
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