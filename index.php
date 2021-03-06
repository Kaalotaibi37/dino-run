<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>
    Login Page
  </title>
  <link rel="icon" type="image/x-icon" href="icon.png">
  <link rel="stylesheet" href="login_style.css">
</head>

<body>
  <div class="login">
    <form class="form" method="post" action="login.php">
      <h2>Login</h2>
      <div class="inputs">
        <input type="text" name="username_login" id="username" required>
        <label for="username">Username
        </label>
      </div>
      <div class="inputs">
        <input type="password" name="password_login" id="password" required>
        <label for="password">Password
        </label>
      </div>
      <a href="#register" class="register" id="reg">Register now
      </a>
      <a href="#forgot-password" class="forgot-password" id="forg">Forgot Password?
      </a>
      <input type="submit" name="Login" value="Login" class="button">
    </form>

    <div id="register">
      <form class="form" method="post" action="register.php">
        <a href="#" class="close">&times;
        </a>
        <h2>Register</h2>
        <div class="inputs">
          <input type="text" name="username" id="username-reg" required>
          <label for="username-reg">Username
          </label>
        </div>
        <div class="inputs">
          <input type="email" name="email" id="email-reg" required>
          <label for="email-reg">Email
          </label>
        </div>
        <div class="inputs">
          <input type="password" name="password" id="password-reg" required>
          <label for="password-reg">Password
          </label>
        </div>
        <div class="inputs">
          <input type="password" name="conf-password" id="conf-password" required>
          <label for="conf-password">Confirm Password
          </label>
        </div>
        <input type="submit" value="Register" class="button">
      </form>
    </div>

    <div id="forgot-password">
      <form class="form">
        <a href="#" class="close">&times;
        </a>
        <h2>Reset Password</h2>
        <div class="inputs">
          <input type="email" name="email" id="email-forg" required>
          <label for="email-forg">Email</label>
        </div>
        <input type="submit" value="Sumbit" class="button">
      </form>
    </div>
  </div>
</body>

</html>