<template>
    <div id="localkey">
        <h1>Load a Keystore file</h1>
        <div class="container">
        <label for="kstore"><b>KeyStore</b></label>
        <input type="text" name="kstore" v-model="input.keystore" placeholder="KeyStore file" />

        <label for="psw"><b>Password</b></label>
        <input type="password" name="psw" v-model="input.password" placeholder="Password" />

        <button type="button" v-on:click="load()">Load In with Key</button>
        <router-link to="/login" replace>Login instead</router-link>
        </div>
  </div>

</template>

<script>
    export default {
        name: 'Load',
        data() {
            return {
                input: {
                    keystore: "",
                    password: ""
                }
            }
        },
        methods: {
            load() {
                this.$emit("authenticated", true);
                this.$router.replace({ name: "secure" });
            }
        }
    }
</script>

<style scoped>

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid gold;
  box-sizing: border-box;
}

button {
  background-color: black;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

.container {
  width: 100%;
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>