<template>
    <header class="header">
      <div class="drop-down-button">
        <button class="button">Menu&nbsp; ▼</button>
        <div class="dropdown-content">
          <a id="top" href="#">Option 1</a>
          <a id="middle" href="#">Option 2</a>
          <a id="bottom" href="#">Option 3</a>
        </div>
      </div>
      <a class="button" href="./">Main Page</a>
      <a class="button" href="./Profile">Profile</a>

    </header>
</template>

<script setup>

</script>


<style scoped>
.header {
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  flex: 0 1 auto;
  padding: 0.5em;
  background-color: rgb(69, 69, 69);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 1);
  opacity: 80%;
  justify-content: center;
  gap:20px;
}
.drop-down-button {
  position: relative;
  display: block;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.button {
  background-color: #8e8e8f;
  color: #212121;
  padding: 10px 15px;
  font-size: 15px;
  font-weight: bold;
  border: 2px solid transparent;
  border-radius: 15px;
  cursor: pointer;
  text-decoration:none;
}

.dropdown-content {
  display: none;
  font-size: 13px;
  position: absolute;
  z-index: 1;
  min-width: 200px;
  background-color: #212121;
  border: 2px solid #6b6b6c;
  border-radius: 0px 15px 15px 15px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.dropdown-content a {
  color: #6b6b6c;
  padding: 8px 10px;
  text-decoration: none;
  display: block;
  transition: 0.1s;
}

.dropdown-content a:hover {
  background-color: #ffffff;
  color: #212121;
}

.dropdown-content a:focus {
  background-color: #212121;
  color: #ffffff;
}

.dropdown-content #top:hover {
  border-radius: 0px 13px 0px 0px;
}

.dropdown-content #bottom:hover {
  border-radius: 0px 0px 13px 13px;
}

.drop-down-button:hover button {
  border-radius: 15px 15px 0px 0px;
}

.drop-down-button:hover .dropdown-content {
  display: block;
}

</style>