# CURA Login Test Plan

## Application Overview

The CURA Healthcare Service demo application provides a public landing page with Make Appointment and Login entry points. Login uses the documented demo credentials username `John Doe` and password `ThisIsNotAPassword`. Successful authentication redirects to the appointment page at `#appointment`; unsuccessful authentication remains on the login page and displays `Login failed! Please ensure the username and password are valid.`. Each scenario assumes a fresh browser context or an explicitly logged-out session so tests are independent.

## Test Scenarios

### 1. Login Authentication

**Seed:** `tests/functional/better-login.spec.ts`

#### 1.1. Successful login with valid demo credentials

**File:** `tests/functional/cura-login-positive.spec.ts`

**Steps:**
  1. Start from a fresh logged-out browser context and navigate to https://katalon-demo-cura.herokuapp.com/.
    - expect: The page title is `CURA Healthcare Service`.
    - expect: The landing page displays the `CURA Healthcare Service` heading and a `Make Appointment` link.
  2. Click `Make Appointment` (or use the navigation `Login` link).
    - expect: The URL contains `profile.php#login`.
    - expect: The login section displays the `Login` heading and `Please login to make appointment.`.
    - expect: The form exposes the editable Username and Password fields and a `Login` button.
  3. Fill the actual Username field with `John Doe` and the actual Password field with `ThisIsNotAPassword`.
    - expect: The entered values are present in the corresponding login fields.
  4. Click `Login`.
    - expect: The URL contains `#appointment`.
    - expect: The page displays the `Make Appointment` heading and `Book Appointment` button.
    - expect: Authenticated navigation includes `History`, `Profile`, and `Logout`.
    - expect: No login failure message is displayed.

#### 1.2. Login rejects invalid username and password

**File:** `tests/functional/cura-login-negative-invalid-credentials.spec.ts`

**Steps:**
  1. Start from a fresh logged-out browser context and navigate to the login screen through `Make Appointment`.
    - expect: The login form is displayed with empty editable Username and Password fields.
  2. Enter `Danny` as Username and `Italy` as Password, then click `Login`.
    - expect: The URL remains on `profile.php#login`.
    - expect: The page displays `Login failed! Please ensure the username and password are valid.`.
    - expect: The user is not redirected to the appointment page.
    - expect: Authenticated-only links such as `Logout` are not displayed.

#### 1.3. Login rejects empty username and password

**File:** `tests/functional/cura-login-negative-empty-fields.spec.ts`

**Steps:**
  1. Start from a fresh logged-out browser context and open `profile.php#login`.
    - expect: The login form is displayed.
    - expect: Both editable login fields are empty.
  2. Click `Login` without entering either credential.
    - expect: The URL remains on `profile.php#login`.
    - expect: The page displays `Login failed! Please ensure the username and password are valid.`.
    - expect: The user is not authenticated and the appointment page is not displayed.

#### 1.4. Login rejects a missing password

**File:** `tests/functional/cura-login-negative-missing-password.spec.ts`

**Steps:**
  1. Start from a fresh logged-out browser context and open the login screen.
    - expect: The login form is displayed.
  2. Enter the valid username `John Doe`, leave Password empty, and click `Login`.
    - expect: The URL remains on `profile.php#login`.
    - expect: The page displays `Login failed! Please ensure the username and password are valid.`.
    - expect: The user is not redirected to `#appointment`.

#### 1.5. Login rejects a missing username

**File:** `tests/functional/cura-login-negative-missing-username.spec.ts`

**Steps:**
  1. Start from a fresh logged-out browser context and open the login screen.
    - expect: The login form is displayed.
  2. Leave Username empty, enter the valid password `ThisIsNotAPassword`, and click `Login`.
    - expect: The URL remains on `profile.php#login`.
    - expect: The page displays `Login failed! Please ensure the username and password are valid.`.
    - expect: The user is not redirected to `#appointment`.

#### 1.6. Login rejects valid username with incorrect password

**File:** `tests/functional/cura-login-negative-wrong-password.spec.ts`

**Steps:**
  1. Start from a fresh logged-out browser context and open the login screen.
    - expect: The login form is displayed.
  2. Enter `John Doe` as Username and an incorrect password such as `Italy`, then click `Login`.
    - expect: The URL remains on `profile.php#login`.
    - expect: The page displays `Login failed! Please ensure the username and password are valid.`.
    - expect: The user remains unauthenticated.

#### 1.7. Login rejects incorrect username with valid password

**File:** `tests/functional/cura-login-negative-wrong-username.spec.ts`

**Steps:**
  1. Start from a fresh logged-out browser context and open the login screen.
    - expect: The login form is displayed.
  2. Enter an incorrect username such as `Danny` and the valid password `ThisIsNotAPassword`, then click `Login`.
    - expect: The URL remains on `profile.php#login`.
    - expect: The page displays `Login failed! Please ensure the username and password are valid.`.
    - expect: The user remains unauthenticated.
