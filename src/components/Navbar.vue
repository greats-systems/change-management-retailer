<template>
    <nav class="bg-sky-400 border-b">
        <div class="menu-item">
            <RouterLink to="/">Home</RouterLink>
        </div>
        <div class="menu-item">
            <RouterLink to="/checkout">Checkout</RouterLink>
        </div>
        <div class="menu-item">
          <RouterLink to="/redeem">Redeem</RouterLink>
        </div>
        <div class="menu-item">
            <RouterLink to="/account-management">Account Management</RouterLink>
        </div>
    </nav>
</template>
<style>
nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

nav .menu-item {
  color: lightblue;
  padding: 10px 30px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
}

nav .menu-item.active,
nav .menu-item:hover {
  background-color: white;
  border-bottom-color: #06bbf1;
}

nav .menu-item {
  color: inherit;
  text-decoration: none;
}
</style>