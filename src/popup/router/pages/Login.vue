<template>
    <div id="login">
        <h1>Login</h1>
        <div class="container">
        <label for="uname"><b>Username</b></label>
        <input type="text" name="uname" v-model="input.username" placeholder="Username" />

        <label for="psw"><b>Password</b></label>
        <input type="password" name="psw" v-model="input.password" placeholder="Password" />

        <button type="button" v-on:click="login()">Login</button>
        <router-link to="/local" replace>Use a Keystore File</router-link>
        </div>
  </div>

</template>

<script>
    //var background = chrome.extension.getBackgroundPage();
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {            
                if(this.input.username != "" && this.input.password != "") {
                    this.background.login(this.input.username ,this.input.password)
                    .then(
                      resolve => {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });                        
                      },
                      reject =>{
                        console.log(reject);
                      });
                } else {
                    console.log("A username and password must be present");
                }
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